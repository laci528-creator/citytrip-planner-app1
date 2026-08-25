export default function CitySuggestions({ suggestions, onSelect }) {
  if (!Array.isArray(suggestions) || suggestions.length === 0) {
    return null;
  }

  return (
    <ul className="suggestion-list">
      {suggestions.map((suggestion) => (
        <li
          key={`${suggestion.latitude}-${suggestion.longitude}`}
          className="suggestion-list-element"
        >
          <button
            type="button"
            className="suggestion-button"
            onClick={() => onSelect(suggestion)}
          >
            <strong>{suggestion.name}</strong>

            <span className="suggestion-list-element2">
              {suggestion.admin1 ? `${suggestion.admin1}, ` : ""}
              {suggestion.country}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}