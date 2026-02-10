import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: UseIntersectionObserverOptions = { threshold: 0.1, triggerOnce: true }
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (options.triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!options.triggerOnce) {
        setIsIntersecting(false);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isIntersecting;
}