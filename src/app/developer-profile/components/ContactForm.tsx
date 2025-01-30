"use client";

import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { saveMessage } from "@/app/developer-profile/api/write-to-dynamo/route";
import text from "@/app/developer-profile/text.module.css";
import context from "@/app/developer-profile/context.module.css";

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    await saveMessage({ UserId: uuid(), ...data });
  };

  return (
    <form
      className={`flex flex-col w-full gap-8 max-w-[445px] mx-auto max-xl:mt-12`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register(`name`, { required: true, maxLength: 20 })}
        className={`pb-4 bg-transparent border-b uppercase pl-6 ${text.input}
                            outline-0 ${errors.name ? `border-error` : "focus:border-primary"}`}
        placeholder={`name`}
      />
      <input
        {...register(`email`, { required: true, maxLength: 50 })}
        className={`pb-4 bg-transparent border-b uppercase pl-6 ${text.input}
                            outline-0 ${errors.email ? `border-error` : "focus:border-primary"}`}
        placeholder={`email`}
      />
      <textarea
        {...register(`message`, { required: true, maxLength: 500 })}
        className={`h-[107px] pb-4 bg-transparent border-b uppercase pl-6 ${text.input}
                            outline-0 ${errors.message ? `border-error` : "focus:border-primary"}`}
        placeholder={`message`}
      />
      <button
        className={`${text.link} hover:text-primary cursor-pointer w-max ml-auto text-center pb-2.5 border-b-2 border-primary`}
      >
        send message
      </button>
    </form>
  );
};
