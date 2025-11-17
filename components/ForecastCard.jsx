/* eslint-disable @next/next/no-img-element */
export default function ForecastCard({ item, unit }) {
  const date = item.dt_txt.slice(0, 10);
  const label = item.weather?.[0]?.main;
  const desc = item.weather?.[0]?.description;
  const icon = item.weather?.[0]?.icon;
  const symbol = unit === "imperial" ? "°F" : "°C";

  return (
    <article className="forecast-card">
      <div className="forecast-date">{date}</div>
      {icon && (
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt={desc || label}
        />
      )}
      <div className="forecast-temp">
        {Math.round(item.main.temp)}
        {symbol}
      </div>
      <div className="forecast-label">{desc || label}</div>
    </article>
  );
}
