"use client";

import { useFeedback } from "@/app/product-feedback/components/FeedbackContext";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Feedback } from "@/app/product-feedback/types";
import IconLeft from "@/app/product-feedback/icons/shared/icon-arrow-left.svg";
import Plus from "@/app/product-feedback/icons/shared/icon-plus.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import text from "@/app/product-feedback/text.module.css";
export const EditPage = ({ id }: { id: string | number | undefined }) => {
  const { feedback, editFeedback, addFeedback, deleteFeedback } = useFeedback();
  const router = useRouter();

  console.log(id);

  const item = feedback.find(
    (item) => item.id.toString() === (id?.toString() ?? ""),
  ) ?? {
    id: feedback.length + 1,
    upvotes: 0,
    status: "suggestion",
    comments: [],
    category: "",
    description: "",
    title: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: item });

  const onSubmit = (data: Feedback) => {
    if (id) editFeedback(data);
    else
      addFeedback({
        ...data,
        id: feedback.length + 1,
        upvotes: 0,
        status: "suggestion",
        comments: [],
      });
    router.push(`/product-feedback`);
  };

  const handleDelete = () => {
    deleteFeedback(item.id);
    router.push(`/product-feedback`);
  };

  const handleCancel = () => {
    reset(item);
    router.push(`/product-feedback`);
  };

  return (
    <div
      className={`grid gap-4 h-min bg-transparent max-w-[540px] w-full mt-6 xl:mt-20 px-6`}
    >
      <div className={`flex justify-between items-center`}>
        <Link
          href={`/product-feedback`}
          className={`${text.link} flex gap-3 items-center text-[#647196]`}
        >
          <IconLeft /> Go Back
        </Link>
      </div>

      <form
        className={`relative grid bg-white px-5 py-12 mt-7 gap-6`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={`absolute flex items-center justify-center  top-0 left-5 h-14 aspect-square rounded-full bg-black -translate-y-[50%]
                        bg-gradient-to-tl from-[#E84D70] via-[#A337F6] to-[#28A7ED]`}
        >
          <Plus className={`scale-[2]`} />
        </div>
        <h1 className={`${text.h1} mt-4`}>
          {item?.title ? `Editing ‘${item.title}‘` : `Create New Feedback`}
        </h1>
        <div className={`flex flex-col gap-4`}>
          <header className={`flex flex-col gap-0.5`}>
            <label className={`${text.fieldtitle} text-[#3A4374]`}>
              Feedback Title
            </label>
            <p className={`${text.fielddescription} text-[#647196]`}>
              Add a short, descriptive headline
            </p>
          </header>
          <input
            {...register(`title`, { required: true })}
            className={`${text.input} px-6 py-3 bg-[#F7F8FD] text-[#3A4374]rounded-[5px]
                        hover:outline hover:outline-[#4661E6] focus-visible:outline-[#4661E6] border-0 ${errors.title && `!outline-[#D73737]`}`}
          />
          {errors.title && (
            <span className={`${text.fielderror} text-[#D73737] -mt-4`}>
              Can&#39;t be empty
            </span>
          )}
        </div>
        <div className={`flex flex-col gap-4`}>
          <header className={`flex flex-col gap-0.5`}>
            <label className={`${text.fieldtitle} text-[#3A4374]`}>
              Category
            </label>
            <p className={`${text.fielddescription} text-[#647196]`}>
              Choose a category for your feedback
            </p>
          </header>
          <input
            {...register(`category`, { required: true })}
            className={`${text.input} px-6 py-3 bg-[#F7F8FD] text-[#3A4374] rounded-[5px]
                        hover:outline hover:outline-[#4661E6] focus-visible:outline-[#4661E6] border-0 ${errors.category && `!outline-[#D73737]`}`}
          />
          {errors.category && (
            <span className={`${text.fielderror} text-[#D73737] -mt-4`}>
              Can&#39;t be empty
            </span>
          )}
        </div>
        {id !== -1 && (
          <div className={`flex flex-col gap-4`}>
            <header className={`flex flex-col gap-0.5`}>
              <label className={`${text.fieldtitle}  text-[#3A4374]`}>
                Update Status
              </label>
              <p className={`${text.fielddescription}  text-[#647196]`}>
                Change feature state
              </p>
            </header>
            <Controller
              control={control}
              name={`status`}
              render={({ field, fieldState, formState }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={`${text.input} px-6 py-3 bg-[#F7F8FD] text-[#3A4374] rounded-[5px]
                        hover:outline hover:outline-[#4661E6] focus-visible:outline-[#4661E6] border-0 ${errors.category && `!outline-[#D73737]`}`}
                  >
                    <SelectValue placeholder="Most Upvotes" />
                  </SelectTrigger>
                  <SelectContent className={`w-fit mt-4`}>
                    <SelectItem
                      value="suggestion"
                      className={`${text.input}  font-[#647196] focus:bg-transparent 
                            focus:text-[#AD1FEA] cursor-pointer border-b p-3`}
                    >
                      Suggestion
                    </SelectItem>
                    <SelectItem
                      value="planned"
                      className={`${text.input}  font-[#647196] focus:bg-transparent 
                            focus:text-[#AD1FEA] cursor-pointer border-y p-3`}
                    >
                      Planned
                    </SelectItem>
                    <SelectItem
                      value="in-progress"
                      className={`${text.input}  font-[#647196] focus:bg-transparent 
                            focus:text-[#AD1FEA] cursor-pointer border-y p-3`}
                    >
                      In-Progress
                    </SelectItem>
                    <SelectItem
                      value="live"
                      className={`${text.input}  font-[#647196] focus:bg-transparent 
                            focus:text-[#AD1FEA] cursor-pointer border-t p-3`}
                    >
                      Live
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <span className={`${text.fielderror}  text-[#D73737] -mt-4`}>
                Can&#39;t be empty
              </span>
            )}
          </div>
        )}
        <div className={`flex flex-col gap-4`}>
          <header className={`flex flex-col gap-0.5`}>
            <label className={`${text.fieldtitle} text-[#3A4374]`}>
              Feedback Detail
            </label>
            <p className={`${text.fielddescription} text-[#647196]`}>
              Include any specific comments on what should be improved, added,
              etc.
            </p>
          </header>
          <textarea
            {...register(`description`, { required: true })}
            className={`${text.input} px-6 py-3 bg-[#F7F8FD] text-[#3A4374] rounded-[5px]
                    hover:outline hover:outline-[#4661E6] focus-visible:outline-[#4661E6] border-0 ${errors.description && `!outline-[#D73737]`}`}
          />
          {errors.description && (
            <span className={`${text.fielderror} text-[#D73737] -mt-4`}>
              Can&#39;t be empty
            </span>
          )}
        </div>
        <div className={`flex max-md:flex-col gap-4`}>
          {id !== -1 && (
            <button
              type={`button`}
              onClick={() => handleDelete()}
              className={`${text.input} px-6 py-3 bg-[#D73737] hover:bg-[#E98888] rounded-[10px] font-bold text-white`}
            >
              Delete
            </button>
          )}
          <button
            type={`button`}
            onClick={() => handleCancel()}
            className={`${text.button} px-6 py-3 bg-[#3A4374] hover:bg-[#656EA3] rounded-[10px] font-bold text-white md:ml-auto`}
          >
            Cancel
          </button>
          <button
            className={`${text.button} px-6 py-3 bg-[#AD1FEA] hover:bg-[#C75AF6] rounded-[10px] font-bold text-white`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
