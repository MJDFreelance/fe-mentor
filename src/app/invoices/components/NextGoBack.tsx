"use client"

import { useRouter } from 'next/navigation';
import IconLeft from '@/app/invoices/icons/icon-arrow-left.svg';

export const NextGoBack = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back(); // Navigates to the previous page
    };


    return (
        <button onClick={handleGoBack}
                className={`flex items-center gap-4 px-6 mt-6 w-fit font-bold text-[15px] leading-[1] -tracking-[.25px] group-data-[color-mode=dark]:text-white`} >
             <IconLeft /> Go back</button>
    );
};