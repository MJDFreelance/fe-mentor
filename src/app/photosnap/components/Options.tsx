"use client";

import { Switch } from "@/components/ui/switch";
import { CSSProperties, useState } from "react";
import text from "@/app/photosnap/text.module.css";
import context from "@/app/photosnap/context.module.css";

export const Options = () => {
  const [isYearly, setIsYearly] = useState(false);

  const changeMode = (isYearly: boolean) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setIsYearly(isYearly);
      });
    } else {
      setIsYearly(isYearly);
    }
  };

  return (
    <section className={`w-full py-30 bg-white px-10`}>
      <div
        className={`max-w-[1110px] mx-auto w-full grid xl:grid-cols-3 gap-6 xl:gap-y-20 gap-x-8`}
      >
        <div className={`mx-auto flex w-fit xl:col-span-3 gap-8`}>
          <span className={`${text.h2} ${isYearly && `opacity-50`}`}>
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={(value) => changeMode(value)}
          />
          <span className={`${text.h2} ${!isYearly && `opacity-50`}`}>
            Yearly
          </span>
        </div>
        <article
          data-feature={false}
          className={`grid data-[feature=true]:bg-black py-8 group max-md:max-w-[400px] max-md:mx-auto`}
        >
          <div
            className={`grid gap-10 xl:text-center max-md:text-center px-10 py-14 bg-[#F5F5F5] 
                        md:grid-areas-[header_price|button_air] xl:grid-areas-[header|price|button] md:grid-cols-2 xl:grid-cols-1
                        group-data-[feature=true]:bg-black group-data-[feature=true]:text-white`}
          >
            <header className={`grid gap-4.5 md:grid-area-[header]`}>
              <h2 className={`${text.h3}`}>Basic</h2>
              <p className={`${text.body} opacity-60`}>
                Includes basic usage of our platform. Recommended for new and
                aspiring photographers.
              </p>
            </header>
            <div
              className={`flex flex-col-reverse md:text-end xl:text-center md:grid-area-[price]`}
            >
              <dt
                className={`${text.body} opacity-60`}
                style={
                  { viewTransitionName: `plan-term-basic` } as CSSProperties
                }
              >
                per {isYearly ? `year` : `month`}
              </dt>
              <dd
                className={`${text.h1}`}
                style={
                  { viewTransitionName: `plan-price-basic` } as CSSProperties
                }
              >
                {isYearly ? "$190.00" : "$19.00"}
              </dd>
            </div>
            <button
              className={`px-10 py-3 w-full ${text.link} md:grid-area-[button]
                            group-data-[feature=true]:bg-[#DFDFDF] group-data-[feature=true]:text-black 
                            hover:bg-[#DFDFDF] hover:text-black bg-black text-white`}
            >
              PICK PLAN
            </button>
          </div>
        </article>
        <article
          data-feature={true}
          className={`grid data-[feature=true]:bg-black py-8 group max-md:max-w-[400px] max-md:mx-auto`}
        >
          <div
            className={`grid gap-10 xl:text-center max-md:text-center px-10 py-14 bg-[#F5F5F5] 
                        md:grid-areas-[header_price|button_air] xl:grid-areas-[header|price|button] md:grid-cols-2 xl:grid-cols-1
                        group-data-[feature=true]:bg-black group-data-[feature=true]:text-white`}
          >
            <header className={`grid gap-4.5 md:grid-area-[header]`}>
              <h2 className={`${text.h3}`}>Pro</h2>
              <p className={`${text.body} opacity-60`}>
                More advanced features available. Recommended for photography
                veterans and professionals.
              </p>
            </header>
            <div
              className={`flex flex-col-reverse md:text-end xl:text-center md:grid-area-[price]`}
            >
              <dt
                className={`${text.body} opacity-60`}
                style={
                  { viewTransitionName: `plan-pro-business` } as CSSProperties
                }
              >
                per {isYearly ? `year` : `month`}
              </dt>
              <dd
                className={`${text.h1}`}
                style={
                  { viewTransitionName: `plan-price-pro` } as CSSProperties
                }
              >
                {isYearly ? "$390.00" : "$39.00"}
              </dd>
            </div>
            <button
              className={`px-10 py-3 w-full ${text.link} md:grid-area-[button]
                            group-data-[feature=true]:bg-[#DFDFDF] group-data-[feature=true]:text-black 
                            hover:bg-[#DFDFDF] hover:text-black bg-black text-white`}
            >
              PICK PLAN
            </button>
          </div>
        </article>
        <article
          data-feature={false}
          className={`grid data-[feature=true]:bg-black py-8 group max-md:max-w-[400px] max-md:mx-auto`}
        >
          <div
            className={`grid gap-10 xl:text-center max-md:text-center px-10 py-14 bg-[#F5F5F5] 
                        md:grid-areas-[header_price|button_air] xl:grid-areas-[header|price|button] md:grid-cols-2 xl:grid-cols-1
                        group-data-[feature=true]:bg-black group-data-[feature=true]:text-white`}
          >
            <header className={`grid gap-4.5 md:grid-area-[header]`}>
              <h2 className={`${text.h3}`}>Business</h2>
              <p className={`${text.body} opacity-60`}>
                Additional features available such as more detailed metrics.
                Recommended for business owners.
              </p>
            </header>
            <div
              className={`flex flex-col-reverse md:text-end xl:text-center md:grid-area-[price]`}
            >
              <dt
                className={`${text.body} opacity-60`}
                style={
                  { viewTransitionName: `plan-term-business` } as CSSProperties
                }
              >
                per {isYearly ? `year` : `month`}
              </dt>
              <dd
                className={`${text.h1}`}
                style={
                  { viewTransitionName: `plan-price-business` } as CSSProperties
                }
              >
                {isYearly ? "$990.00" : "$99.00"}
              </dd>
            </div>
            <button
              className={`px-10 py-3 w-full ${text.link} md:grid-area-[button]
                            group-data-[feature=true]:bg-[#DFDFDF] group-data-[feature=true]:text-black 
                            hover:bg-[#DFDFDF] hover:text-black bg-black text-white`}
            >
              PICK PLAN
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};
