import { useRef, useState } from "react";
import PropTypes from "prop-types";

import SelectContainer from "./SelectContainer";
import Indicators from "./Indicators";
import Select from "./Select";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import List from "./List";
import Option from "./Option";

import { Cross, Chevron } from "../Icons";

function SelectBox({
  disabled,
  options,
  onSelect,
  placeholder = "Select...",
  inputProps,
}) {
  const [inputValue, setInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [isListVisible, setVisibility] = useState(false);
  const inputRef = useRef();

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleBlur = (e) => {
    e.preventDefault();
    setVisibility(false);
    setInput("");
  };

  const clearSelect = (e) => {
    e.preventDefault();
    setSelectValue("");
    setInput("");
  };

  const showMenu = (e) => {
    e.preventDefault();
    setVisibility(true);
  };

  const handleSelect = ({ label, value }) => {
    setSelectValue({ label, value });
    setVisibility(false);
    setInput("");
    if (onSelect) {
      onSelect(value);
    }
  };

  const filteredOpts = options.filter(({ value }) =>
    new RegExp(inputValue, "ig").test(value)
  );

  return (
    <SelectContainer>
      <Select>
        {selectValue && !inputValue && <Label>{selectValue.label}</Label>}
        <Input
          {...inputProps}
          ref={inputRef}
          type="text"
          aria-label="input-select"
          placeholder={!selectValue.label ? placeholder : ""}
          value={inputValue}
          onChange={handleChange}
          onFocus={showMenu}
          onBlur={handleBlur}
          disabled={disabled}
        />
        <Indicators>
          <Button onClick={clearSelect} disabled={disabled}>
            <Cross color="#414d5d" />
          </Button>
          <Button onClick={() => inputRef.current.focus()} disabled={disabled}>
            <Chevron color="#414d5d" />
          </Button>
        </Indicators>
      </Select>
      {isListVisible && (
        <List role="listbox">
          {filteredOpts.map(({ label, value }, idx) => (
            <Option
              onMouseDown={() => handleSelect({ label, value })}
              key={`${idx}-${value}`}
              isFocused={selectValue.value === value}>
              {label}
            </Option>
          ))}
        </List>
      )}
    </SelectContainer>
  );
}

SelectBox.displayName = "SelectBox";

SelectBox.propTypes = {
  disabled: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  inputProps: PropTypes.object,
};

export default SelectBox;
