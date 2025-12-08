'use client';
// shamelessly taken from https://pqina.nl/blog/applying-styles-based-on-the-user-scroll-position-with-smart-css/
// could be react, but seems overkill - used in tandem with global.css .navBlur

const debounce = (fn: (...params: any) => any) => {
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame: number;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params: any) => {
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      // Call our function and pass any params we received
      fn(...params);
    });
  };
};

if (typeof document !== 'undefined') {
  // Reads out the scroll position and stores it in the data attribute
  // so we can use it in our stylesheets
  const storeScroll = () => {
    document.documentElement.style.setProperty(
      '--scroll',
      String(document.documentElement.scrollTop),
    );
  };

  document.addEventListener('scroll', debounce(storeScroll), { passive: true });
}
