import { NextResponse } from "next/server";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const units = searchParams.get("units") || "metric"; // metric | imperial

  if (!city && (!lat || !lon)) {
    return NextResponse.json(
      { message: "City or coordinates are required." },
      { status: 400 }
    );
  }

  // ✅ Try both env names so we don't break your previous setup
  const apiKey =
    process.env.OPENWEATHER_API_KEY ||
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "Server configuration error: API key missing." },
      { status: 500 }
    );
  }

  try {
    let currentUrl;
    let forecastUrl;

    if (lat && lon) {
      // by coordinates
      currentUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
      forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    } else {
      // by city name
      const q = encodeURIComponent(city.trim());
      currentUrl = `${BASE_URL}/weather?q=${q}&appid=${apiKey}&units=${units}`;
      forecastUrl = `${BASE_URL}/forecast?q=${q}&appid=${apiKey}&units=${units}`;
    }

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    if (!currentRes.ok) {
      if (currentRes.status === 404) {
        return NextResponse.json(
          { message: "City not found. Please check spelling." },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Failed to fetch weather data." },
        { status: 500 }
      );
    }

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    return NextResponse.json({ current, forecast }, { status: 200 });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { message: "Unexpected server error." },
      { status: 500 }
    );
  }
}
