import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout";
import App from "../App";

// product
import Product from "../pages/product";
import TambahProduct from "../components/product/addProduct";
import EditProduct from "../components/product/updateProduct";

// users
import Users from "../pages/users";
import TambahUser from "../components/users/addUser";
import EditUser from "../components/users/updateUser";

// city
import City from "../pages/city";
import TambahCity from "../components/City/addCity";
import EditCity from "../components/City/updateCity";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <App /> },    
        { path: "product", element: <Product /> }, 
        { path: "users", element: <Users /> },
        { path: "product/tambahProduct", element: <TambahProduct /> },
        { path: "product/editProduct/:id", element: <EditProduct /> },
        { path: "users/tambahUsers", element: <TambahUser /> },
        { path: "users/editUsers/:id", element: <EditUser /> },
        { path: "city", element: <City /> },
        { path: "city/tambahCity", element: <TambahCity /> },
        { path: "city/editCity/:id", element: <EditCity /> },
      ],
    },
  ]);
}
