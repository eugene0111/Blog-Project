import { useState, useRef, useEffect } from "react";
import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="border-b py-2 mb-4 flex justify-between items-center px-10 text-3xl font-semibold relative">
            <Link to="/blogs">
                <div className="cursor-pointer">Blog</div>
            </Link>
            <div className="flex items-center gap-4 relative">
                <Link to={"/publish"}>
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5 cursor-pointer flex justify-center flex-col"
                    >
                        New
                    </button>
                </Link>

                <div className="relative" ref={dropdownRef}>
                    <div onClick={() => setDropdownOpen(prev => !prev)} className="flex justify-center flex-col cursor-pointer">
                        <Avatar name="Eugene" />
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-10 text-base font-normal text-gray-700">
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};