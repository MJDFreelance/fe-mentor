"use client";

import { useFeedback } from "@/app/product-feedback/components/FeedbackContext";

const Page = () => {
  const { feedback } = useFeedback();

  return (
    <div
      className={`md:px-10 md:py-14 grid gap-6 grid-areas-[aside|header|main] xl:grid-areas-[aside_header|aside_main] max-w-[1110px] 
                w-full auto-rows-min xl:grid-cols-[auto_1fr] xl:grid-rows-[auto_1fr]`}
    >
      <aside
        className={`relative grid-area-[aside] flex gap-2.5 flex-col md:flex-row xl:flex-col`}
      >
        <section
          className={`flex-shrink-0 md:w-[223px] md:h-[178px] xl:w-[255px] xl:h-[137px] rounded-[10px] text-white px-6 py-4
                        grid max-md:grid-cols-2 max-md:min-h-[72px] items-end md:grid-rows-[1fr_auto] md:max-w-[]
                        bg-gradient-to-tl from-[#E84D70] via-[#A337F6] to-[#28A7ED]`}
        >
          <span className={`self-end`}>Frontend Mentor</span>
          <span className={`self-end`}>Feedback Board</span>
          <button
            className={`row-span-2 col-start-2 row-start-1 md:hidden justify-self-end self-center`}
          >
            X
          </button>
        </section>
        <section
          className={` max-md:absolute max-md:hidden flex gap-2.5 flex-col md:flex-row xl:flex-col w-full xl:max-w-[255px]`}
        >
          <div
            className={`flex flex-wrap bg-white flex-1 p-6 gap-2 gap-y-4 rounded-[10px]`}
          >
            <span className={`px-4 py-1 bg-[#F2F4FF] rounded-[10px]`}>All</span>
            <span className={`px-4 py-1 bg-[#F2F4FF] rounded-[10px]`}>UI</span>
            <span className={`px-4 py-1 bg-[#F2F4FF] rounded-[10px]`}>UX</span>
            <span className={`px-4 py-1 bg-[#F2F4FF] rounded-[10px]`}>
              Enhancement
            </span>
            <span className={`px-4 py-1 bg-[#F2F4FF] rounded-[10px]`}>Bug</span>
            <span className={`px-4 py-1 bg-[#F2F4FF] rounded-[10px]`}>
              Feature
            </span>
          </div>
          <div
            className={`grid grid-cols-[1fr_auto] bg-white flex-1 px-6 py-5 gap-y-6`}
          >
            <header className={`grid col-span-2 grid-cols-subgrid`}>
              <h2 className={``}>Roadmap</h2>
              <button>View</button>
            </header>
            <ul
              className={`grid grid-cols-subgrid col-span-2 gap-4 md:gap-2 xl:gap-4`}
            >
              <li className={`grid grid-cols-subgrid col-span-2`}>
                <span>Planned</span>
                <span className={`justify-self-end`}>2</span>
              </li>
              <li className={`grid grid-cols-subgrid col-span-2`}>
                <span>In-Progress</span>
                <span className={`justify-self-end`}>3</span>
              </li>
              <li className={`grid grid-cols-subgrid col-span-2`}>
                <span>Live</span>
                <span className={`justify-self-end`}>1</span>
              </li>
            </ul>
          </div>
        </section>
      </aside>
      <header
        className={`flex grid-area-[header] bg-[#373F68] text-white rounded-[10px] px-6 py-4 items-center`}
      >
        <span className={`max-md:hidden`}>6 Suggestions</span>
        <button className={`ml-auto bg-[#C75AF6] py-3 px-6 rounded-[10px]`}>
          + Add Feedback
        </button>
      </header>
      <ul className={`grid-area-[main] max-md:px-6`}>
        {feedback.map((item) => (
          <li key={item.id} className={`bg-white rounded-[10px]`}>
            <a
              className={`grid grid-areas-[main_main_main|votes_votes_comments] grid-cols-[auto_1fr_auto] md:grid-areas-[votes_main_comments] cl:grid-cols-[auto_1fr_auto] 
                            h-full w-full px-8 py-7 gap-10 `}
            >
              <div className={`grid-area-[votes]`}>112</div>
              <div className={`grid grid-area-[main] gap-1`}>
                <h1>Add tags for solutions</h1>
                <p>Easier to search for solutions based on a specific stack.</p>
                <ul className={`mt-2`}>
                  <li>Enhancement</li>
                </ul>
              </div>
              <div className={`grid-area-[comments]`}>112</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
