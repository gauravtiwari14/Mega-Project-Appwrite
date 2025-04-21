import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { FiLogOut } from "react-icons/fi"; // Logout icon

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const logoutHandler = async () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (!confirmLogout) return;

        setLoading(true);
        await authService.logout();
        dispatch(logout());
        setLoading(false);
    };

    return (
        <button
            onClick={logoutHandler}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white font-semibold 
                shadow-md transition-all duration-300 transform 
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 hover:shadow-lg"}`}
            disabled={loading}
        >
            {loading ? "Logging out..." : (
                <>
                    <FiLogOut size={18} /> Logout
                </>
            )}
        </button>
    );
};

export default LogoutBtn;
