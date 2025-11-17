"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastGrid from "@/components/ForecastGrid";
import WeatherChart from "@/components/WeatherChart";
import RecentSearches from "@/components/RecentSearches";
import Loader from "@/components/Loader";
import WeatherUtilities from "@/components/WeatherUtilities";

const STORAGE_KEY = "um-weather-recent-cities";

export default function HomePage() {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("metric"); // "metric" | "imperial"

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setRecent(parsed);
      } catch {
        // ignore malformed data
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
  }, [recent]);

  async function fetchWeatherByCity(city, unitOverride) {
    const trimmed = city.trim();
    if (!trimmed) return;

    const u = unitOverride || unit;
    setError("");
    setLoading(true);
    setCurrent(null);
    setForecast(null);
    setQuery(trimmed);

    try {
      const res = await fetch(
        `/api/weather?city=${encodeURIComponent(trimmed)}&units=${u}`
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to fetch weather.");
      }

      const json = await res.json();
      setCurrent(json.current);
      setForecast(json.forecast);
      setLastUpdated(new Date());

      setRecent((prev) => {
        const list = [
          trimmed,
          ...prev.filter((c) => c.toLowerCase() !== trimmed.toLowerCase()),
        ];
        return list.slice(0, 6);
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchWeatherByCoords(lat, lon, unitOverride) {
    const u = unitOverride || unit;
    setError("");
    setLoading(true);
    setCurrent(null);
    setForecast(null);

    try {
      const res = await fetch(
        `/api/weather?lat=${lat}&lon=${lon}&units=${u}`
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to fetch weather.");
      }

      const json = await res.json();
      setCurrent(json.current);
      setForecast(json.forecast);
      setLastUpdated(new Date());

      // show city name in search bar
      if (json.current?.name) {
        setQuery(json.current.name);
        setRecent((prev) => {
          const name = json.current.name;
          const list = [
            name,
            ...prev.filter((c) => c.toLowerCase() !== name.toLowerCase()),
          ];
          return list.slice(0, 6);
        });
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectRecent(city) {
    fetchWeatherByCity(city);
  }

  function handleUnitChange(nextUnit) {
    if (nextUnit === unit) return;
    setUnit(nextUnit);

    // re-fetch current location in new unit
    if (current?.coord) {
      fetchWeatherByCoords(current.coord.lat, current.coord.lon, nextUnit);
    } else if (query.trim()) {
      fetchWeatherByCity(query, nextUnit);
    }
  }

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      return;
    }

    setError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        setError("Unable to access location. Please allow permission.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  const unitSymbol = unit === "imperial" ? "°F" : "°C";

  return (
    <>
      <section className="panel" aria-labelledby="search-heading">
        <h1
          id="search-heading"
          style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}
        >
          Search city weather
        </h1>

        <SearchBar
          onSearch={fetchWeatherByCity}
          value={query}
          onChange={setQuery}
        />

        <p className="search-tagline">
          Try cities like Pune, Mumbai, London, New York, Tokyo.
        </p>

        <div className="search-actions">
          <button
            type="button"
            className="geo-btn"
            onClick={handleUseMyLocation}
          >
            Use my location
          </button>

          <div className="unit-toggle" aria-label="Temperature units">
            <span>Units:</span>
            <div className="unit-pill">
              <button
                type="button"
                className={unit === "metric" ? "active" : ""}
                onClick={() => handleUnitChange("metric")}
              >
                °C
              </button>
              <button
                type="button"
                className={unit === "imperial" ? "active" : ""}
                onClick={() => handleUnitChange("imperial")}
              >
                °F
              </button>
            </div>
            <span className="unit-chip">{unitSymbol}</span>
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {loading && <Loader />}
          {error && <div className="error-banner">{error}</div>}
        </div>
      </section>

      <div className="dashboard-grid">
        <div className="left-col">
          <CurrentWeather data={current} unit={unit} />
          <ForecastGrid forecast={forecast} unit={unit} />
          <WeatherChart forecast={forecast} unit={unit} />
        </div>

        <div className="right-col">
          <RecentSearches items={recent} onSelect={handleSelectRecent} />
          <WeatherUtilities current={current} lastUpdated={lastUpdated} />

          <section className="panel">
            <div className="current-title">About this app</div>
            <div className="current-sub" style={{ marginTop: 6 }}>
              WeatherlyWeb · Live weather, forecast & charts
            </div>
            <p style={{ fontSize: 12, marginTop: 10, opacity: 0.85 }}>
              WeatherlyWeb shows real-time weather using the OpenWeatherMap REST
              API. It includes current conditions, a 5-day forecast, a 24-hour
              temperature chart, and recent city history stored in the browser.
              Built with Next.js, React and Recharts.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
