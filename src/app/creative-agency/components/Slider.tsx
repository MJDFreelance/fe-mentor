"use client";

import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import IconNext from "@/app/creative-agency/icons/icon-arrow-next.svg";
import IconPrev from "@/app/creative-agency/icons/icon-arrow-previous.svg";
import useEmblaCarousel, { EmblaViewportRefType } from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";

type ValueType = {
  emblaRef: EmblaViewportRefType | null;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
};

const ScrollContext = createContext<ValueType>({
  emblaRef: null,
  canScrollPrev: false,
  canScrollNext: false,
  scrollPrev: () => {},
  scrollNext: () => {},
});
export const useScroll = () => useContext(ScrollContext);
export const ScrollProvider: FC<{
  children?: ReactNode | undefined;
  emblaRef: EmblaViewportRefType;
  emblaApi: EmblaCarouselType | undefined;
}> = (props) => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = () => props.emblaApi?.scrollPrev();
  const scrollNext = () => props.emblaApi?.scrollNext();

  // Update navigation state when the carousel changes
  const updateButtons = useCallback(() => {
    if (!props.emblaApi) return;
    setCanScrollPrev(props.emblaApi.canScrollPrev());
    setCanScrollNext(props.emblaApi.canScrollNext());
  }, [props.emblaApi]);

  useEffect(() => {
    if (!props.emblaApi) return;
    props.emblaApi.on("select", updateButtons);
    updateButtons(); // Initial state update
  }, [props.emblaApi, updateButtons]);

  return (
    <ScrollContext.Provider
      value={{
        emblaRef: props.emblaRef,
        canScrollPrev,
        canScrollNext,
        scrollPrev,
        scrollNext,
      }}
    >
      {props.children}
    </ScrollContext.Provider>
  );
};

export const Slider = ({ children }: { children: ReactNode }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <ScrollProvider emblaRef={emblaRef} emblaApi={emblaApi}>
      <section className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">{children}</div>
        </div>
      </section>
    </ScrollProvider>
  );
};

export const Slide = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid min-w-full md:grid-areas-[rest_img_img]">
      {children}
    </div>
  );
};

export const SliderHeader = ({ children }: { children: ReactNode }) => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useScroll();

  return (
    <header
      className={`md:rx-20 px-25 grid gap-6 bg-background px-6 py-16 text-white md:col-span-2 md:col-start-1 md:row-start-1 md:h-max md:w-max md:py-30 md:pl-10 md:pr-30 xl:pl-page-padding`}
    >
      {children}
      <div className={`flex gap-4`}>
        <button onClick={() => scrollPrev()} disabled={!canScrollPrev}>
          <IconPrev />
        </button>
        <button onClick={() => scrollNext()} disabled={!canScrollNext}>
          <IconNext />
        </button>
      </div>
    </header>
  );
};
