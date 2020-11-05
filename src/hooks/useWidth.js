import { useState, useEffect, useRef } from "react";

/**
 *
 * @param {object} ref is a react reference for a DOM element.
 * @param {string} destination is used to run this effect everytime we set a new destination and then a new set of books and we need it to set the current slider's width
 */

function useWidth(ref, destination) {
  const [sliderWidth, setWidth] = useState(0);
  const activeSlidesWidth = useRef(0);

  const items = Array.from(ref?.children || []);

  useEffect(() => {
    setWidth(0);
    if (items.length) {
      const totalWith = items.reduce(
        (acc, curr) => acc + curr.offsetWidth + 30, // sum the item's width plus 30px from the element's horizontal padding
        0
      );
      setWidth(totalWith);
      activeSlidesWidth.current = (ref.children[0].clientWidth + 30) * 2; // times 2 because we just display 2 slide items at a time
    }
  }, [destination, items, ref]);

  return { sliderWidth, activeSlidesWidth: activeSlidesWidth.current };
}

export default useWidth;
