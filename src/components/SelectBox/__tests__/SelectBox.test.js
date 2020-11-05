import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SelectBox from "../SelectBox";

const destinations = [
  { label: "Amsterdam", value: "amsterdam" },
  { label: "Porto", value: "porto" },
];

const onSelect = jest.fn((value) => value);

test("<SelectBox/>", () => {
  const { rerender } = render(
    <SelectBox
      disabled={false}
      options={destinations}
      placeholder="Select a destination"
      onSelect={(value) => onSelect(value)}
    />
  );
  const input = screen.getByLabelText(/input/gi);
  expect(input).toBeInTheDocument();
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

  input.focus();

  expect(screen.queryByRole("listbox")).toBeInTheDocument();

  userEvent.type(input, "Por");

  expect(input.value).toEqual("Por");
  expect(screen.queryByText(/por/gi)).toBeInTheDocument();

  input.blur();

  expect(input.value).toEqual("");
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

  input.focus();
  userEvent.click(screen.getByText(/porto/gi));

  expect(onSelect).toHaveBeenCalled();
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onSelect).toHaveBeenCalledWith("porto");

  input.focus();
  expect(screen.queryByRole("listbox")).toBeInTheDocument();

  userEvent.click(screen.getByRole("clearlistbox"));

  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

  rerender(
    <SelectBox
      disabled={true}
      options={destinations}
      placeholder="Select a destination"
      onSelect={(value) => onSelect(value)}
    />
  );

  expect(input.hasAttribute("disabled")).toBe(true);
  expect(screen.getByRole("clearlistbox").hasAttribute("disabled")).toBe(true);
  expect(screen.getByRole("showlistbox").hasAttribute("disabled")).toBe(true);
});
