import text from "@/app/developer-profile/text.module.css";
import context from "@/app/developer-profile/context.module.css";
import { ContactForm } from "@/app/developer-profile/components/ContactForm";
import { ReactNode } from "react";

export const DeveloperLayout = ({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) => {
  return (
    <div
      className={`${text.body} ${context.page} flex flex-col gap-20 items-center bg-black text-white min-h-screen w-max-screen w-full font-spaceGrotesk`}
    >
      <div className={`flex flex-col gap-20 items-center max-w-[1110px]`}>
        {children}
      </div>
      <footer
        id="contact-section"
        className={`flex flex-col items-center py-4 bg-[#242424] w-full pt-15 px-5 gap-[50px]`}
      >
        <div
          className={`grid xl:grid-cols-2 max-w-[1110px] w-full
                        bg-[url(/developer-profile/pattern-rings.svg)] bg-no-repeat bg-[-200px_45%] bg-[length:400px_129px]`}
        >
          <header className={`flex flex-col gap-5 max-xl:items-center`}>
            <h2 className={`${text.h1}`}>Contact</h2>
            <p
              className={`max-md:text-center max-w-[33ch] ${text.body} text-[#D9D9D9]`}
            >
              I would love to hear about your project and how I could help.
              Please fill in the form, and I’ll get back to you as soon as
              possible.
            </p>
          </header>
          <ContactForm />
          <section
            className={`flex mt-9 w-full border-t pt-10 pb-16 xl:col-span-2 max-w-[1110px]`}
          >
            <menu
              className={`flex max-md:flex-col justify-between md:w-full mx-auto gap-5 w-max`}
            >
              <span className={`font-bold ${text.name} px-6`}>{name}</span>
              <div className={`grid grid-cols-4 md:gap-8`}>
                {!name && (
                  <>
                    <img
                      src={`/developer-profile/icon-github.svg`}
                      alt={`github`}
                    />
                    <img
                      src={`/developer-profile/icon-frontend-mentor.svg`}
                      alt={`frontend mentor`}
                    />
                    <img
                      src={`/developer-profile/icon-linkedin.svg`}
                      alt={`linked in`}
                    />
                    <img
                      src={`/developer-profile/icon-twitter.svg`}
                      alt={`twitter`}
                    />
                  </>
                )}
                {name && (
                  <>
                    <a
                      href={`https://github.com/MJDFreelance/fe-mentor`}
                      target={"blank"}
                    >
                      <img
                        src={`/developer-profile/icon-github.svg`}
                        alt={`github`}
                      />
                    </a>
                    <a
                      href={`https://www.frontendmentor.io/profile/MJDFreelance`}
                      target={"blank"}
                    >
                      <img
                        src={`/developer-profile/icon-frontend-mentor.svg`}
                        alt={`frontend mentor`}
                      />
                    </a>
                    <a
                      href={`https://www.upwork.com/freelancers/michaeljdfreelance`}
                      target={"blank"}
                    >
                      <img
                        src={`/developer-profile/icon-up.svg`}
                        alt={`upwordk`}
                      />
                    </a>
                  </>
                )}
              </div>
            </menu>
          </section>
        </div>
      </footer>
    </div>
  );
};
