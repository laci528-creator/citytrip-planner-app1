import { useState } from "react";
import { formatDistance, formatCategory } from "../utils/formatters";

const ATTRACTIONS_PER_PAGE = 6;


function AttractionSection({ attraction }) {
  const [visibleAttractions, setVisibleAttractions] = useState(ATTRACTIONS_PER_PAGE);

if (attraction?.error) {
    return (
      <section className="result-card">
        <h2>Nearby attractions</h2>
        <div className="error-box">
          {attraction.message}
        </div>
      </section>
    );
  }

  const places = attraction?.data;

if (!Array.isArray(places) || places.length === 0) {
    return (
    <section className="result-card">
      <h2>Nearby attractions</h2>
      <p>No nearby attractions were found.</p>
    </section>
  );
}

return (
    <section className="result-card">
      <h2>Nearby attractions</h2>

      <div className="attraction-grid">
        {places.slice(0, visibleAttractions).map((attr) => (
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

      {visibleAttractions < places.length && (
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