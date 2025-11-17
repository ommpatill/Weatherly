"use client";

export default function SearchBar({ onSearch, value, onChange }) {
  function handleSubmit(e) {
    e.preventDefault();
    const city = value.trim();
    if (!city) return;
    onSearch(city);
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search city (e.g. Pune, Mumbai, London)…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit">Get Weather</button>
    </form>
  );
}
