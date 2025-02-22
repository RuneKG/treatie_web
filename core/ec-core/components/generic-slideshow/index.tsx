import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ReactNode, useEffect, useReducer, useState } from 'react';

import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils';

interface Props {
  className?: string;
  buttonWrapperClassname?: string;
  interval?: number;
  slides: ReactNode[];
}

const GenericSlideshow = ({
  className,
  interval = 15_000,
  slides,
  buttonWrapperClassname,
}: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isPaused] = useReducer((val: boolean) => !val, false);

  const [activeSlide, setActiveSlide] = useState(1);

  const [visibilityState, setVisibilityState] = useState<
    DocumentVisibilityState | Omit<string, 'hidden' | 'visible'>
  >('');
  const t = useTranslations('Components.Slideshow');

  useEffect(() => {
    const autoplay = setInterval(() => {
      if (isPaused) return;
      if (isHoverPaused) return;
      if (!emblaApi) return;
      if (visibilityState === 'hidden') return;

      emblaApi.scrollNext();
    }, interval);

    return () => clearInterval(autoplay);
  }, [emblaApi, interval, isHoverPaused, isPaused, visibilityState]);

  useEffect(() => {
    window.addEventListener('visibilitychange', () => {
      setVisibilityState(document.visibilityState);
    });

    return () => window.removeEventListener('visibilitychange', () => null);
  }, [visibilityState]);

  useEffect(() => {
    if (!emblaApi) return;

    // We must reinitialize Embla on client-side navigation
    // E.g., navigating from Homepage to PDP to Homepage
    emblaApi.reInit();

    const initialize = () => {
      setActiveSlide(emblaApi.selectedScrollSnap() + 1);
    };

    const onSelect = () => {
      setActiveSlide(emblaApi.selectedScrollSnap() + 1);
    };

    emblaApi.on('slidesInView', initialize);
    emblaApi.on('reInit', initialize);
    emblaApi.on('select', onSelect);
  }, [emblaApi, setActiveSlide]);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Interactive slide show"
      aria-roledescription="carousel"
      className={cn('relative overflow-hidden', className)}
      onBlur={() => setIsHoverPaused(false)}
      onFocus={() => setIsHoverPaused(true)}
      onMouseEnter={() => setIsHoverPaused(true)}
      onMouseLeave={() => setIsHoverPaused(false)}
    >
      <div ref={emblaRef}>
        <ul className="flex" id="slideshow-slides">
          {slides.map((slide, index) => (
            <li
              aria-label={t('slideNo', { n: index + 1, total: slides.length })}
              aria-roledescription={t('slide')}
              className="min-w-0 shrink-0 grow-0 basis-full"
              inert={index === activeSlide - 1 ? undefined : true}
              key={index}
            >
              {slide}
            </li>
          ))}
        </ul>
      </div>
      {slides.length > 1 && (
        <div className={buttonWrapperClassname}>
          <div className="absolute bottom-12 end-12 flex items-center gap-4">
            <Button
              aria-controls="slideshow-slides"
              aria-label="Previous slide"
              className="bg-bg-light h-10 w-10 p-0"
              onClick={scrollPrev}
              variant="subtle"
            >
              <ArrowLeft />
            </Button>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button aria-atomic="false" aria-live={isPaused ? 'polite' : 'off'} key={index}>
                  <div
                    className={cn(
                      activeSlide === index + 1 ? 'bg-white' : 'bg-white/25',
                      'h-2.5 w-2.5 rounded',
                    )}
                  />
                </button>
              ))}
            </div>
            <Button
              aria-controls="slideshow-slides"
              aria-label="Next slide"
              className="h-10 w-10 p-0"
              onClick={scrollNext}
            >
              <ArrowRight className="text-white" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export { GenericSlideshow };
