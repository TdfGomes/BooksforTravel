import { renderHook } from "@testing-library/react-hooks";
import useWidth from "../useWidth";

const ref = {
  children: [{ clientWidth: 10 }, { clientWidth: 10 }, { clientWidth: 10 }],
};
test("useWidth", async () => {
  const { result } = renderHook(() => useWidth(ref, "Porto"));
  expect(result.current).toMatchObject({
    sliderWidth: 120,
    activeSlidesWidth: 80,
  });
});
