"use client";

import { useFeedback } from "@/app/product-feedback/components/FeedbackContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { CSSProperties, useState } from "react";
import _ from "lodash";
import IconUp from "@/app/product-feedback/icons/shared/icon-arrow-up.svg";
import Close from "@/app/product-feedback/icons/shared/mobile/icon-close.svg";
import Hamburger from "@/app/product-feedback/icons/shared/mobile/icon-hamburger.svg";
import IconComments from "@/app/product-feedback/icons/shared/icon-comments.svg";
import Bulb from "@/app/product-feedback/icons/suggestions/icon-suggestions.svg";
import text from "@/app/product-feedback/text.module.css";
import Empty from "@/app/product-feedback/icons/suggestions/illustration-empty.svg";

const Page = () => {
  const {
    sortedFeedback,
    filters,
    activeFilter,
    categorisedFeedback,
    setActiveFilter,
    addUpvote,
    setSortType,
  } = useFeedback();

  const [menuOpen, setMenuOpen] = useState(true);

  const handleSortChange = (newFilter: number) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setSortType(newFilter);
      });
    } else {
      setSortType(newFilter);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setActiveFilter(newFilter);
      });
    } else {
      setActiveFilter(newFilter);
    }
  };

  return (
    <div
      className={`md:px-10 md:py-14 grid gap-6 grid-areas-[aside|header|main] xl:grid-areas-[aside_header|aside_main] max-w-[1110px] 
                ${menuOpen ? "max-md:max-h-screen transition-[max-height] delay-1000 max-md:overflow-hidden" : ""}
                w-full auto-rows-min xl:grid-cols-[auto_1fr] xl:grid-rows-[auto_1fr]`}
    >
      <aside
        className={`sticky md:relative max-md:top-0 z-20 grid-area-[aside] flex gap-2.5 flex-col md:flex-row xl:flex-col`}
      >
        <section
          className={`md:basis-1/3 xl:basis-auto flex-shrink-0 h-fit  md:w-[223px] 
                        md:h-[178px] xl:w-[255px] xl:h-[137px] md:rounded-[10px] text-white px-6 py-4
                        grid max-md:grid-cols-2 max-md:min-h-[72px] items-end md:grid-rows-[1fr_auto] md:max-w-[]
                        bg-gradient-to-tl from-[#E84D70] via-[#A337F6] to-[#28A7ED]`}
        >
          <span className={`self-end ${text.h2}`}>Frontend Mentor</span>
          <span className={`self-end ${text.body2}`}>Feedback Board</span>
          {menuOpen && (
            <button
              onClick={(prev) => setMenuOpen(!prev)}
              className={`row-span-2 col-start-2 row-start-1 md:hidden justify-self-end self-center`}
            >
              X
            </button>
          )}
          {!menuOpen && (
            <button
              onClick={() => setMenuOpen(true)}
              className={`row-span-2 col-start-2 row-start-1 md:hidden justify-self-end self-center`}
            >
              {!menuOpen && <Hamburger />}
              {menuOpen && <Close />}
            </button>
          )}
        </section>
        <section
          onClick={() => setMenuOpen(false)}
          className={`md:basis-2/3 xl:basis-0 max-md:top-[100%] max-md:absolute flex gap-2.5 flex-col md:flex-row xl:flex-col md:w-full max-md:!bg-[rgba(0,0,0,.75)] z-20 max-md:h-screen ${menuOpen ? "max-md:max-h-[20000px]" : "max-md:max-md:max-h-0 delay-1000 duration-0"}  transition-[max-height]
                        xl:max-w-[255px] max-md:bg-white max-md:inset-0 max-md:bg-[rgba(0,0,0,.5)] max-md:items-end overflow-x-hidden`}
        >
          <section
            className={`relative max-md:bg-[#F7F8FD] h-full max-md:absolute flex gap-2.5 flex-col md:flex-row xl:flex-col md:w-full xl:max-w-[255px]  max-md:max-w-[300px] max-md:p-6
                            ${menuOpen ? "" : "max-md:translate-x-full"} transition-all duration-1000 overflow-x-hidden  max-md:gap-8
                            `}
          >
            <div
              className={`flex flex-wrap bg-white md:flex-1 p-6 gap-2 gap-y-4 rounded-[10px]`}
            >
              {filters.map((filter) => (
                <button
                  onClick={() => handleFilterChange(filter)}
                  key={filter}
                  className={`${text.body3} px-4 py-1 bg-[#F2F4FF] rounded-[10px] text-[#4661E6] hover:bg-[#CFD7FF] h-fit
                                        ${activeFilter === filter && "!bg-[#4661E6] !text-white"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div
              className={`grid grid-cols-[1fr_auto] bg-white md:flex-1 px-6 py-5 gap-y-6`}
            >
              <header className={`grid col-span-2 grid-cols-subgrid`}>
                <h2 className={`${text.h3}`}>Roadmap</h2>
                <a
                  className={`${text.body3} underline text-[#4661E6] hover:text-[#8397F8]`}
                  href={`/product-feedback/roadmap`}
                >
                  View
                </a>
              </header>
              <ul
                className={`grid grid-cols-subgrid col-span-2 gap-4 md:gap-2 xl:gap-4`}
              >
                <li className={`grid grid-cols-subgrid col-span-2`}>
                  <span
                    className={`${text.body} flex items-center gap-2 text-[#647196]`}
                  >
                    <span
                      className={`w-2 h-2 bg-[#F49F85] rounded-full`}
                    ></span>
                    Planned
                  </span>
                  <span
                    className={`${text.body} justify-self-end font-bold text-[#647196]`}
                  >
                    {categorisedFeedback.planned.length}
                  </span>
                </li>
                <li className={`grid grid-cols-subgrid col-span-2`}>
                  <span
                    className={`${text.body} flex items-center gap-2 text-[#647196]`}
                  >
                    <span
                      className={`w-2 h-2 bg-[#AD1FEA] rounded-full`}
                    ></span>
                    In-Progress
                  </span>
                  <span
                    className={`${text.body} justify-self-end font-bold text-[#647196]`}
                  >
                    {categorisedFeedback.inProgress.length}
                  </span>
                </li>
                <li className={`grid grid-cols-subgrid col-span-2`}>
                  <span
                    className={`${text.body} flex items-center gap-2 text-[#647196]`}
                  >
                    <span
                      className={`w-2 h-2 bg-[#62BCFA] rounded-full`}
                    ></span>
                    Live
                  </span>
                  <span
                    className={`${text.body} justify-self-end font-bold text-[#647196]`}
                  >
                    {categorisedFeedback.live.length}
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </section>
      </aside>
      <header
        className={`${text.body3} flex grid-area-[header] bg-[#373F68] text-white rounded-[10px] px-6 py-4 items-center`}
      >
        <span className={`${text.h3} flex items-center max-md:hidden gap-4`}>
          <Bulb />
          {sortedFeedback.length} Suggestions
        </span>
        <span
          className={`${text.body4} flex items-center md:ml-8 gap-[1ch] text-[#F2F4FE]`}
        >
          <span className={`text-nowrap`}>Sort by</span>
          <Select onValueChange={(a) => handleSortChange(Number(a))}>
            <SelectTrigger
              className={`md:w-[180px] border-0 !outline-0 focus:outline-0 p-0 gap-2 !ring-0 ${text.body3} tracking-0`}
            >
              <SelectValue placeholder="Most Upvotes" />
            </SelectTrigger>
            <SelectContent className={`w-[255px] mt-8`}>
              <SelectItem
                value="0"
                className={`${text.body} font-[#647196] focus:bg-transparent 
                            focus:text-[#AD1FEA] cursor-pointer border-b p-3`}
              >
                Most Upvotes
              </SelectItem>
              <SelectItem
                value="1"
                className={`${text.body} font-[#647196] focus:bg-transparent 
                            focus:text-[#AD1FEA] cursor-pointer border-y p-3`}
              >
                Least Upvotes
              </SelectItem>
              <SelectItem
                value="2"
                className={`${text.body} font-[#647196] focus:bg-transparent 
                            focus:text-[#AD1FEA] cursor-pointer border-y p-3`}
              >
                Most Comments
              </SelectItem>
              <SelectItem
                value="3"
                className={`${text.body} font-[#647196] focus:bg-transparent 
                            focus:text-[#AD1FEA] cursor-pointer border-t p-3`}
              >
                Least Comments
              </SelectItem>
            </SelectContent>
          </Select>
        </span>
        <Link
          href={`/product-feedback/edit`}
          className={`ml-auto bg-[#AD1FEA] hover:bg-[#C75AF6] px-4 py-2.5 md:py-3 md:px-6 rounded-[10px] ${text.body4}`}
        >
          + Add Feedback
        </Link>
      </header>
      <div className={`grid-area-[main]`}>
        <ul className={`grid max-md:px-6 gap-4 auto-rows-min`}>
          {sortedFeedback.map((item) => (
            <li
              key={item.id}
              className={`bg-white rounded-[10px]`}
              style={
                { viewTransitionName: `feedback-${item.id}` } as CSSProperties
              }
            >
              <Link
                href={`/product-feedback/view/${item.id}`}
                className={`group grid 
                            grid-areas-[main_main_main|votes_votes_comments] grid-cols-[auto_1fr_auto] md:grid-areas-[votes_main_comments] cl:grid-cols-[auto_1fr_auto] 
                            h-full w-full px-8 py-7 gap-x-10 gap-y-4`}
              >
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    addUpvote(item.id);
                  }}
                  className={`flex md:flex-col grid-area-[votes] bg-[#F2F4FE] h-fit px-4 py-2 xl:py-3.5 xl:px-2 rounded-[10px] gap-2 hover:bg-[#CFD7FF] 
                                    min-w-[5ch] items-center justify-center ${text.h5} font-[#3A4374] w-fit`}
                >
                  <IconUp />
                  {item.upvotes}
                </button>
                <div className={`grid grid-area-[main] gap-1`}>
                  <h1
                    className={`font-[#3A4374] ${text.h3} group-hover:text-[#4661E6]`}
                  >
                    {item.title}
                  </h1>
                  <p className={`${text.body} font-[#647196]`}>
                    {item.description}
                  </p>
                  <ul className={`mt-2`}>
                    <li
                      className={`py-1 bg-[#F2F4FF] w-fit px-4 rounded-[10px] ${text.body3} text-[#4661E6]`}
                    >
                      {_.startCase(item.category)}
                    </li>
                  </ul>
                </div>
                <div
                  className={`flex items-center gap-2 grid-area-[comments] font-bold ${text.h6}`}
                >
                  <IconComments />
                  {item.comments?.length ?? 0}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {sortedFeedback.length === 0 && (
          <div className={`max-md:px-6 max-md:pb-6`}>
            <div
              className={`grid justify-items-center text-center gap-12 w-full bg-white h-fit py-19 md:py-25 rouned-card`}
            >
              <Empty />
              <header className={`grid gap-4`}>
                <h1 className={`${text.h1} text-foreground-heading`}>
                  There is no feedback yet.
                </h1>
                <p className={`${text.body} text-foreground max-w-[35ch]`}>
                  Got a suggestion? Found a bug that needs to be squashed? We
                  love hearing about new ideas to improve our app.
                </p>
              </header>
              <button
                className={`${text.button} bg-primary text-white px-6 py-3 rounded-card`}
              >
                + Add Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
