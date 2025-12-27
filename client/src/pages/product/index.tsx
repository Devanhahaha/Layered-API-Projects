import { useState, useEffect } from "react";
import axios from "axios";
import CardListProduct from "../../components/product";
import Lucide from "../../components/Lucide";
import Search from "../../components/Search";
import { NavLink } from "react-router-dom";

const base_url = "http://localhost:3002/products";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

function Main() {

    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get(base_url)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, []);

    // filter user untuk search
    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    // function delete
    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Apakah Anda Yakin Ingin Menghapus Produk Ini?")

        if (!confirmDelete) return

        try {
            await axios.delete(`${base_url}/${id}`);

            setProducts((prev) => prev.filter((item) => item.id !==  id));

            alert("Product Berhasil di Hapus!");
        } catch (error) {
            console.error("Produk Gagal di Hapus:", error);
            alert("Gagal Hapus Produk!");
        }
    }

    return (
        <div className="min-h-screen mt-5">
            <div className="flex items-center justify-between">
                <NavLink to="/product/tambahProduct">
                    <button className="bg-blue-500 ml-3 text-white rounded px-3 py-2 cursor-pointer hover:bg-blue-400 flex gap-3"><Lucide icon="Plus" />Add Product</button>
                </NavLink>
                <Search search={search} setSearch={setSearch} />
            </div>
            {filteredProducts.map(item => (
                <CardListProduct key={item.id} className="bg-white shadow-md rounded-xl mx-3 mb-3 cursor-pointer mt-5 p-5 px-3 hover:shadow-xl transition">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border mt-5 border-gray-100 rounded-xl shadow-xl">
                        <img src={`http://localhost:3002/product/${item.image}`} alt={item.name} className="md:w-52 w-full items-center justify-center md:h-52 object-cover rounded-t-lg" />
                        <div className="p-4 mt-10 text-center items-center justify-center">
                            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                            <p className="text-gray-700 mb-4">{item.description}</p>
                            <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-center mb-3 gap-3">
                            <NavLink to={`/product/editProduct/${item.id}`}>
                                <button className="bg-amber-500 text-white rounded px-3 py-2 cursor-pointer hover:bg-amber-400 flex gap-3"><Lucide icon="Pencil" />Edit</button>
                            </NavLink>
                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white rounded px-3 py-2 cursor-pointer hover:bg-red-400 flex gap-3"><Lucide icon="Trash" />Delete</button>
                        </div>
                    </div>
                </CardListProduct>
            ))}
        </div>
    )
}

export default Main