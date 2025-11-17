export default function WeatherUtilities({ current, lastUpdated }) {
  if (!current) {
    return (
      <section className="panel">
        <div className="current-title">Utilities</div>
        <p style={{ fontSize: 12, marginTop: 8, opacity: 0.8 }}>
          Search a city to see extra information like sunrise, sunset and
          coordinates.
        </p>
      </section>
    );
  }

  const { coord, sys, timezone } = current;

  const sunrise = sys?.sunrise ? new Date(sys.sunrise * 1000) : null;
  const sunset = sys?.sunset ? new Date(sys.sunset * 1000) : null;
  const updated = lastUpdated || new Date();

  // timezone is offset in seconds from UTC
  const tzHours = timezone != null ? timezone / 3600 : null;

  function fmt(d) {
    return d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <section className="panel" aria-label="Weather utilities">
      <div className="current-title">Utilities</div>
      <div className="utilities-list">
        <div className="utilities-row">
          <span className="utilities-label">Last updated</span>
          <span className="utilities-value">
            {updated.toLocaleTimeString()}
          </span>
        </div>

        {sunrise && (
          <div className="utilities-row">
            <span className="utilities-label">Sunrise</span>
            <span className="utilities-value">{fmt(sunrise)}</span>
          </div>
        )}

        {sunset && (
          <div className="utilities-row">
            <span className="utilities-label">Sunset</span>
            <span className="utilities-value">{fmt(sunset)}</span>
          </div>
        )}

        {coord && (
          <div className="utilities-row">
            <span className="utilities-label">Coordinates</span>
            <span className="utilities-value">
              {coord.lat.toFixed(2)}, {coord.lon.toFixed(2)}
            </span>
          </div>
        )}

        {tzHours !== null && (
          <div className="utilities-row">
            <span className="utilities-label">Timezone offset</span>
            <span className="utilities-value">
              UTC {tzHours >= 0 ? "+" : ""}
              {tzHours}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
