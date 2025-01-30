<section className="flex flex-col-reverse lg:flex-row px-4 md:px-10 xl:px-[165px] items-center">
  <div className="flex flex-col gap-6 justify-center flex-1 pt-8 text-center md:text-left px-6 lg:px-0 max-w-[95ch]">
    <h2 className="text-xl md:text-3xl uppercase tracking-wide">
      Bringing you the <strong className="text-primary font-bold">best</strong> audio gear
    </h2>
    <p className="text-sm md:text-base xl:max-w-[55ch]">
      Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
      earphones, speakers, and audio accessories. Stop by our store to meet our amazing team.
    </p>
  </div>
  <picture className="flex-1 w-full h-auto max-h-[368px]">
    <source
      srcSet="/audiophile/shared/desktop/image-best-gear.jpg"
      media="(min-width: 1280px)"
    />
    <source
      srcSet="/audiophile/shared/tablet/image-best-gear.jpg"
      media="(min-width: 768px)"
    />
    <source
      srcSet="/audiophile/shared/mobile/image-best-gear.jpg"
      media="(max-width: 767px)"
    />
    <img
      src="/audiophile/shared/mobile/image-best-gear.jpg"
      alt="Hero image"
      className="w-full h-auto object-cover"
    />
  </picture>
</section>