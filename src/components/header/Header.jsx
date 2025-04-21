import React from "react";
import { Container, LogoutBtn, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="py-4 shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="E-Gallery Logo"
              className="h-12 w-auto transition-transform duration-300 hover:scale-110 drop-shadow-lg"
            />
            <span className="text-xl font-bold tracking-wide">E-Gallery</span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-6 py-2 rounded-lg bg-white text-indigo-600 font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-indigo-100 hover:shadow-lg"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            
            {/* Logout Button with hover effect */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
