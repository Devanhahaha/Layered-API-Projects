import { useState, useEffect } from "react";
import axios from "axios";
import Lucide from "../../Lucide";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const base_url = "http://localhost:3002/cities";

export default function Main() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [province, setProvince] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`${base_url}/${id}`).then((res) => {
            const data = res.data;

            setName(data?.name || "");
            setProvince(data?.province || "");
        });
    }, [id]);

    const updateCity = async () => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("name", name);
            formData.append("province", province);
            if (image) formData.append("image", image);

            await axios.put(`${base_url}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            navigate("/city"); // kembali ke halaman city
        } catch (error) {
            console.error("Gagal update city:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex mt-5 items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
                    Edit City
                </h2>

                <div className="space-y-4 text-left">
                    {/* IMAGE */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image City
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files?.[0] || null)}
                            className="w-full border rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    {/* NAME */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama City
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* PROVINCE */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Province
                        </label>
                        <input
                            type="text"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* BUTTON */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            onClick={updateCity}
                            disabled={loading}
                            className="flex items-center cursor-pointer justify-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-6 py-2 transition"
                        >
                            <Lucide icon="Save" />
                            {loading ? "Menyimpan..." : "Tambah"}
                        </button>

                        <NavLink to="/city" className="w-full sm:w-auto">
                            <button
                                type="button"
                                className="flex items-center cursor-pointer justify-center gap-2 w-full bg-orange-500 hover:bg-orange-400 text-white rounded-lg px-6 py-2 transition"
                            >
                                <Lucide icon="X" />
                                Batal
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
