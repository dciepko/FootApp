import { useState } from "react";
import classes from "./DropdownOption.module.css";

export default function DropdownOption({
  options,
  chosenOption,
  setChosenOption,
  labelFormatter,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={classes.optionContainer}>
      <button className={classes.optionButton}>
        <span
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          {labelFormatter ? labelFormatter(chosenOption) : chosenOption}
        </span>
      </button>
      {showDropdown && (
        <ul className={classes.optionMenu}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setChosenOption(option);
                setShowDropdown(false);
              }}
            >
              {labelFormatter ? labelFormatter(option) : option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
