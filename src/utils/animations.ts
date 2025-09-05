export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

export const observeElements = (
  container: HTMLElement | null,
  selector: string = '.fade-in-section'
) => {
  if (!container) return () => {};

  const observer = createIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  });

  const elements = container.querySelectorAll(selector);
  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
};

export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
};

export const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};