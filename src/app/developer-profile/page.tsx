import text from "@/app/developer-profile/text.module.css";

const Page = () => {
  return (
    <>
      <header
        className={`grid md:grid-cols-2 w-full max-md:justify-center px-4 max-xl:max-w-[768px]
                    bg-[url(/developer-profile/pattern-rings.svg)] bg-no-repeat 
                    xl:bg-[-100px_100px] xl:bg-[length:400px_129px] bg-[-150px_50px] bg-[length:400px_100px]`}
      >
        <section
          className={`flex md:justify-between items-center max-md:flex-col w-full gap-5 z-10 my-5 md:my-7 md:px-8
                        md:col-start-1 md:row-start-1 md:-col-end-1 self-start justify-self-end`}
        >
          <span className={`${text.name}`}>adamkeyes</span>
          <span className={`flex gap-6`}>
            <img src={`/developer-profile/icon-github.svg`} />
            <img src={`/developer-profile/icon-frontend-mentor.svg`} />
            <img src={`/developer-profile/icon-linkedin.svg`} />
            <img src={`/developer-profile/icon-twitter.svg`} />
          </span>
        </section>
        <div
          className={`relative md:col-start-2 md:row-start-1 md:col-span-2 md:justify-self-end max-md:mx-auto`}
        >
          <div
            className={`absolute bg-[url(/developer-profile/pattern-circle.svg)] bg-no-repeat bg-[0_80%] h-[129px] w-[129px] 
                        xl:translate-x-[-50%] translate-x-[50%] max-xl:right-0 bottom-0
                        xl:bottom-[70px]`}
          ></div>
          <img
            src={`/developer-profile/image-profile-mobile.webp`}
            className={`md:hidden mt-[-100px] w-[175px]`}
          />
          <img
            src={`/developer-profile/image-profile-tablet.webp`}
            className={`max-md:hidden xl:hidden w-[322px]`}
          />
          <img
            src={`/developer-profile/image-profile-desktop.webp`}
            className={`max-xl:hidden w-[445px]
                    `}
          />
        </div>
        <section
          className={`grid md:justify-between items-center max-md:flex-col w-full gap-5 z-10 my-5 md:my-7 md:self-end xl:self-center
                        md:col-start-1 md:row-start-1 md:-col-end-1 md:gap-11 justify-center max-md:text-center md:col-span-2`}
        >
          <h1 className={`${text.h1} font-bold md:max-w-[15ch] xl:max-w-50ch`}>
            Nice to <br className={`max-md:hidden xl:hidden`} /> meet you!{" "}
            <br className={`md:hidden xl:flex`} />
            I’m <br className={`max-md:hidden xl:hidden`} />
            <span className={`border-primary border-b-[4px]`}>Adam Keyes.</span>
          </h1>
          <p className={`max-w-[38ch] ${text.body}`}>
            Based in the UK, I’m a front-end developer passionate about building
            accessible web apps that users love.
          </p>
          <a
            className={`${text.link} hover:text-primary border-primary border-b uppercase pb-2.5 w-max mt-5 max-md:mx-auto`}
          >
            contact me
          </a>
        </section>
      </header>
      <section
        className={`w-full px-4 max-xl:max-w-[768px]
                    bg-[url(/developer-profile/pattern-rings.svg)] bg-no-repeat bg-[150%_140%]`}
      >
        <ul
          className={`border-t border-white py-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6 gap-x-8`}
        >
          <li className={`flex flex-col max-md:items-center gap-[1px]`}>
            <h2 className={`${text.h2}`}>HTML</h2>
            <span className={`${text.body} text-[#D9D9D9]`}>
              4 Years Experience
            </span>
          </li>
          <li className={`flex flex-col max-md:items-center gap-[1px]`}>
            <h2 className={`${text.h2}`}>CSS</h2>
            <span className={`${text.body} text-[#D9D9D9]`}>
              4 Years Experience
            </span>
          </li>
          <li className={`flex flex-col max-md:items-center gap-[1px]`}>
            <h2 className={`${text.h2}`}>Javascript</h2>
            <span className={`${text.body} text-[#D9D9D9]`}>
              4 Years Experience
            </span>
          </li>
          <li className={`flex flex-col max-md:items-center gap-[1px]`}>
            <h2 className={`${text.h2}`}>Accessibility</h2>
            <span className={`${text.body} text-[#D9D9D9]`}>
              4 Years Experience
            </span>
          </li>
          <li className={`flex flex-col max-md:items-center gap-[1px]`}>
            <h2 className={`${text.h2}`}>React</h2>
            <span className={`${text.body} text-[#D9D9D9]`}>
              3 Years Experience
            </span>
          </li>
          <li className={`flex flex-col max-md:items-center gap-[1px]`}>
            <h2 className={`${text.h2}`}>Sass</h2>
            <span className={`${text.body} text-[#D9D9D9]`}>
              3 Years Experience
            </span>
          </li>
        </ul>
      </section>
      <section
        className={`grid md:grid-cols-2 w-full px-4 gap-10 max-xl:max-w-[768px]`}
      >
        <header
          className={`flex justify-between items-center w-full md:col-span-2`}
        >
          <h1 className={`${text.h1}`}>Projects</h1>
          <a
            className={`${text.link} cursor-pointer hover:text-primary text-center uppercase  pb-2.5 border-b-2 border-primary`}
          >
            contact me
          </a>
        </header>
        <article className={`flex flex-col gap-5`}>
          <div className={`relative group cursor-pointer`}>
            <div
              className={`${text.link} flex flex-col gap-12 items-center justify-center absolute inset-0 bg-[rgba(0,0,0,.75)] opacity-0 group-hover:opacity-100`}
            >
              <a
                className={`hover:text-primary cursor-pointer text-center uppercase] pb-2.5 border-b-2 border-primary`}
              >
                view project
              </a>
              <a
                className={`hover:text-primary cursor-pointer text-center uppercase pb-2.5 border-b-2 border-primary`}
              >
                view code
              </a>
            </div>
            <img src={`/developer-profile/thumbnail-project-1-small.webp`} />
          </div>
          <header className={`flex flex-col gap-2`}>
            <h3 className={`${text.h3}`}>DESIGN PORTFOLIO</h3>
            <span className={`${text.skill} flex gap-[1.125rem]`}>
              <span className={``}>html</span>
              <span className={``}>css</span>
            </span>
          </header>
          <span className={`${text.link} flex gap-11 uppercase xl:hidden`}>
            <a
              className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
            >
              view project
            </a>
            <a
              className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
            >
              view code
            </a>
          </span>
        </article>
        <article className={`flex flex-col gap-5`}>
          <div className={`relative group cursor-pointer`}>
            <div
              className={`${text.link} flex flex-col gap-12 items-center justify-center absolute inset-0 bg-[rgba(0,0,0,.75)] opacity-0 group-hover:opacity-100`}
            >
              <a
                className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
              >
                view project
              </a>
              <a
                className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
              >
                view code
              </a>
            </div>
            <img src={`/developer-profile/thumbnail-project-2-small.webp`} />
          </div>
          <header className={`flex flex-col gap-2`}>
            <h3 className={`${text.h3}`}>E-LEARNING LANDING PAGE</h3>
            <span className={`${text.skills}`}>
              <span className={``}>html</span>
              <span className={``}>css</span>
            </span>
          </header>
          <span className={`${text.link} flex gap-11 uppercase xl:hidden`}>
            <a
              className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
            >
              view project
            </a>
            <a
              className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
            >
              view code
            </a>
          </span>
        </article>
        <article className={`flex flex-col gap-5`}>
          <div className={`relative group cursor-pointer`}>
            <div
              className={`${text.link} flex flex-col gap-12 items-center justify-center absolute inset-0 bg-[rgba(0,0,0,.75)] opacity-0 group-hover:opacity-100`}
            >
              <a
                className={`hover:text-primary cursor-pointer text-center uppercase pb-2.5 border-b-2 border-primary`}
              >
                view project
              </a>
              <a
                className={`hover:text-primary cursor-pointer text-center uppercase  pb-2.5 border-b-2 border-primary`}
              >
                view code
              </a>
            </div>
            <img src={`/developer-profile/thumbnail-project-3-small.webp`} />
          </div>
          <header className={`flex flex-col gap-2`}>
            <h3 className={`${text.h3}`}>TODO WEB APP</h3>
            <span className={`uppercase text-[#D9D9D9] flex gap-[1.125rem]`}>
              <span className={`${text.skills}`}>html</span>
              <span className={``}>css</span>
              <span className={``}>javascript</span>
            </span>
          </header>
          <span className={`${text.link} flex gap-11 uppercase xl:hidden`}>
            <a
              className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
            >
              view project
            </a>
            <a
              className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
            >
              view code
            </a>
          </span>
        </article>
        <article className={`flex flex-col gap-5`}>
          <div className={`relative group cursor-pointer`}>
            <div
              className={`${text.link} flex flex-col gap-12 items-center justify-center absolute inset-0 bg-[rgba(0,0,0,.75)] opacity-0 group-hover:opacity-100`}
            >
              <a
                className={`hover:text-primary cursor-pointer text-center uppercase pb-2.5 border-b-2 border-primary`}
              >
                view project
              </a>
              <a
                className={`hover:text-primary cursor-pointer text-center uppercase pb-2.5 border-b-2 border-primary`}
              >
                view code
              </a>
            </div>
            <img src={`/developer-profile/thumbnail-project-4-small.webp`} />
          </div>
          <header className={`flex flex-col gap-2`}>
            <h3 className={`${text.h3}`}>ENTERTAINMENT WEB APP</h3>
            <span className={`uppercase text-[#D9D9D9] flex gap-[1.125rem]`}>
              <span className={`${text.skills}`}>html</span>
              <span className={``}>css</span>
              <span className={``}>javascript</span>
            </span>
          </header>
          <span className={`${text.link} flex gap-11 uppercase xl:hidden`}>
            <a
              className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
            >
              view project
            </a>
            <a
              className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
            >
              view code
            </a>
          </span>
        </article>
        <article className={`flex flex-col gap-5`}>
          <div className={`relative group cursor-pointer`}>
            <div
              className={`${text.link} flex flex-col gap-12 items-center justify-center absolute inset-0 bg-[rgba(0,0,0,.75)] opacity-0 group-hover:opacity-100`}
            >
              <a
                className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
              >
                view project
              </a>
              <a
                className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
              >
                view code
              </a>
            </div>
            <img src={`/developer-profile/thumbnail-project-5-small.webp`} />
          </div>
          <header className={`flex flex-col gap-2`}>
            <h3 className={`${text.h3}`}>MEMORY GAME</h3>
            <span className={`${text.skills}`}>
              <span className={``}>html</span>
              <span className={``}>css</span>
              <span className={``}>javascript</span>
            </span>
          </header>
          <span className={`${text.link} flex gap-11 uppercase xl:hidden`}>
            <a
              className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
            >
              view project
            </a>
            <a
              className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
            >
              view code
            </a>
          </span>
        </article>
        <article className={`flex flex-col gap-5`}>
          <div className={`relative group cursor-pointer`}>
            <div
              className={`${text.link} flex flex-col gap-12 items-center justify-center absolute inset-0 bg-[rgba(0,0,0,.75)] opacity-0 group-hover:opacity-100`}
            >
              <a
                className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
              >
                view project
              </a>
              <a
                className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
              >
                view code
              </a>
            </div>
            <img src={`/developer-profile/thumbnail-project-6-small.webp`} />
          </div>
          <header className={`flex flex-col gap-2`}>
            <h3 className={`${text.h3}`}>ART GALLERY SHOWCASE</h3>
            <span className={`${text.skills}`}>
              <span className={``}>html</span>
              <span className={``}>css</span>
            </span>
          </header>
          <span className={`${text.link} flex gap-11 uppercase xl:hidden`}>
            <a
              className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
            >
              view project
            </a>
            <a
              className={`hover:text-primary cursor-pointer text-center pb-2.5 border-b-2 border-primary`}
            >
              view code
            </a>
          </span>
        </article>
      </section>
    </>
  );
};

export default Page;
