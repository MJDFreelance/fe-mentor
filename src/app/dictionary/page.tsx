"use client";

import { useSearch } from "@/app/dictionary/components/SearchContext";
import { AudioButton } from "@/app/dictionary/components/AudioButton";
import text from "@/app/dictionary/text.module.css";

const Page = () => {
  const { result } = useSearch();

  return (
    <>
      {result?.title && (
        <section
          className={`grid justify-center items-center text-center gap-y-6 mt-[80px]`}
        >
          <img
            src={`/dictionary/smile.png`}
            className={`mx-auto mb-5`}
            alt={`smile`}
          />
          <h2
            className={`${text.title} text-[#2D2D2D] group-data-[color-mode=dark]:text-white`}
          >
            {result?.title}
          </h2>
          <p className={`max-w-[63ch] ${text.body} text-[#757575]`}>
            {result?.message} {result?.resolution}
          </p>
        </section>
      )}
      {result &&
        !result.title &&
        result?.map((item: any, index: number) => (
          <main key={index} className={`grid gap-y-10 max-w-[736px]`}>
            <header className={`grid grid-cols-[1fr_max] items-center`}>
              <AudioButton index={index} item={item} />
              <h1 className={`font-bold ${text.title}`} key={index}>
                {item.word}
              </h1>
              <h2 className={`text-[#A445ED] ${text.subtitle}`}>
                {item.phonetic}
              </h2>
            </header>
            {item.meanings?.map((meaning: any, index: number) => (
              <article key={index} className={`grid gap-y-10`}>
                <header className={`flex gap-5 items-center`}>
                  <span
                    className={`${text.subtitle} italic font-bold text-[24px]`}
                  >
                    {meaning.partOfSpeech}
                  </span>
                  <hr className={`w-full`} />
                </header>
                {meaning.definitions && (
                  <section className={`grid gap-y-6`}>
                    <h3 className={`${text.subsubtitle} text-[#757575]`}>
                      Meaning
                    </h3>
                    <ul className={`grid gap-y-3 list-disc ml-12`}>
                      {meaning.definitions.map(
                        (definition: any, index: number) => (
                          <li
                            key={`definition-${index}`}
                            className={`${text.body} max-w-screen`}
                          >
                            {definition.definition}
                          </li>
                        ),
                      )}
                    </ul>
                  </section>
                )}
                {meaning.synonyms && meaning.synonyms.length > 0 && (
                  <span
                    className={`${text.synonyms} flex gap-8 items-center text-[20px] text-[#757575]`}
                  >
                    Synonyms{" "}
                    <span className={`font-bold text-[#A445ED]`}>
                      {meaning.synonyms.join(", ")}
                    </span>
                  </span>
                )}
              </article>
            ))}
            <hr />
            <span className={`${text.source}`}>
              Source <span>{item.sourceUrls[0]}</span>
            </span>
          </main>
        ))}
    </>
  );
};

export default Page;
