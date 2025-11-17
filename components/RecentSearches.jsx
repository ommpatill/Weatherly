"use client";

export default function RecentSearches({ items, onSelect }) {
  if (!items?.length) return null;

  return (
    <section className="panel">
      <div className="current-title">Recent Cities</div>
      <div className="recent-list">
        {items.map((city) => (
          <button
            key={city}
            type="button"
            className="chip"
            onClick={() => onSelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}
