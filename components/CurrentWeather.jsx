/* eslint-disable @next/next/no-img-element */
export default function CurrentWeather({ data, unit }) {
  const symbol = unit === "imperial" ? "°F" : "°C";

  if (!data) {
    return (
      <section className="panel" aria-label="No city selected">
        <div className="current-title">No city selected</div>
        <p className="current-sub" style={{ marginTop: 6 }}>
          Search for a city above to see current weather, 5-day forecast and
          temperature trends.
        </p>
      </section>
    );
  }

  const { main, weather, sys, name, wind } = data;
  const w = weather?.[0];

  return (
    <section
      className="panel"
      aria-label={`Current weather in ${name}, ${sys?.country}`}
    >
      <div className="current-header">
        <div>
          <div className="current-title">
            {name}, {sys?.country}
          </div>
          <div className="current-sub">
            Live conditions · Powered by OpenWeatherMap API
          </div>
        </div>
      </div>

      <div className="current-body">
        <div className="temp-main">
          <div className="temp">{Math.round(main.temp)}{symbol}</div>
          <div className="desc">{w?.description}</div>
          <div className="current-meta">
            <span>Feels {Math.round(main.feels_like)}{symbol}</span>
            <span>Humidity {main.humidity}%</span>
            <span>Wind {wind?.speed} m/s</span>
          </div>
        </div>

        {w?.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
            alt={w.description || "Weather icon"}
            className="current-icon"
          />
        )}
      </div>
    </section>
  );
}
