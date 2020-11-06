import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Slider from "../Slider";

jest.mock("../../../hooks/useWidth.js", () => ({
  __esModule: true,
  default: () => ({
    sliderWidth: 300,
    activeSlidesWidth: 80,
  }),
}));

const slideTween = jest.fn();

test("<Slider/>", () => {
  const { rerender, container } = render(
    <Slider depedency={0} slideTween={slideTween} />
  );

  expect(screen.queryByLabelText(/arrows/gi)).not.toBeInTheDocument();

  rerender(
    <Slider depedency="Porto" slideTween={slideTween}>
      <ul id="ul">
        <li>slide1</li>
        <li>slide2</li>
      </ul>
    </Slider>
  );

  expect(screen.queryByLabelText(/arrows/gi)).toBeInTheDocument();
  expect(screen.queryByLabelText(/left/gi)).toBeInTheDocument();
  expect(screen.queryByLabelText(/right/gi)).toBeInTheDocument();
  expect(screen.queryByLabelText(/container/gi)).toBeInTheDocument();
  expect(container.querySelector("#ul").hasAttribute("width")).toBe(true);
  expect(container.querySelector("#ul").getAttribute("width")).toEqual("300");

  userEvent.click(screen.queryByLabelText(/left/gi));

  expect(slideTween).toHaveBeenCalled();
  expect(slideTween).toHaveBeenCalledTimes(1);

  slideTween.mockClear();

  userEvent.click(screen.queryByLabelText(/right/gi));

  expect(slideTween).toHaveBeenCalled();
  expect(slideTween).toHaveBeenCalledTimes(1);
});
