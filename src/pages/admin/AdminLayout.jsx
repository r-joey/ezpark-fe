import { Outlet, NavLink } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore"
export default function AdminLayout() {
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer Toggle Input */}
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar sticky top-0 z-30 bg-base-100 shadow-sm">
          <div className="navbar-start">
            {/* Hamburger for mobile */}
            <label
              htmlFor="admin-drawer"
              className="btn btn-ghost btn-circle drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
          <div className="navbar-center">
            <a className="btn btn-ghost text-xl md:hidden">Admin Panel</a>
          </div>
          <div className="navbar-end space-x-2">
              
               
            <button onClick={logout} className="btn btn-ghost">Logout</button>
          </div>
        </div>

        {/* Main Outlet */}
        <div className="p-4"> 
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content"> 
          <h1 className="menu-title text-2xl font-bold tracking-tight mb-4 ">Admin Panel</h1>
          <li>
            <NavLink to="/admin/locations"   className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "menu-active" : ""
            }>
              Locations
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/slots" className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "menu-active" : ""
            }>
            Slots
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/reservations" className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "menu-active" : ""
            }>
            Reservations
            </NavLink> 
          </li>
          <li>
            <NavLink to="/admin/users" className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "menu-active" : ""
            }>
            Users
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
