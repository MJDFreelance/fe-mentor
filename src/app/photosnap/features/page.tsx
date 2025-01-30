import {
  HomeArticle,
  HomeArticleText,
} from "@/app/photosnap/components/HomeArticle";
import IconResponsive from "@/app/photosnap/icons/responsive.svg";
import IconNoLimit from "@/app/photosnap/icons/no-limit.svg";
import IconEmbed from "@/app/photosnap/icons/embed.svg";
import IconCustom from "@/app/photosnap/icons/embed.svg";
import IconBoost from "@/app/photosnap/icons/boost-exposure.svg";
import IconDrag from "@/app/photosnap/icons/drag-drop.svg";
import Link from "next/link";
import { Infographic } from "@/app/photosnap/components/Infographic";
import text from "@/app/photosnap/text.module.css";
import context from "@/app/photosnap/context.module.css";

const Page = () => {
  return (
    <>
      <section
        className={`grid grid-cols-1 md:grid-cols-[273fr_222fr_273fr] xl:grid-cols-[61fr_22fr_61fr] auto-rows-min`}
      >
        <HomeArticle isInnerFeature={true} orient={`left`}>
          <HomeArticleText>
            <h2 className={`${text.h1}`}>FEATURES</h2>
            <p className={`${text.body} opacity-60`}>
              We make sure all of our features are designed to be loved by every
              aspiring and even professional photograpers who wanted to share
              their stories.
            </p>
          </HomeArticleText>
          <img
            className={`justify-self-end md:grid-area-[image] h-[490px] xl:w-[830px] bg-white max-md:h-[294px] object-cover`}
            src={`/photosnap/features/desktop/hero.jpg`}
            alt={`hero`}
          />
        </HomeArticle>
      </section>
      <section
        className={`grid gap-y-7. gap-x-3 xl:gap-x-7.5 px-10 xl:px-[165px] py-9 md:py-19 xl:py-24 bg-white grid-cols-1 md:grid-cols-2 xl:grid-cols-3`}
      >
        <Infographic>
          <IconResponsive className={`justify-self-center mb-8`} />
          <h2 className={`${text.h2}`}>100% Responsive</h2>
          <p className={`${text.body} max-w-[40ch] mx-auto`}>
            No matter which the device you’re on, our site is fully responsive
            and stories look beautiful on any screen.
          </p>
        </Infographic>
        <Infographic>
          <IconNoLimit className={`justify-self-center mb-8`} />
          <h2 className={`${text.h2}`}>No Photo Upload Limit</h2>
          <p className={`${text.body} max-w-[40ch] mx-auto`}>
            Our tool has no limits on uploads or bandwidth. Freely upload in
            bulk and share all of your stories in one go.
          </p>
        </Infographic>
        <Infographic>
          <IconEmbed className={`justify-self-center mb-8`} />
          <h2 className={`${text.h2}`}>Available to Embed</h2>
          <p className={`${text.body} max-w-[40ch] mx-auto`}>
            Embed Tweets, Facebook posts, Instagram media, Vimeo or YouTube
            videos, Google Maps, and more.
          </p>
        </Infographic>
        <Infographic>
          <IconCustom className={`justify-self-center mb-8`} />
          <h2 className={`${text.h2} `}>Custom Domain</h2>
          <p className={`${text.body} max-w-[40ch] mx-auto`}>
            With Photosnap subscriptions you can host your stories on your own
            domain. You can also remove our branding!
          </p>
        </Infographic>
        <Infographic>
          <IconBoost className={`justify-self-center mb-8`} />
          <h2 className={`${text.h2} `}>Boost Your Exposure</h2>
          <p className={`${text.body} max-w-[40ch] mx-auto`}>
            Users that viewed your story or gallery can easily get notifed of
            new and featured stories with our built in mailing list.
          </p>
        </Infographic>
        <Infographic>
          <IconDrag className={`justify-self-center mb-8`} />
          <h2 className={`${text.h2} `}>Drag & Drop Image</h2>
          <p className={`${text.body} max-w-[40ch] mx-auto`}>
            Easily drag and drop your image and get beautiful shots everytime.
            No over the top tooling to add friction to creating stories.
          </p>
        </Infographic>
      </section>
      <section
        className={`relative px-10 xl:px-[165px] py-[68px] text-white grid md:grid-cols-[1fr_auto] items-center gap-y-6
                        bg-[url(/photosnap/shared/mobile/bg-beta.jpg)] min-[450px]:bg-[url(/photosnap/shared/tablet/bg-beta.jpg)] bg-cover
                        min-[800px]:bg-[url(/photosnap/shared/desktop/bg-beta.jpg)]
                        content-[' '] before:bg-[rgba(0,0,0,.5)] before:absolute before:inset-0 z-0`}
      >
        <h2 className={`${text.h1} max-w-[19ch] uppercase relative`}>
          We’re in beta. Get your invite today!
        </h2>
        <Link href={`/`} className={`${text.link} relative`}>
          GET AN INVITE
        </Link>
      </section>
    </>
  );
};

export default Page;
