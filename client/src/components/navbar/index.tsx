import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { NavLink } from "react-router-dom";

function Main() {

    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    }

    const navItems = [
        { id: 1, text: "Home", path: "/" },
        { id: 2, text: "Product", path: "/product" },
        { id: 3, text: "User", path: "/users" },
        { id: 4, text: "City", path: "/city" },
    ];

    return (
        <div className="bg-black flex justify-between items-center h-24 px-4 text-white">
            <h1 className="w-full text-3xl text-left font-bold text-[#00df9a]">Kelas Fullstack</h1>

            <ul className="hidden md:flex">
                {navItems.map(item => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) =>
                            `p-4 rounded-xl m-2 cursor-pointer duration-300 ${isActive ? "bg-[#00df9a] text-black" : "hover:bg-[#00df9a] hover:text-black"
                            }`
                        }
                    >
                        {item.text}
                    </NavLink>
                ))}
            </ul>

            <div onClick={handleNav} className="block md:hidden">
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            <ul className={
                nav
                    ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
                    : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-full'
            }
            >
                <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">Kelas Fullstack</h1>

                {navItems.map(item => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        onClick={handleNav}
                        className={({ isActive }) =>
                            `p-4 rounded-xl m-2 cursor-pointer duration-300 ${isActive ? "bg-[#00df9a] text-black" : "hover:bg-[#00df9a] hover:text-black"
                            }`
                        }
                    >
                        {item.text}
                    </NavLink>
                ))}
            </ul>
        </div>
    )
}

export default Main