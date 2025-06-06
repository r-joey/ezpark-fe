import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Navbar */}
      <div className="navbar sticky top-0 z-30 bg-base-100 shadow-sm">
        <div className="flex-1 justify-center md:justify-start">
          <a className="btn btn-ghost text-xl mx-auto md:mx-0">EZ-Park</a>
        </div>
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => isActive ? "active" : ""}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reservations"
                className={({ isActive }) => isActive ? "active" : ""}
              >
                Reservations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account"
                className={({ isActive }) => isActive ? "active" : ""}
              >
                Account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Page Content */}
      <main className="flex-grow pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Bottom Dock Menu (mobile only) */}
      <div className="dock fixed bottom-0 w-full bg-neutral text-neutral-content md:hidden z-50">
        <NavLink
          to="/home"
          className={({ isActive }) => `dock-item ${isActive ? "dock-active" : ""}`}
        >
          <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <polyline points="1 11 12 2 23 11" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="12" y1="22" x2="12" y2="18" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="dock-label">Home</span>
        </NavLink>

        <NavLink
          to="/reservations"
          className={({ isActive }) => `dock-item ${isActive ? "dock-active" : ""}`}
        >
          <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <polyline points="3 14 9 14 9 17 15 17 15 14 21 14" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="dock-label">Reservations</span>
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) => `dock-item ${isActive ? "dock-active" : ""}`}
        >
          <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M22 13.25v-2.5l-2.318-.966a10 10 0 0 0-.682-1.654l.954-2.318-1.768-1.768-2.318.954a10 10 0 0 0-1.654-.682l-.966-2.318h-2.5l-.966 2.318a10 10 0 0 0-1.654.682l-2.318-.954-1.768 1.768.954 2.318a10 10 0 0 0-.682 1.654l-2.318.966v2.5l2.318.966a10 10 0 0 0 .682 1.654l-.954 2.318 1.768 1.768 2.318-.954a10 10 0 0 0 1.654.682l.966 2.318h2.5l.966-2.318a10 10 0 0 0 1.654-.682l2.318.954 1.768-1.768-.954-2.318a10 10 0 0 0 .682-1.654l2.318-.966Z" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="dock-label">Account</span>
        </NavLink>
      </div>
    </div>
  );
}
