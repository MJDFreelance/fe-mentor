"use client";

import { useRouter } from "next/navigation";

export const NextGoBack = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Navigates to the previous page
  };

  return (
    <div className={`bg-background col-span-2`}>
      <button
        onClick={handleGoBack}
        className={`hover:text-[#D87D4A] xl:px-[165px] px-10 bg-[#FAFAFA] mr-auto col-span-2 py-4 xl:py-12 col-span-2 text-black w-fit`}
      >
        Go back
      </button>
    </div>
  );
};
