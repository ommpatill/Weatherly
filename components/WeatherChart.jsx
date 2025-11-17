"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function WeatherChart({ forecast, unit }) {
  if (!forecast?.list?.length) return null;

  const data = forecast.list.slice(0, 8).map((item) => ({
    time: item.dt_txt.slice(11, 16),
    temp: item.main.temp,
  }));

  const minTemp = Math.min(...data.map((d) => d.temp));
  const maxTemp = Math.max(...data.map((d) => d.temp));
  const symbol = unit === "imperial" ? "°F" : "°C";

  return (
    <section className="panel chart-panel" aria-label="Temperature trend">
      <div className="current-header">
        <div className="current-title">Next 24 Hours</div>
        <div className="current-sub">Temperature trend ({symbol})</div>
      </div>

      <div style={{ width: "100%", height: 230 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="time" />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#38bdf8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="sr-only">
        Over the next 24 hours, the temperature ranges from {Math.round(minTemp)}
        {symbol} to {Math.round(maxTemp)}
        {symbol}.
      </p>
    </section>
  );
}
