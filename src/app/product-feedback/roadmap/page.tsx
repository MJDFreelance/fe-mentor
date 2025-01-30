"use client";

import { useFeedback } from "@/app/product-feedback/components/FeedbackContext";
import IconUp from "@/app/product-feedback/icons/shared/icon-arrow-up.svg";
import IconComments from "@/app/product-feedback/icons/shared/icon-comments.svg";
import _ from "lodash";
import { useState } from "react";
import IconLeft from "@/app/product-feedback/icons/shared/icon-arrow-left.svg";
import Link from "next/link";
import text from "@/app/product-feedback/text.module.css";

const Page = () => {
  const { categorisedFeedback, addUpvote } = useFeedback();
  const [selectedCategory, setSelectedCategory] = useState("planned");

  return (
    <div className={`max-w-[1110px] w-full`}>
      <header
        className={`flex justify-between bg-[#373F68] text-white px-8 py-7 rounded-[10px]`}
      >
        <section>
          <a
            href={`/product-feedback`}
            className={`${text.body4} flex items-center gap-3`}
          >
            <IconLeft className={`stroke-white`} />
            Go Back
          </a>
          <h1 className={`${text.h1}`}>Roadmap</h1>
        </section>
        <Link
          href={`/product-feedback/edit`}
          className={`${text.body4} h-fit self-center px-4 md:px-6 py-3 bg-[#AD1FEA] rounded-[10px] hover:bg-[#C75AF6]`}
        >
          +Add Feedback
        </Link>
      </header>
      <main className={`grid md:grid-cols-3 gap-7.5 pt-12`}>
        <menu
          className={`flex md:hidden w-full text-[13px] font-bold -tracking-[.18px]`}
        >
          <button
            data-selected={selectedCategory === "planned"}
            onClick={() => setSelectedCategory("planned")}
            className={`opacity-40 flex-1 pb-4 data-[selected=true]:border-[#F49F85] border-transparent border-b-[4px] data-[selected=true]:opacity-100`}
          >
            Planned ({categorisedFeedback.planned.length})
          </button>
          <button
            data-selected={selectedCategory === "in-progress"}
            onClick={() => setSelectedCategory("in-progress")}
            className={`opacity-40 flex-1 pb-4 data-[selected=true]:border-[#AD1FEA] border-transparent border-b-[4px] data-[selected=true]:opacity-100`}
          >
            In-Progress ({categorisedFeedback.inProgress.length})
          </button>
          <button
            data-selected={selectedCategory === "live"}
            onClick={() => setSelectedCategory("live")}
            className={`opacity-40 flex-1 pb-4 data-[selected=true]:border-[#62BCFA] border-transparent border-b-[4px] data-[selected=true]:opacity-100`}
          >
            Live ({categorisedFeedback.live.length})
          </button>
        </menu>
        <section
          className={`flex flex-col gap-6 max-md:px-6 ${selectedCategory !== "planned" && `max-md:hidden`}`}
        >
          <header className={`flex flex-col gap-1`}>
            <h3 className={`${text.h3} text-[#3A4374]`}>
              Planned ({categorisedFeedback.planned.length})
            </h3>
            <span className={`${text.body} text-[#647196]`}>
              Ideas prioritized for research
            </span>
          </header>
          {categorisedFeedback.planned.map((item) => (
            <div
              key={item.id}
              className={`group bg-white p-8 flex flex-col gap-4 rounded-[5px] relative overflow-hidden`}
            >
              <div
                className={`absolute h-1.5 w-full left-0 top-0 bg-[#F49F85]`}
              ></div>
              <span
                className={`${text.body} flex items-center gap-2 text-[#647196]`}
              >
                <span
                  className={`${text.body} w-2 h-2 bg-[#F49F85] rounded-full`}
                ></span>
                Planned
              </span>
              <h2
                className={`${text.h3} group-hover:text-[#4661E6] text-[#3A4374] font-bold text-[18px] -tracking-[.25px]`}
              >
                {item.title}
              </h2>
              <p className={`${text.body} -mt-2 text-[#647196]`}>
                {item.description}
              </p>
              <ul className={`mt-2`}>
                <li
                  className={`${text.body3} py-1 bg-[#F2F4FF] w-fit px-4 rounded-[10px] text-[#4661E6]`}
                >
                  {_.startCase(item.category)}
                </li>
              </ul>
              <div className={`flex justify-between`}>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    addUpvote(item.id);
                  }}
                  className={`${text.h5} flex grid-area-[votes] bg-[#F2F4FE] h-fit px-4 py-2 rounded-[10px] gap-2 hover:bg-[#CFD7FF] 
                                    min-w-[5ch] items-center justify-center font-[#3A4374] w-fit`}
                >
                  <IconUp />
                  {item.upvotes}
                </button>
                <div
                  className={`${text.h6} flex items-center gap-2 grid-area-[comments]`}
                >
                  <IconComments />
                  {item.comments?.length ?? 0}
                </div>
              </div>
            </div>
          ))}
        </section>
        <section
          className={`flex flex-col gap-6 max-md:px-6 ${selectedCategory !== "in-progress" && `max-md:hidden`}`}
        >
          <header className={`flex flex-col gap-1`}>
            <h3 className={`${text.h3} text-[#3A4374]`}>
              In-Progress ({categorisedFeedback.inProgress.length})
            </h3>
            <span className={`${text.body} text-[#647196]`}>
              Currently being developed
            </span>
          </header>
          {categorisedFeedback.inProgress.map((item) => (
            <div
              key={item.id}
              className={`group bg-white p-8 gap-4 flex flex-col rounded-[5px] relative overflow-hidden group`}
            >
              <div
                className={`absolute h-1.5 w-full left-0 top-0 bg-[#AD1FEA]`}
              ></div>
              <span
                className={`${text.body} flex items-center gap-2 text-[#647196]`}
              >
                <span className={`w-2 h-2 bg-[#AD1FEA] rounded-full`}></span>
                In-Progress
              </span>
              <h2
                className={`${text.h3} group-hover:text-[#4661E6] text-[#3A4374]`}
              >
                {item.title}
              </h2>
              <p className={`${text.body} -mt-2 text-[#647196]`}>
                {item.description}
              </p>
              <ul className={`mt-2`}>
                <li
                  className={`${text.body3} py-1 bg-[#F2F4FF] w-fit px-4 rounded-[10px] text-[#4661E6]`}
                >
                  {_.startCase(item.category)}
                </li>
              </ul>
              <div className={`flex justify-between`}>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    addUpvote(item.id);
                  }}
                  className={`${text.h5} flex grid-area-[votes] bg-[#F2F4FE] h-fit px-4 py-2 rounded-[10px] gap-2 hover:bg-[#CFD7FF] 
                                    min-w-[5ch] items-center justify-center font-[#3A4374] w-fit`}
                >
                  <IconUp />
                  {item.upvotes}
                </button>
                <div
                  className={`${text.h6} flex items-center gap-2 grid-area-[comments]`}
                >
                  <IconComments />
                  {item.comments?.length ?? 0}
                </div>
              </div>
            </div>
          ))}
        </section>
        <section
          className={`flex flex-col gap-6 max-md:px-6 ${selectedCategory !== "live" && `max-md:hidden`}`}
        >
          <header className={`flex flex-col gap-1`}>
            <h3 className={`${text.h3} text-[#3A4374]`}>
              Live ({categorisedFeedback.live.length})
            </h3>
            <span className={`${text.body} text-[#647196]`}>
              Released features
            </span>
          </header>
          {categorisedFeedback.live.map((item) => (
            <div
              key={item.id}
              className={`group flex flex-col gap-4 bg-white p-8 rounded-[5px] relative overflow-hidden`}
            >
              <div
                className={`absolute h-1.5 w-full left-0 top-0 bg-[#62BCFA]`}
              ></div>
              <span
                className={`${text.body} flex items-center gap-2 text-[#647196]`}
              >
                <span className={`w-2 h-2 bg-[#62BCFA] rounded-full`}></span>
                Live
              </span>
              <h2
                className={`${text.h3} group-hover:text-[#4661E6] text-[#3A4374]`}
              >
                {item.title}
              </h2>
              <p className={`${text.body} -mt-2 text-[#647196]`}>
                {item.description}
              </p>
              <ul className={`mt-2`}>
                <li
                  className={`${text.body3} py-1 bg-[#F2F4FF] w-fit px-4 rounded-[10px] text-[#4661E6]`}
                >
                  {_.startCase(item.category)}
                </li>
              </ul>
              <div className={`flex justify-between`}>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    addUpvote(item.id);
                  }}
                  className={`${text.h5} flex grid-area-[votes] bg-[#F2F4FE] h-fit px-4 py-2 rounded-[10px] gap-2 hover:bg-[#CFD7FF] 
                                    min-w-[5ch] items-center justify-center font-[#3A4374] w-fit`}
                >
                  <IconUp />
                  {item.upvotes}
                </button>
                <div
                  className={`${text.h6} flex items-center gap-2 grid-area-[comments]`}
                >
                  <IconComments />
                  {item.comments?.length ?? 0}
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Page;
