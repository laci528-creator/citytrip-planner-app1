import React from "react";

export default function CitySuggestions({ suggestions, onSelect }) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <ul className="suggestion-list"
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => onSelect(suggestion)}
          className="suggestion-list-element"
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
        >
          <strong>{suggestion.name}</strong>
          <span className="suggestion-list-element2">
            {suggestion.admin1 ? `${suggestion.admin1}, ` : ""} {suggestion.country}
          </span>
        </li>
      ))}
    </ul>
  );
}