import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return (
        <div className="border-b py-2 mb-4 flex justify-between items-center px-10 text-3xl font-semibold">
            <Link to="/blogs">
                <div className="cursor-pointer">
                    Blog
                </div>
            </Link>
            <div className="flex items-center gap-4">
                <Link to={"/publish"}>
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5 cursor-pointer"
                    >
                        New
                    </button>
                </Link>
                <Avatar name="Eugene" />
            </div>
        </div>
    );
};