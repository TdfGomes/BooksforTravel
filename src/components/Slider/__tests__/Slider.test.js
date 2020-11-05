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

const goLeft = jest.fn((el, l) => console.log({ el, l }));

const goRight = jest.fn((el, l) => console.log({ el, l }));

test("<Slider/>", () => {
  const { rerender, container } = render(
    <Slider depedency={0} tweenLeft={goLeft} tweenRight={goRight} />
  );
  expect(screen.queryByLabelText(/arrows/gi)).not.toBeInTheDocument();
  rerender(
    <Slider
      depedency="Porto"
      tweenLeft={() => goLeft("element", 300)}
      tweenRight={() => goRight("element", 300)}>
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

  userEvent.click(screen.queryByLabelText(/left/gi));
  expect(goLeft).toHaveBeenCalled();
  expect(goLeft).toHaveBeenCalledTimes(1);
  expect(goLeft).toHaveBeenLastCalledWith("element", 300);

  userEvent.click(screen.queryByLabelText(/right/gi));
  expect(goRight).toHaveBeenCalled();
  expect(goRight).toHaveBeenCalledTimes(1);
  expect(goRight).toHaveBeenLastCalledWith("element", 300);
});
