"use client";

import { useFeedback } from "@/app/product-feedback/components/FeedbackContext";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Fragment, useState } from "react";
import { AddReply } from "@/app/product-feedback/components/AddReply";
import { Comment, Reply, User } from "@/app/product-feedback/types";
import IconUp from "@/app/product-feedback/icons/shared/icon-arrow-up.svg";
import _ from "lodash";
import IconComments from "@/app/product-feedback/icons/shared/icon-comments.svg";
import IconLeft from "@/app/product-feedback/icons/shared/icon-arrow-left.svg";
import text from "@/app/product-feedback/text.module.css";

export const ViewPage = ({ id, user }: { id: number; user: User }) => {
  const { feedback, addUpvote, addComment } = useFeedback();

  const item = feedback.find((item) => item.id.toString() === id.toString());

  const { register, handleSubmit, reset } = useForm<Comment | Reply>();

  const onSubmit = (data: Comment | Reply) => {
    const highestID = item?.comments?.reduce(
      (acc, comment) => (comment.id > acc ? comment.id : acc),
      0,
    );
    addComment(id, { id: (highestID ?? 0) + 1, user, content: data.content });
    reset();
    setReplyKey(undefined);
  };

  const [replyKey, setReplyKey] = useState<string | undefined>();

  const numComments =
    item?.comments?.reduce(
      (acc, comment) => acc + (comment?.replies?.length ?? 0) + 1,
      0,
    ) ?? 0;

  return (
    <div
      className={`grid gap-4 h-min bg-transparent max-w-[730px] w-full mt-6 xl:mt-20 px-6`}
    >
      <div className={`flex justify-between items-center mb-3`}>
        <Link
          href={`/product-feedback`}
          className={`${text.body4} flex gap-3 items-center font-bold text-[#647196] hover:underline`}
        >
          <IconLeft className={`stroke-[#4661E6]`} /> Go Back
        </Link>
        <Link
          href={`/product-feedback/edit/${id}`}
          className={`${text.body4} py-3 px-6 text-white bg-[#4661E6] rounded-[10px] hover:bg-[#7C91F9]`}
        >
          Edit Feedback
        </Link>
      </div>

      {item && (
        <div
          className={`group grid bg-white
                            grid-areas-[main_main_main|votes_votes_comments] grid-cols-[auto_1fr_auto] md:grid-areas-[votes_main_comments] cl:grid-cols-[auto_1fr_auto] 
                            h-full w-full px-8 py-7 gap-x-10 gap-y-4`}
        >
          <button
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              addUpvote(item.id);
            }}
            className={`flex md:flex-col grid-area-[votes] bg-[#F2F4FE] h-fit px-4 py-2 xl:py-3.5 xl:px-2 rounded-[10px] gap-2 hover:bg-[#CFD7FF] 
                                    min-w-[5ch] items-center justify-center ${text.h5} font-[#3A4374] w-fit`}
          >
            <IconUp />
            {item.upvotes}
          </button>
          <div className={`grid grid-area-[main] gap-1`}>
            <h1
              className={`font-[#3A4374] ${text.h3} group-hover:text-[#4661E6]`}
            >
              {item.title}
            </h1>
            <p className={`${text.body} font-[#647196]`}>{item.description}</p>
            <ul className={`mt-2`}>
              <li
                className={`py-1 bg-[#F2F4FF] w-fit px-4 rounded-[10px] ${text.body3} text-[#4661E6]`}
              >
                {_.startCase(item.category)}
              </li>
            </ul>
          </div>
          <div
            className={`flex items-center gap-2 grid-area-[comments] font-bold ${text.h6}`}
          >
            <IconComments />
            {item.comments?.length ?? 0}
          </div>
        </div>
      )}

      <div className={`flex flex-col gap-8 bg-white px-6 xl:px-8 py-4`}>
        <h2 className={`${text.h3}`}>
          {numComments} Comment{numComments === 1 ? "" : "s"}
        </h2>
        {item &&
          item.comments?.map((comment) => (
            <Fragment key={`comment-${comment.id}`}>
              <div className={`bg-white grid grid-cols-[auto_1fr_auto]`}>
                <img
                  src={comment.user.image}
                  className={`rounded-full row-span-2 md:row-span-3 aspect-square h-10 mr-8`}
                />
                <h3 className={`${text.h4} col-span-2 font-[#3A4374]`}>
                  {comment.user.name}
                </h3>
                <span className={`${text.body4} text-[#647196]`}>
                  @{comment.user.username}
                </span>
                <button
                  className={`${text.body3} text-[#4661E6] hover:underline`}
                  onClick={() => setReplyKey(`comment-${comment.id}`)}
                >
                  Reply
                </button>
                <p
                  className={`mt-4 ${text.body2} text-[#647196] col-span-3 md:col-span-2`}
                >
                  {comment.content}
                </p>
                <div className={`col-span-3 mt-6 md:ml-5 pl-5 border-l`}>
                  {comment.replies?.map((reply, index) => (
                    <>
                      <div
                        key={`comment-${comment.id}-reply-${index}`}
                        className={`py-4 grid grid-cols-[auto_1fr_auto]`}
                      >
                        <img
                          src={reply.user.image}
                          className={`rounded-full row-span-2 md:row-span-3 aspect-square h-10 mr-8`}
                        />
                        <h3
                          className={`${text.h4} col-span-2 font-bold font-[#3A4374]`}
                        >
                          {reply.user.name}
                        </h3>
                        <span className={`${text.body4} text-[#647196]`}>
                          @{reply.user.username}
                        </span>
                        <button
                          className={`${text.body3} text-[#4661E6] hover:underline`}
                          onClick={() =>
                            setReplyKey(`comment-${comment.id}-reply-${index}`)
                          }
                        >
                          Reply
                        </button>
                        <p
                          className={`mt-4 ${text.body2} text-[#647196] col-span-3 md:col-span-2`}
                        >
                          <span className={`text-[#AD1FEA] font-bold`}>
                            @{reply.replyingTo}
                          </span>{" "}
                          {reply.content}
                        </p>
                      </div>
                      {replyKey === `comment-${comment.id}-reply-${index}` && (
                        <AddReply
                          item={item}
                          user={user}
                          commentId={comment.id}
                          replyingTo={reply.user.username}
                          setReplyKey={setReplyKey}
                        />
                      )}
                    </>
                  ))}
                </div>
              </div>
              {replyKey === `comment-${comment.id}` && (
                <AddReply
                  item={item}
                  user={user}
                  commentId={comment.id}
                  replyingTo={comment.user.username}
                  setReplyKey={setReplyKey}
                />
              )}
              <hr />
            </Fragment>
          ))}
      </div>
      <form
        className={`flex flex-col gap-4 bg-white px-6 md:px-8 py-6`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={`${text.h3} mt-2`}>Add Comment</h2>
        <textarea
          {...register(`content`)}
          placeholder={`Type your comment here`}
          className={`w-full bg-[#F7F8FD] px-6 py-4 rounded-[10px]`}
        />
        <span className={`flex justify-between items-center`}>
          <span className={`${text.body2} text-[#647196]`}>
            250 characters left
          </span>
          <button
            className={`${text.body4} px-4 md:px-6 py-3 rounded-[10px] text-white bg-[#AD1FEA] hover:bg-[#C75AF6]`}
          >
            Post Comment
          </button>
        </span>
      </form>
    </div>
  );
};
