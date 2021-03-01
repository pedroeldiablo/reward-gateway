import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserPreferencesContext } from '../../context/userPreferencesContext';
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
  uuid,
  color,
}: {
  label: string;
  options: dropDownOption[];
  uuid: string;
  color: string;
}) => {
  //Get state and dispatch from context
  const { state, dispatch } = useContext(UserPreferencesContext);

  //If there are preferences matching this uuid store as variable for easier access

  const defaultColor = 'pale';

  const profilePreference = state?.filter((obj) => {
    // console.log(obj.id);
    // console.log(obj.id === uuid);
    return obj.id === uuid;
  });

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

  // issue dispatch dependent on whether already in state
  const onSelectedChange = (value: string, label: string): void => {
    if (state!.filter((profile) => profile.id === uuid).length > 0) {
      if (dispatch) {
        dispatch({
          type: 'UPDATE_COLOR_PREFERENCE',
          value: {
            color: value,
            id: uuid,
            colorLabel: label,
          },
        });
      }
    } else {
      if (dispatch) {
        dispatch({
          type: 'CREATE_COLOR_PREFERENCE',
          value: {
            color: value,
            id: uuid,
            colorLabel: label,
          },
        });
      }
    }
  };

  const value = 'error';

  // map props to dropdown options
  // exclude the current option as handled separately
  const renderedOptions = options.map((option) => {
    if (profilePreference && profilePreference.length > 0) {
      const selected = profilePreference[0]?.color;
      if (option.value === selected) {
        return null;
      }
    } else {
      if (option.value === defaultColor) {
        return null;
      }
    }

    return (
      <DropdownListItems
        key={option.value}
        value={option.value}
        // on click change selection to current option
        onClick={() => onSelectedChange(option.value, option.label)}
      >
        {option.label}
      </DropdownListItems>
    );
  });

  return (
    <div ref={ref}>
      <div>
        <DropdownHeader
          color={color}
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
          {!profilePreference?.length ? (
            <>
              <DropdownSelectedListItems
                key={options[0].value}
                value={options[0].value}
                className="text"
                onClick={() => setOpen(!open)}
              >
                Current: {options[0].label}
              </DropdownSelectedListItems>
              <DropdownList open={open} value={value}>
                {renderedOptions}
              </DropdownList>
            </>
          ) : (
            profilePreference.map((profile) => {
              if (profile.color) {
                return (
                  <>
                    <DropdownSelectedListItems
                      key={profile.color}
                      value={profile.color}
                      className="text"
                      onClick={() => setOpen(!open)}
                    >
                      Current: {profile?.colorLabel}
                    </DropdownSelectedListItems>
                    <DropdownList open={open} value={value}>
                      {renderedOptions}
                    </DropdownList>
                  </>
                );
              }
              return (
                <>
                  <DropdownSelectedListItems
                    key={options[0].value}
                    value={options[0].value}
                    className="text"
                    onClick={() => setOpen(!open)}
                  >
                    Current: {options[0].label}
                  </DropdownSelectedListItems>
                  <DropdownList open={open} value={value}>
                    {renderedOptions}
                  </DropdownList>
                </>
              );
            })
          )}
        </DropdownList>
      </div>
    </div>
  );
};
