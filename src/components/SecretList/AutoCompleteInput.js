import React, { useState, useRef, useEffect } from "react";
// Import your CSS file if needed
import "../SecretList/Secret.css";

const AddressAutocomplete = ({
  placeholder,
  type,
  onSelect,
  customclassName,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1);

  const currentPromiseReject = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup: Cancel any pending promises when the component unmounts
      if (currentPromiseReject.current) {
        currentPromiseReject.current({
          canceled: true,
        });
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const currentValue = e.target.value;
    setInputValue(currentValue);

    // Close any open dropdown list
    closeDropdownList();

    // Cancel previous request promise
    if (currentPromiseReject.current) {
      currentPromiseReject.current({
        canceled: true,
      });
    }

    if (!currentValue) {
      return;
    }

    // Create a new promise and send geocoding request
    const promise = new Promise((resolve, reject) => {
      currentPromiseReject.current = reject;

      const apiKey = "367e5142cc4a427caf021edeb720ed96";
      let url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        currentValue
      )}&limit=5&apiKey=${apiKey}`;

      if (type) {
        url += `&type=${type}`;
      }

      fetch(url).then((response) => {
        if (response.ok) {
          response.json().then((data) => resolve(data));
        } else {
          response.json().then((data) => reject(data));
        }
      });
    });

    promise.then(
      (data) => {
        setSuggestions(data.features);
      },
      (err) => {
        if (!err.canceled) {
          console.log(err);
        }
      }
    );
  };

  const handleItemClick = (index) => {
    setInputValue(suggestions[index].properties.formatted);
    onSelect(suggestions[index]);

    // Close the list of autocompleted values
    closeDropdownList();
  };

  const handleKeyDown = (e) => {
    const autocompleteItems = document.querySelectorAll(
      ".autocomplete-items div"
    );

    if (autocompleteItems.length > 0) {
      if (e.keyCode === 40) {
        // Arrow DOWN key
        e.preventDefault();
        setFocusedItemIndex((index) =>
          index < autocompleteItems.length - 1 ? index + 1 : 0
        );
      } else if (e.keyCode === 38) {
        // Arrow UP key
        e.preventDefault();

        // If the arrow UP key is pressed, decrease the focusedItemIndex variable:
        setFocusedItemIndex((index) =>
          index > 0 ? index - 1 : autocompleteItems.length - 1
        );
      } else if (e.keyCode === 13) {
        // Enter key
        e.preventDefault();
        if (focusedItemIndex > -1) {
          handleItemClick(focusedItemIndex);
        }
      }
    }
  };

  const closeDropdownList = () => {
    setSuggestions([]);
    setFocusedItemIndex(-1);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        className={customclassName}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {inputValue && (
        <div className="autocomplete-items">
          {suggestions.map((feature, index) => (
            <div
              key={index}
              className={
                index === focusedItemIndex ? "autocomplete-active" : ""
              }
              onClick={() => handleItemClick(index)}
            >
              {feature.properties.formatted}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default AddressAutocomplete;
