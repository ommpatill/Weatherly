import "./globals.css";

export const metadata = {
  title: "Weatherly · Live Weather Dashboard",
  description:
    "Weatherly is a modern weather dashboard with current conditions, forecast and charts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div className="app-root">
          <header className="app-navbar" role="banner">
            <div className="app-navbar-inner">
              <div className="app-brand">
                <div className="app-brand-logo" aria-hidden="true">
                  W
                </div>
                <div>
                  <div className="app-brand-title">Weatherly</div>
                  <div className="app-brand-sub">
                    Live weather & 5-day forecast dashboard
                  </div>
                </div>
              </div>

              <div
                style={{ fontSize: "11px", opacity: 0.8 }}
                aria-label="Tech stack"
              >
                Next.js · React · OpenWeatherMap
              </div>
            </div>
          </header>

          <main
            id="main-content"
            className="app-main-shell"
            role="main"
            aria-label="Weather dashboard"
          >
            <div className="app-main-inner">{children}</div>
          </main>

          <footer className="dev-footer">
            <span className="dev-badge">
              <span className="dot-logo">Weatherly.</span>
              <span>
                Built by <strong>Om Patil</strong>
              </span>
            </span>

            <span className="dev-links">
              
              <a
                href="https://github.com/ommpatill"
                target="_blank"
                rel="noopener"
              >
                GitHub
              </a>
              <span className="dot">•</span>
              <a
                href="https://www.linkedin.com/in/ompatill"
                target="_blank"
                rel="noopener"
              >
                LinkedIn
              </a>
              <span className="dot">•</span>
              <a
                href="https://ompatilportfolio.vercel.app/"
                target="_blank"
                rel="noopener"
              >
                Portfolio
              </a>
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
