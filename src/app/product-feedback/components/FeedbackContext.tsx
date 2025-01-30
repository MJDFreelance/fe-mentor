"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import data from "@/app/product-feedback/data.json";
import { arrayToRecord } from "@/lib/utilities/data";
import {
  Feedback,
  Reply,
  ValueType,
  Comment,
} from "@/app/product-feedback/types";

const filters = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

const FeedbackContext = createContext<ValueType>({
  feedback: [],
  addFeedback: () => {
    throw Error("FeedbackProvider not found");
  },
  editFeedback: () => {
    throw Error("FeedbackProvider not found");
  },
  deleteFeedback: () => {
    throw Error("FeedbackProvider not found");
  },
  filteredFeedback: [],
  setActiveFilter: () => {
    throw Error("FeedbackProvider not found");
  },
  filters,
  activeFilter: "All",
  categorisedFeedback: { planned: [], inProgress: [], live: [] },
  addUpvote: () => {
    throw Error("FeedbackProvider not found");
  },
  sortedFeedback: [],
  setSortType: () => {
    throw Error("FeedbackProvider not found");
  },
  addComment: () => {
    throw Error("FeedbackProvider not found");
  },
  addReply: () => {
    throw Error("FeedbackProvider not found");
  },
});
export const useFeedback = () => useContext(FeedbackContext);
export const FeedbackProvider = (props: { children: ReactNode }) => {
  const [feedbackRecord, setFeedbackRecord] = useState<
    Record<string, Feedback>
  >(() => arrayToRecord(data.productRequests as Feedback[]));

  const feedback = useMemo(() => {
    return Object.values(feedbackRecord);
  }, [feedbackRecord]);
  const [sortType, setSortType] = useState<number>(0);

  const planned = feedback.filter((feedback) => feedback.status === "planned");
  const inProgress = feedback.filter(
    (feedback) => feedback.status === "in-progress",
  );
  const live = feedback.filter((feedback) => feedback.status === "live");
  const suggestion = feedback.filter(
    (feedback) => feedback.status === "suggestion",
  );

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const filteredFeedback = useMemo(() => {
    if (activeFilter === "All") {
      return suggestion;
    }
    return suggestion.filter(
      (feedback) =>
        feedback.category.toLowerCase() === activeFilter.toLowerCase(),
    );
  }, [suggestion, activeFilter]);

  const sortedFeedback = useMemo(() => {
    switch (sortType) {
      case 0:
        return filteredFeedback.sort((a, b) => b.upvotes - a.upvotes);
      case 1:
        return filteredFeedback.sort((a, b) => a.upvotes - b.upvotes);
      case 2:
        return filteredFeedback.sort(
          (a, b) => (b.comments ?? []).length - (a.comments ?? []).length,
        );
      case 3:
        return filteredFeedback.sort(
          (a, b) => (a.comments ?? []).length - (b.comments ?? []).length,
        );
      default:
        return filteredFeedback;
    }
  }, [filteredFeedback, sortType]);

  const addFeedback = (newFeedback: Feedback) => {
    setFeedbackRecord({ ...feedbackRecord, [feedback.length]: newFeedback });
  };

  const editFeedback = (newFeedback: Feedback) => {
    const existingFeedback = feedbackRecord[newFeedback.id];
    setFeedbackRecord({
      ...feedbackRecord,
      [newFeedback.id]: { ...existingFeedback, ...newFeedback },
    });
  };

  const deleteFeedback = (id: number) => {
    setFeedbackRecord((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const addUpvote = (id: number) => {
    const existingFeedback = feedbackRecord[id];
    setFeedbackRecord({
      ...feedbackRecord,
      [id]: { ...existingFeedback, upvotes: existingFeedback.upvotes + 1 },
    });
  };

  const addComment = (id: number, comment: Comment) => {
    const existingFeedback = feedbackRecord[id];
    const comments = existingFeedback.comments
      ? [...existingFeedback.comments, comment]
      : [comment];
    setFeedbackRecord({
      ...feedbackRecord,
      [id]: { ...existingFeedback, comments },
    });
  };

  const addReply = (id: number, commentId: number, reply: Reply) => {
    const existingFeedback = feedbackRecord[id];
    const existingComment = existingFeedback.comments.find(
      (comment) => comment.id === commentId,
    );
    if (!existingComment)
      throw Error("comment being replied to does not exist");
    const replies = existingComment.replies
      ? [...existingComment.replies, reply]
      : [reply];

    setFeedbackRecord({
      ...feedbackRecord,
      [id]: {
        ...existingFeedback,
        comments: existingFeedback.comments.map((comment) =>
          comment.id === commentId ? { ...comment, replies } : comment,
        ),
      },
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        filteredFeedback,
        filters,
        activeFilter,
        sortedFeedback,
        categorisedFeedback: { planned, inProgress, live, suggestion },
        setActiveFilter,
        addFeedback,
        editFeedback,
        addComment,
        addReply,
        deleteFeedback,
        addUpvote,
        setSortType,
      }}
    >
      {props.children}
    </FeedbackContext.Provider>
  );
};
