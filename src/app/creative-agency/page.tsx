import text from "@/app/creative-agency/text.module.css";
import { Splash, SplashText } from "@/app/creative-agency/components/Splash";
import { Button } from "@/app/creative-agency/components/Button";
import {
  Strategic,
  ArticleText,
} from "@/app/creative-agency/components/Strategic";
import Link from "next/link";
import {
  Approach,
  ApproachList,
  ApproachListItem,
} from "@/app/creative-agency/components/Approach";
import { CTA } from "@/app/creative-agency/components/CTA";
import { StrategicApproach } from "@/app/creative-agency/components/StrategicApproach";
import {
  Slide,
  Slider,
  SliderHeader,
} from "@/app/creative-agency/components/Slider";

const Page = () => {
  return (
    <>
      <Splash>
        <picture className={`md:grid-area-[all]`}>
          <source
            srcSet="/creative-agency/desktop/image-hero.jpg"
            type="image/jpeg"
            media={"(min-width: 1024px)"}
          />
          <source
            srcSet="/creative-agency/tablet/image-hero.jpg"
            type="image/jpeg"
            media={"(min-width: 768px)"}
          />
          <img
            className={`h-full w-full max-w-[800px] justify-self-end object-contain`}
            src="/creative-agency/mobile/image-hero.jpg"
            alt="Hero"
          />
        </picture>
        <SplashText>
          <h1 className={`${text.preseth3} max-w-[15ch]`}>
            Branding & website design agency
          </h1>
          <p className={`${text.preset1} md:max-w-40ch`}>
            We specialize in visual storytelling by creating cohesive brand and
            website design solutions for small businesses, giving lasting
            impressions to audiences in a digital world.
          </p>
          <Button>Learn More</Button>
        </SplashText>
      </Splash>
      <StrategicApproach>
        <Strategic>
          <picture
            className={`md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-1`}
          >
            <source
              srcSet="/creative-agency/desktop/image-strategic.jpg"
              type="image/jpeg"
              media={"(min-width: 1024px)"}
            />
            <source
              srcSet="/creative-agency/tablet/image-strategic.jpg"
              type="image/jpeg"
              media={"(min-width: 768px)"}
            />
            <img
              className={`h-full w-full object-cover`}
              src="/creative-agency/mobile/image-strategic.jpg"
              alt="Hero"
            />
          </picture>
          <ArticleText>
            <h1 className={`${text.preseth2}`}>Design is strategic.</h1>
            <p className={`${text.preset1}`}>
              “A well-crafted design strategy consistently produces desired
              outcomes and brand awareness. We are firm believers that success
              lies in creative collaboration with our clients.”
            </p>
            <Link href={``} className={`text-primary underline`}>
              Schedule a Call
            </Link>
          </ArticleText>
        </Strategic>
        <div className={`flex justify-end grid-area-[aprh] max-md:hidden`}>
          <h2
            className={`${text.preseth2} ml-auto mt-[126px] w-max max-w-[13ch] text-primary xl:translate-x-30`}
          >
            Our approach for creating a winning brand
          </h2>
        </div>
        <Approach>
          <h2 className={`${text.preseth2} md:hidden`}>
            Our approach for creating a winning brand
          </h2>
          <ApproachList>
            <ApproachListItem number={`01`}>
              <h3 className={`${text.preseth1}`}>Brand Strategy</h3>
              <p>
                Brand strategy is critical for long-term success. Outshining
                competitors and capturing the target audience are key.
              </p>
            </ApproachListItem>
            <ApproachListItem number={`01`}>
              <h3 className={`${text.preseth1}`}>Brand Strategy</h3>
              <p>
                Brand strategy is critical for long-term success. Outshining
                competitors and capturing the target audience are key.
              </p>
            </ApproachListItem>
            <ApproachListItem number={`01`}>
              <h3 className={`${text.preseth1}`}>Brand Strategy</h3>
              <p>
                Brand strategy is critical for long-term success. Outshining
                competitors and capturing the target audience are key.
              </p>
            </ApproachListItem>
            <ApproachListItem number={`01`}>
              <h3 className={`${text.preseth1}`}>Brand Strategy</h3>
              <p>
                Brand strategy is critical for long-term success. Outshining
                competitors and capturing the target audience are key.
              </p>
            </ApproachListItem>
          </ApproachList>
        </Approach>
      </StrategicApproach>
      <Slider>
        <Slide>
          <picture className={`md:grid-area-[img]`}>
            <source
              srcSet="/creative-agency/desktop/image-slide-1.jpg"
              type="image/jpeg"
              media={"(min-width: 1024px)"}
            />
            <source
              srcSet="/creative-agency/tablet/image-slide-1.jpg"
              type="image/jpeg"
              media={"(min-width: 768px)"}
            />
            <img
              className={`h-full w-full max-w-[800px] justify-self-end object-contain`}
              src="/creative-agency/mobile/image-slide-1.jpg"
              alt="Hero"
            />
          </picture>
          <SliderHeader>
            <h2 className={`${text.preseth2}`}>
              Brand naming & <br />
              guidelines
            </h2>
          </SliderHeader>
        </Slide>
        <Slide>
          <picture className={`md:grid-area-[img]`}>
            <source
              srcSet="/creative-agency/desktop/image-slide-1.jpg"
              type="image/jpeg"
              media={"(min-width: 1024px)"}
            />
            <source
              srcSet="/creative-agency/tablet/image-slide-1.jpg"
              type="image/jpeg"
              media={"(min-width: 768px)"}
            />
            <img
              className={`h-full w-full max-w-[800px] justify-self-end object-contain`}
              src="/creative-agency/mobile/image-slide-1.jpg"
              alt="Hero"
            />
          </picture>
          <SliderHeader>
            <h2 className={`${text.preseth2}`}>
              Brand naming & <br />
              guidelines 2
            </h2>
          </SliderHeader>
        </Slide>
      </Slider>
      <CTA>
        <h2 className={`${text.preseth2}`}>
          Let&apos;s build something great together.
        </h2>
        <Button>Schedule Call</Button>
      </CTA>
    </>
  );
};

export default Page;
