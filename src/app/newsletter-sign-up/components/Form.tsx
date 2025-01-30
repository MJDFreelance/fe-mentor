"use client";

import { useForm } from "react-hook-form";

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form className={`grid gap-2`} onSubmit={handleSubmit(onSubmit)}>
      <span className={`flex justify-between`}>
        <label className={`font-bold text-[12px] leading-[1.5]`}>
          Email address
        </label>
        {errors.email && (
          <label
            className={`font-bold text-[12px] leading-[1.5] text-[#FF6155]`}
          >
            Valid email required
          </label>
        )}
      </span>
      <input
        className={`border-[1px] px-6 py-4 rounded-[8px] placeholder:text-[rgba(36_39_66_.5)]
                                hover:border-[#242742] focus:border-[#242742] outline-0
                                ${errors.email && "border-[#FF6155] text-[#FF6155] placeholder:text-[#FF6155] bg-[rgba(255,97,85,.15)]"} w-full`}
        placeholder={`email@company.com`}
        {...register("email", { required: true })}
      />
      <button
        className={`mt-4 text-white bg-[#242742] py-4.5 rounded-[8px]
                                hover:bg-gradient-to-r from-[#FF6A3A] to-[#FF527B] hover:shadow-[0_16px_32px_#FF6155]`}
      >
        Subscribe to monthly newsletter
      </button>
    </form>
  );
};
