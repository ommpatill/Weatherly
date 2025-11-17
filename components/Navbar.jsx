export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="brand">
          <div className="brand-logo">W</div>
          <div>
            <div className="brand-title">Weatherly</div>
            <div className="brand-sub">Built by Om Laxman Patil · Next.js</div>
          </div>
        </div>

        <div className="nav-links">
          <span>Dashboard</span>
          <span style={{ opacity: 0.5 }}>Favorites</span>
          <span style={{ opacity: 0.5 }}>About</span>
          <div className="nav-badge">UM Internship · Hard</div>
        </div>
      </div>
    </nav>
  );
}
