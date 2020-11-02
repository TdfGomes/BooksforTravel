import { useState } from "react";
import PropTypes from "prop-types";

import SelectContainer from "./SelectContainer";
import Select from "./Select";
import Input from "./Input";
import Button from "./Button";
import List from "./List";
import Option from "./Option";

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

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleFocus = (e) => {
    e.preventDefault();
    setVisibility(true);
  };

  const handleBlur = (e) => {
    e.preventDefault();
    setVisibility(false);
  };

  const clearSelect = (e) => {
    e.preventDefault();
    setSelectValue("");
    setInput("");
  };

  const handleSelect = ({ label, value }) => {
    setSelectValue({ label, value });
    setVisibility(false);
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
        {selectValue && <div>{selectValue.label}</div>}
        <Input
          {...inputProps}
          type="text"
          aria-label="input-select"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
        />
        <Button onClick={clearSelect} disabled={disabled}>
          X
        </Button>
      </Select>
      {isListVisible && (
        <List role="listbox">
          {filteredOpts.map(({ label, value }, idx) => (
            <Option
              onMouseDown={() => handleSelect({ label, value })}
              key={`${idx}-${value}`}
              isfocused={(selectValue.value === value).toString()}>
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
