import { useState, useEffect } from "react";

/**
 *
 * @param {object} ref is a react reference for a DOM element
 * @param {string} destination
 */

function useWidth(ref, destination) {
  const [sliderWidth, setWidth] = useState(0);

  const items = Array.from(ref?.getElementsByTagName("li") || []);

  useEffect(() => {
    if (items.length) {
      const totalWith = items.reduce(
        (acc, curr) => acc + curr.offsetWidth + 30, // sum the total width plus 30 from the element's horizontal padding
        0
      );
      setWidth(totalWith);
    }
  }, [destination, items]);

  return sliderWidth;
}

export default useWidth;
