import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
            <p className="text-gray-500 mt-4">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Go Back Home
            </Link>
        </div>
    );
}
