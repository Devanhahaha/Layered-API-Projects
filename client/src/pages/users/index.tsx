import { useState, useEffect } from "react";
import axios from "axios";
import CardListUser from "../../components/users";
import Lucide from "../../components/Lucide";
import Search from "../../components/Search";
import { NavLink } from "react-router-dom";

const base_url = "http://localhost:3002/users";

interface User {
    id: number;
    name: string;
    email: string;
    contact: string;
    address: string;
    image: string;
}

function Main() {

    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get(base_url)
            .then((res) => setUsers(res.data.data))
            .catch((err) => console.log(err));
    }, []);

    // filter user search
    const filteredUsers = users.filter((item) => (
        item.name.toLowerCase().includes(search.toLowerCase())
    ));

    // function hapus user
    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Apakah Anda Yakin Untuk Menghapus User Ini?");

        if (!confirmDelete) return

        try {
            await axios.delete(`${base_url}/${id}`);

            setUsers((prev) => prev.filter((item) => item.id !== id));

            alert("User Berhasil di Hapus!");
        } catch (error) {
            console.error("Data User Gagal di Hapus:", error)
            alert("Gagal Menghapus Data User!");
        }
    }

    return (
        <div className="min-h-screen mt-5">
            <div className="flex items-center justify-between">
                <NavLink to="/users/tambahUsers">
                    <button className="bg-blue-500 ml-3 text-white rounded px-3 py-2 cursor-pointer hover:bg-blue-400 flex gap-3"><Lucide icon="Plus" />Add User</button>
                </NavLink>
                <Search search={search} setSearch={setSearch} />
            </div>
            {filteredUsers.map(item => (
                <CardListUser key={item.id} className="bg-white mb-3 mt-5 mx-3 shadow-md rounded-xl p-5 cursor-pointer hover:shadow-xl transition">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border mt-5 border-gray-100 rounded-xl shadow-xl">
                        <img src={`http://localhost:3002/users/${item.image}`} alt={item.name} className="md:w-52 w-full items-center justify-center md:h-58 object-cover rounded-t-lg" />
                        <div className="p-4 mt-10 text-center items-center justify-center">
                            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                            <p className="text-gray-700 mb-4">{item.email}</p>
                            <p className="text-gray-700 mb-4">{item.contact}</p>
                            <p className="text-gray-700 mb-4">{item.address}</p>
                        </div>
                        <div className="flex items-center justify-center mb-3 gap-3">
                            <NavLink to={`/users/editUsers/${item.id}`}>
                                <button className="bg-amber-500 text-white rounded px-3 py-2 cursor-pointer hover:bg-amber-400 flex gap-3"><Lucide icon="Pencil" />Edit</button>
                            </NavLink>
                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white rounded px-3 py-2 cursor-pointer hover:bg-red-400 flex gap-3"><Lucide icon="Trash" />Delete</button>
                        </div>
                    </div>
                </CardListUser>
            ))}
        </div>
    )
}

export default Main