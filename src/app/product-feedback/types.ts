export type User = {
    name: string;
    image: string;
    username: string;
}

export type Comment = {
    id: number;
    user: User;
    content: string;
    replies?: Reply[];
}

export type Reply = Omit<Comment, 'replies'> & {
    replyingTo: string;
}

export type Feedback = {
    id: number;
    title: string;
    description: string;
    category: string;
    upvotes: number;
    status: string;
    comments: Comment[];
}

export type ValueType = {
    feedback:Feedback[],
    addFeedback: (feedback:Feedback) => void;
    editFeedback: (feedback:Feedback) => void;
    deleteFeedback: (id: number) => void;
    filteredFeedback: Feedback[];
    setActiveFilter: (filter:string) => void;
    filters: string[];
    activeFilter: string;
    categorisedFeedback: {[key:string]:Feedback[]};
    addUpvote: (id:number) => void;
    sortedFeedback: Feedback[];
    setSortType: (sortType:number) => void;
    addComment: (id:number, comment:Comment) => void;
    addReply: (id:number, commentId:number, reply:Reply) => void;
}