import { RefObject, useEffect } from "react";

type AnyEvent = MouseEvent | TouchEvent;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void,
): void {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };

    // Reload only if ref or handler changes
  }, [ref, handler]);
}

export default useOnClickOutside;

//------usage-------
// const ref = useRef(null)

// const handleClickOutside = () => {
//   // Your custom logic here
//   console.log('clicked outside')
// }

// const handleClickInside = () => {
//   // Your custom logic here
//   console.log('clicked inside')
// }

// useOnClickOutside(ref, handleClickOutside)

// return (
//   <button
//     ref={ref}
//     onClick={handleClickInside}
//     style={{ width: 200, height: 200, background: 'cyan' }}
//   />
