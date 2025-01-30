import {
  HomeArticle,
  HomeArticleText,
} from "@/app/photosnap/components/HomeArticle";
import IconCheck from "@/app/photosnap/icons/check.svg";
import { Options } from "@/app/photosnap/components/Options";
import text from "@/app/photosnap/text.module.css";

const Page = () => {
  return (
    <>
      <section
        className={`grid grid-cols-1 md:grid-cols-[273fr_222fr_273fr] xl:grid-cols-[61fr_22fr_61fr] auto-rows-min`}
      >
        <HomeArticle isInnerFeature={true} orient={`left`}>
          <HomeArticleText>
            <h2 className={`${text.h1}`}>PRICING</h2>
            <p className={`${text.body} opacity-60`}>
              Create a your stories, Photosnap is a platform for photographers
              and visual storytellers. It’s the simple way to create and share
              your photos.
            </p>
          </HomeArticleText>
          <img
            className={`justify-self-end md:grid-area-[image] h-[490px] xl:w-[830px] bg-white max-md:h-[294px]`}
            src={`/photosnap/pricing/desktop/hero.jpg`}
            alt={`hero`}
          />
        </HomeArticle>
      </section>
      <Options />
      <section className={`${text.eyebrow} w-full py-30 bg-white px-10 `}>
        <div
          className={`max-w-[731px] mx-auto grid grid-cols-3 md:grid-cols-[auto_auto_auto_auto] uppercase gap-y-4 md:gap-y-6 text-nowrap`}
        >
          <div className={`max-md:col-span-3 `}>THE FEATURES</div>
          <div
            className={`grid col-span-3 grid-cols-subgrid justify-center max-md:hidden`}
          >
            <div className={`justify-self-center`}>Basic</div>
            <div className={`justify-self-center`}>Pro</div>
            <div className={`justify-self-center`}>Business</div>
          </div>
          <hr className={`col-span-3 md:col-span-4`} />
          <div className={`max-md:col-span-3 max-md:my-2`}>
            UNLIMITED STORY POSTING
          </div>
          <div
            className={`grid col-span-3 grid-cols-subgrid grid-rows-[auto_auto]`}
          >
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BASIC</div>
              <IconCheck />
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>PRO</div>
              <IconCheck />
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BUSINESS</div>
              <IconCheck />
            </div>
          </div>
          <hr className={`col-span-3 md:col-span-4`} />
          <div className={`max-md:col-span-3  max-md:my-2`}>
            UNLIMITED PHOTO UPLOAD
          </div>
          <div
            className={`grid col-span-3 grid-cols-subgrid grid-rows-[auto_auto]`}
          >
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BASIC</div>
              <IconCheck />
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>PRO</div>
              <IconCheck />
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BUSINESS</div>
              <IconCheck />
            </div>
          </div>
          <hr className={`col-span-3 md:col-span-4`} />
          <div className={`max-md:col-span-3  max-md:my-2`}>
            EMBEDDING CUSTOM CONTENT
          </div>
          <div
            className={`grid col-span-3 grid-cols-subgrid grid-rows-[auto_auto]`}
          >
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BASIC</div>
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>PRO</div>
              <IconCheck />
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BUSINESS</div>
              <IconCheck />
            </div>
          </div>
          <hr className={`col-span-3 md:col-span-4`} />
          <div className={`max-md:col-span-3  max-md:my-2`}>
            CUSTOMIZE METADATA
          </div>
          <div
            className={`grid col-span-3 grid-cols-subgrid grid-rows-[auto_auto]`}
          >
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BASIC</div>
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>PRO</div>
              <IconCheck />
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BUSINESS</div>
              <IconCheck />
            </div>
          </div>
          <hr className={`col-span-3 md:col-span-4`} />
          <div className={`max-md:col-span-3  max-md:my-2`}>
            ADVANCED METRICS
          </div>
          <div
            className={`grid col-span-3 grid-cols-subgrid grid-rows-[auto_auto]`}
          >
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BASIC</div>
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>PRO</div>
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BUSINESS</div>
              <IconCheck />
            </div>
          </div>
          <hr className={`col-span-3 md:col-span-4`} />
          <div className={`max-md:col-span-3  max-md:my-2`}>
            PHOTO DOWNLOADS
          </div>
          <div
            className={`grid col-span-3 grid-cols-subgrid grid-rows-[auto_auto]`}
          >
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BASIC</div>
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>PRO</div>
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BUSINESS</div>
              <IconCheck />
            </div>
          </div>
          <hr className={`col-span-3 md:col-span-4`} />
          <div className={`max-md:col-span-3  max-md:my-2`}>
            SEARCH ENGINE INDEXING
          </div>
          <div
            className={`grid col-span-3 grid-cols-subgrid grid-rows-[auto_auto]`}
          >
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BASIC</div>
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>PRO</div>
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BUSINESS</div>
              <IconCheck />
            </div>
          </div>
          <hr className={`col-span-3 md:col-span-4`} />
          <div className={`max-md:col-span-3  max-md:my-2`}>
            CUSTOM ANALYTICS
          </div>
          <div
            className={`grid col-span-3 grid-cols-subgrid grid-rows-[auto_auto]`}
          >
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BASIC</div>
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>PRO</div>
            </div>
            <div
              className={`grid grid-rows-subgrid justify-start row-span-2 md:justify-center gap-y-2`}
            >
              <div className={`md:hidden`}>BUSINESS</div>
              <IconCheck />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
