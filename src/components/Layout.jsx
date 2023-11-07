import React from 'react'
import {Link, Outlet} from 'react-router-dom'


export default function Layout() {
  return (
    <>
        <header className="bg-black p-4 text-white w-full gap-3 flex items-center">
            <Link to="/">Counter</Link>
            <Link to="/todo-list">Todo List</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/github-app">Github App</Link>
        </header>

        <div>
            {/* page content */}
            <Outlet />
        </div>
    </>
  )
}
