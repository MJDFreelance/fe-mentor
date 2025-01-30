import {useForm} from "react-hook-form";
import {useFeedback} from "@/app/product-feedback/components/FeedbackContext";
import {Feedback, User, Comment} from "@/app/product-feedback/types";
import {Dispatch, SetStateAction} from "react";

export const AddReply = (
        {item, user, commentId, replyingTo, setReplyKey}:
        {item:Feedback, user:User, commentId:number, replyingTo:string, setReplyKey:Dispatch<SetStateAction<string|undefined>>}) => {
    const {addReply} = useFeedback();

    const {register, handleSubmit, reset} = useForm<Comment>();

    const onSubmit = (data:Comment) => {
        const highestID = item?.comments?.reduce((acc, comment) => comment.id > acc ? comment.id : acc, 0);
        addReply(item.id, commentId, {id:(highestID??0)+1, user, content:data.content, replyingTo});
        reset();
        setReplyKey(undefined);
    }

    return (
        <form className={`flex max-md:flex-col gap-4 bg-white md:pl-18 -mt-2`} onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register(`content`)} placeholder={`Type your comment here`}
                      className={`w-full bg-[#F7F8FD] px-6 py-4 rounded-[10px] outline-[1px] outline-[#4661E6]`}/>
            <button className={`px-6 py-3 rounded-[10px] text-white bg-[#AD1FEA] h-fit text-nowrap hover:bg-[#C75AF6]`}>Post Reply</button>
        </form>
    );
};