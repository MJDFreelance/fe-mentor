"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import text from "@/app/dictionary/text.module.css";

type SearchValueType = {
  result: any | undefined;
};

const SearchContext = createContext<SearchValueType>({ result: undefined });
export const useSearch = () => useContext(SearchContext);
export const SearchProvider: FC<{ children?: ReactNode | undefined }> = (
  props,
) => {
  const [result, setResult] = useState<any | undefined>(``);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    if (!formData.term) {
      console.log(`no term`);
      return;
    }
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${formData.term}`,
    );
    const data = await response.json();
    setResult(data);
  };

  return (
    <SearchContext.Provider value={{ result }}>
      <div className={`w-full`}>
        <form
          className={`${text.select} grid items-center relative`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <button className={`absolute right-6`}>
            <img src={`/dictionary/icon-search.svg`} alt={`search`} />
          </button>
          <input
            className={`group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1F1F1F] 
                    bg-[#F4F4F4] h-16 rounded-[16px] pl-6 pr-16 hover:outline outline-[#A445ED]
                    ${errors?.term && "!outline-[#FF5252]"}`}
            {...register("term", { required: true })}
            placeholder={`Search for any word…`}
          />
        </form>
        {errors?.term && (
          <span className={`text-[#FF5252]`}>Whoops, can’t be empty…</span>
        )}
      </div>
      {props.children}
    </SearchContext.Provider>
  );
};
