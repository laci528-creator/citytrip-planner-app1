import { useState } from "react";
import { formatDistance, formatCategory } from "../utils/formatters";


function AttractionSection({ attraction }) {
  const [visibleAttractions, setVisibleAttractions] = useState(6);

  if (!Array.isArray(attraction) || attraction.length === 0) {
    return null;
  }

return (
    <section className="result-card">
      <h2>Nearby attractions</h2>

      <div className="attraction-grid">
        {attraction.slice(0, visibleAttractions).map((attr) => (
          <article className="attraction-card" key={attr.id}>
            <h3>{attr.name}</h3>
              <p>
                <strong>Distance:</strong> {formatDistance(attr.distance)}
              </p>
                {attr.categories?.length > 0 && (
                  <>
                    <h4>Categories:</h4>
                      <div className="category-list">
                        {attr.categories.map((category) => (
                          <span className="category-badge" key={`${attr.id}-${category}`}>
                            {formatCategory(category)}
                          </span>
                        ))}
                      </div>
                  </>
                )}
          </article>
        ))}
      </div>

      {visibleAttractions < attraction.length && (
        <button
          className="show-more-button"
          type="button"
          onClick={() =>
            setVisibleAttractions((currentValue) => currentValue + 6)
          }
        >
          Show more
        </button>
      )}
    </section>
  );
}

export default AttractionSection;