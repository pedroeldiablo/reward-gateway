import React, { useState, useEffect, useRef } from 'react';
import {
  DropdownHeader,
  DropdownList,
  DropdownListItems,
  DropdownSelectedListItems,
} from './dropdown.styles';

type dropDownOption = {
  label: string;
  value: string;
};

export const DropdownComponent = ({
  label,
  options,
  selected,
  onSelectedChange,
  value,
}: {
  label: string;
  options: dropDownOption[];
  selected: dropDownOption;
  onSelectedChange: React.Dispatch<React.SetStateAction<dropDownOption>>;
  value: string;
}) => {
  // state to manage toggle visibility
  const [open, setOpen] = useState(false);
  // set ref variable
  const ref:
    | React.ClassAttributes<HTMLDivElement>
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined = useRef(null);

  // close dropdown if clicked anywhere outside of dropdown
  // on initial render, add click event listener
  useEffect(() => {
    const onBodyClick = (event: any) => {
      // check if element that was clicked is inside of ref'd component
      // if so no action is required from this event listener so exit
      if (ref.current && ref.current?.contains(event.target)) {
        return;
      }
      // else close the dropdown
      setOpen(false);
    };

    // add event listener
    document.body.addEventListener('click', onBodyClick);

    // CLEANUP
    // remove event listener
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  // map options from props
  const renderedOptions = options.map((option) => {
    // if current selection is equal to option do not generate div
    if (option.value === selected.value) {
      return null;
    }

    return (
      <DropdownListItems
        key={option.value}
        value={option.value}
        // on click change selection to current option
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </DropdownListItems>
    );
  });

  return (
    <div ref={ref}>
      <div>
        <DropdownHeader
          value={value}
          onClick={() => setOpen(!open)}
          open={open}
        >
          {label}
        </DropdownHeader>
        <DropdownList
          open={open}
          value={value}
          // On click set value of open to opposite of current value
          onClick={() => setOpen(!open)}
        >
          <DropdownSelectedListItems
            key={selected.value}
            value={selected.value}
            className="text"
            onClick={() => setOpen(!open)}
          >
            Current: {selected.label}
          </DropdownSelectedListItems>
          <DropdownList open={open} value={value}>
            {renderedOptions}
          </DropdownList>
        </DropdownList>
      </div>
    </div>
  );
};
