import ForecastCard from "./ForecastCard";

export default function ForecastGrid({ forecast, unit }) {
  if (!forecast?.list?.length) return null;

  const daily = [];
  const seenDates = new Set();

  for (const item of forecast.list) {
    const date = item.dt_txt.slice(0, 10);
    const hour = item.dt_txt.slice(11, 13);

    if (!seenDates.has(date) && (hour === "12" || daily.length === 0)) {
      daily.push(item);
      seenDates.add(date);
    }
    if (daily.length === 5) break;
  }

  return (
    <section
      className="panel"
      aria-label="5-day forecast overview"
    >
      <div className="forecast-header">
        <div>
          <div className="current-title">5-Day Forecast</div>
          <div className="current-sub">
            Daily snapshot (around midday) for the next 5 days.
          </div>
        </div>
      </div>

      <div className="forecast-grid">
        {daily.map((item) => (
          <ForecastCard key={item.dt} item={item} unit={unit} />
        ))}
      </div>
    </section>
  );
}
