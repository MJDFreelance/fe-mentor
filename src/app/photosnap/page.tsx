import {
  HomeArticle,
  HomeArticleText,
} from "@/app/photosnap/components/HomeArticle";
import Link from "next/link";
import IconResponsive from "@/app/photosnap/icons/responsive.svg";
import IconNoLimit from "@/app/photosnap/icons/no-limit.svg";
import IconEmbed from "@/app/photosnap/icons/embed.svg";
import Arrow from "@/app/photosnap/icons/arrow.svg";
import { StoryCard } from "@/app/photosnap/components/StoryCard";
import text from "@/app/photosnap/text.module.css";
import context from "@/app/photosnap/context.module.css";

const Page = () => {
  return (
    <>
      <section
        className={`grid grid-cols-1 md:grid-cols-[273fr_222fr_273fr] xl:grid-cols-[61fr_22fr_61fr] auto-rows-min`}
      >
        <HomeArticle isFeature={true} orient={`left`}>
          <HomeArticleText>
            <h2 className={`${text.h1} uppercase`}>
              Create and share your photo stories.{" "}
            </h2>
            <p className={`${text.body} opacity-60`}>
              Photosnap is a platform for photographers and visual storytellers.
              We make it easy to share photos, tell stories and connect with
              others.
            </p>
            <Link
              href={`/photosnap/stories`}
              className={`${text.link} mt-7 font-bold text-white flex items-center gap-4 hover:underline`}
            >
              GET AN INVITE <Arrow className={`stroke-white`} />
            </Link>
          </HomeArticleText>
          <img
            className={`md:grid-area-[image]  h-[271px] md:h-[650px] w-[830px] bg-white object-cover`}
            src={`/photosnap/home/desktop/create-and-share.jpg`}
            alt={`hero`}
          />
        </HomeArticle>
        <HomeArticle orient={`right`}>
          <HomeArticleText>
            <h2 className={`${text.h1}`}>BEAUTIFUL STORIES EVERY TIME</h2>
            <p className={`${text.body} opacity-60`}>
              We provide design templates to ensure your stories look terrific.
              Easily add photos, text, embed maps and media from other networks.
              Then share your story with everyone.
            </p>
            <Link
              href={`/photosnap/stories`}
              className={`${text.link} mt-7 text-black flex items-center gap-4 hover:underline`}
            >
              VIEW THE STORIES <Arrow className={`stroke-black`} />
            </Link>
          </HomeArticleText>
          <img
            className={`md:grid-area-[image] h-[271px] md:h-[650px] w-[830px] bg-white object-cover`}
            src={`/photosnap/home/desktop/beautiful-stories.jpg`}
            alt={`hero`}
          />
        </HomeArticle>
        <HomeArticle orient={`left`}>
          <HomeArticleText>
            <h2 className={`${text.h1}`}>DESIGNED FOR EVERYONE</h2>
            <p className={`${text.body} opacity-60`}>
              We provide design templates to ensure your stories look terrific.
              Easily add photos, text, embed maps and media from other networks.
              Then share your story with everyone.
            </p>
            <Link
              href={`/photosnap/stories`}
              className={`${text.link} mt-7 text-black flex items-center gap-4 hover:underline`}
            >
              VIEW THE STORIES <Arrow className={`stroke-black`} />
            </Link>
          </HomeArticleText>
          <img
            className={`md:grid-area-[image] h-[271px] md:h-[650px] w-[830px] bg-white object-cover object-center`}
            src={`/photosnap/home/desktop/designed-for-everyone.jpg`}
            alt={`hero`}
          />
        </HomeArticle>
      </section>
      <section
        className={`grid md:grid-cols-2 xl:grid-cols-4 auto-rows-min text-white`}
      >
        <StoryCard image={`mountains`}>
          <header className={`grid gap-1 relative`}>
            <h2 className={`${text.h2}`}>The Mountains</h2>
            <span className={`${text.body2}`}>by John Appleseed</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`cityscapes`}>
          <header className={`grid gap-1 relative`}>
            <h2 className={`${text.h2}`}>Sunset Cityscapes</h2>
            <span className={`${text.body2}`}>by Benjamin Cruz</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`18-days-voyage`}>
          <header className={`grid gap-1 relative`}>
            <h2 className={`${text.h2}`}>18 Days Voyage</h2>
            <span className={`${text.body2}`}>by Alexei Borodin</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`architecturals`}>
          <header className={`grid gap-1 relative`}>
            <h2 className={`${text.h2}`}>Architecturals</h2>
            <span className={`${text.body2}`}>by Samantha Brooke</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
      </section>
      <section
        className={`grid md:grid-cols-3 justify-center py-30 bg-white gap-y-7.5 md:px-[165px] `}
      >
        <div
          className={`grid max-w-[350px] text-center gap-4 grid-rows-subgrid row-span-3`}
        >
          <IconResponsive className={`justify-self-center mb-8`} />
          <h2 className={`${text.h2}`}>100% Responsive</h2>
          <p className={`${text.body2} max-w-[40ch]`}>
            No matter which the device you’re on, our site is fully responsive
            and stories look beautiful on any screen.
          </p>
        </div>
        <div
          className={`grid max-w-[350px] text-center gap-4 grid-rows-subgrid row-span-3`}
        >
          <IconNoLimit className={`justify-self-center mb-8`} />
          <h2 className={`${text.h2}`}>No Photo Upload Limit</h2>
          <p className={`${text.body2} max-w-[40ch]`}>
            Our tool has no limits on uploads or bandwidth. Freely upload in
            bulk and share all of your stories in one go.
          </p>
        </div>
        <div
          className={`grid max-w-[350px] text-center gap-4 grid-rows-subgrid row-span-3`}
        >
          <IconEmbed className={`justify-self-center mb-8`} />
          <h2 className={`${text.h2}`}>Available to Embed</h2>
          <p className={`${text.body2} max-w-[40ch]`}>
            Embed Tweets, Facebook posts, Instagram media, Vimeo or YouTube
            videos, Google Maps, and more.
          </p>
        </div>
      </section>
    </>
  );
};

export default Page;
