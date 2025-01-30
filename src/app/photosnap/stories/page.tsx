import Link from "next/link";
import { StoryCard } from "@/app/photosnap/components/StoryCard";
import Arrow from "@/app/photosnap/icons/arrow.svg";
import text from "@/app/photosnap/text.module.css";

const Page = () => {
  return (
    <>
      <section
        className={`flex flex-col md:grid grid-cols-1 md:grid-cols-[273fr_222fr_273fr] xl:grid-cols-[61fr_22fr_61fr] auto-rows-min`}
      >
        {/*<img src={`/photosnap/stories/desktop/moon-of-appalacia.jpg`} className={`grid-area-[main] min-h-[650px] object-cover`} />*/}
        <picture className="grid-area-[main] md:min-h-[650px] object-cover">
          <source
            srcSet="/photosnap/stories/desktop/moon-of-appalacia.jpg"
            media="(min-width: 786px)"
          />
          <source
            srcSet="/photosnap/stories/tablet/moon-of-appalacia.jpg"
            media="(min-width: 768px)"
          />
          <source
            srcSet="/photosnap/stories/mobile/moon-of-appalacia.jpg"
            media="(max-width: 767px)"
          />
          <img
            src="/photosnap/stories/mobile/moon-of-appalacia.jpg"
            alt="Hero image"
            className="min-w-full min-h-full object-cover object-[.6]"
          />
        </picture>
        <section
          className={`grid md:grid-area-[main] text-white px-8 md:px-[112px] gap-6 py-18 max-md:justify-center`}
        >
          <span className={`${text.eyebrow}`}>LAST MONTH’S FEATURED STORY</span>
          <header className={`grid gap-4`}>
            <h2 className={`${text.h1} max-w-[15ch]`}>
              HAZY FULL MOON OF APPALACHIA
            </h2>
            <span className={`${text.body2}`}>
              <span className={`opacity-75`}>March 2nd 2020</span>
              <span>by John Appleseed</span>
            </span>
          </header>
          <p className={`${text.body} opacity-60 max-w-[45ch]`}>
            The dissected plateau area, while not actually made up of geological
            mountains, is popularly called &quot;mountains,&quot; especially in
            eastern Kentucky and West Virginia, and while the ridges are not
            high, the terrain is extremely rugged.
          </p>
          <Link
            href={``}
            className={`${text.link} flex items-center gap-4 hover:underline`}
          >
            READ THE STORY <Arrow className={`stroke-white`} />
          </Link>
        </section>
      </section>
      <section
        className={`grid md:grid-cols-2 xl:grid-cols-4 auto-rows-min text-white`}
      >
        <StoryCard image={`mountains`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>April 3rd 2020</span>
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
            <span className={`${text.body2}`}>April 16th 2020</span>
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
            <span className={`${text.body2}`}>April 14th 2020</span>
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
            <span className={`${text.body2}`}>April 11th 2020</span>
            <h2 className={`${text.h2}`}>Architecturals</h2>
            <span className={`${text.body2}`}>by Samantha Brooke</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`world-tour`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>April 9th 2020</span>
            <h2 className={`${text.h2}`}>World Tour 2019</h2>
            <span className={`${text.body2}`}>by Timothy Wagner</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`unforeseen-corners`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>April 3rd 2020</span>
            <h2 className={`${text.h2}`}>Unforeseen Corners</h2>
            <span className={`${text.body2}`}>by William Malcolm</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`king-on-africa`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>March 29th 2020</span>
            <h2 className={`${text.h2}`}>King on Africa: Part II</h2>
            <span className={`${text.body2}`}>by Tim Hillenburg</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`trip-to-nowhere`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>March 21st 2020</span>
            <h2 className={`${text.h2}`}>The Trip to Nowhere</h2>
            <span className={`${text.body2}`}>by Felicia Rourke</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`rage-of-the-sea`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>March 19th 2020</span>
            <h2 className={`${text.h2}`}>Rage of The Sea</h2>
            <span className={`${text.body2}`}>by Mohammed Abdul</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`running-free`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>March 16th 2020</span>
            <h2 className={`${text.h2}`}>Running Free</h2>
            <span className={`${text.body2}`}>by Michelle</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`behind-the-waves`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>March 11th 2020</span>
            <h2 className={`${text.h2}`}>Behind the Waves</h2>
            <span className={`${text.body2}`}>by Lamarr Wilson</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`calm-waters`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>March 9th 2020</span>
            <h2 className={`${text.h2}`}>Calm Waters</h2>
            <span className={`${text.body2}`}>by Samantha Brooke</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`dark-forest`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>March 5th 2020</span>
            <h2 className={`${text.h2}`}>The Milky Way</h2>
            <span className={`${text.body2}`}>by Benjamin Cruz</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`milky-way`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>March 4th 2020</span>
            <h2 className={`${text.h2}`}>Night at The Dark Forest</h2>
            <span className={`${text.body2}`}>by Mohammed Abdul</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`somwarpet`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>March 1st 2020</span>
            <h2 className={`${text.h2}`}>Somwarpet’s Beauty</h2>
            <span className={`${text.body2}`}>by Michelle</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
        <StoryCard image={`land-of-dreams`}>
          <header className={`grid gap-1 relative`}>
            <span className={`${text.body2}`}>February 25th 2020</span>
            <h2 className={`${text.h2}`}>Land of Dreams</h2>
            <span className={`${text.body2}`}>by William Malcolm</span>
          </header>
          <hr />
          <div className={`${text.link} relative flex justify-between`}>
            READ STORY <Arrow stroke={`white`} />
          </div>
        </StoryCard>
      </section>
    </>
  );
};

export default Page;
