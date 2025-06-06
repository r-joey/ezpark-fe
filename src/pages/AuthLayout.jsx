import { Outlet } from "react-router-dom"
export default function AuthLayout() {
    return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
        <nav className="flex items-center justify-between p-4 shadow-md">
            <a href="/" className="text-2xl font-bold ">EZ-Park</a>
            <a href="/login" className="btn  btn-primary">
                Login
            </a> 
        </nav>

        <main className="flex flex-col flex-grow items-center justify-center">
            <Outlet />
        </main>

        <footer className="bg-gray-800 text-white text-center p-6 mt-10">
            <p>&copy; {new Date().getFullYear()} EZ-Park. All rights reserved.</p>
        </footer>
    </div>
    )
}