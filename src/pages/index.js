import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FaPen, FaTrash } from "react-icons/fa6";
import Title from "@/components/Title";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [data, setData] = useState([]);

  const header = ["User Id", "Name", "Email", "Username", "Phone", "Action"];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
      );

      toast.success("Data Berhasil Dihapus");
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Data Gagal Dihapus");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        transition={Bounce}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Title titlePage="Data Users" textButton="Add New" href="/add-user" />
      <div className="my-4">
        <p className="font-bold text-2xl text-gray-500 mb-2">List User</p>
        <div className="border-b border-gray-400"></div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {header.map((item, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="border px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((user) => (
                    <tr key={user.id}>
                      <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.name}
                      </td>
                      <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.username}
                      </td>
                      <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phone}
                      </td>
                      <td className="border whitespace-nowrap text-sm text-gray-500 flex gap-2 w-full">
                        <div className="border-r-2 w-full flex justify-center items-center">
                          <Link
                            href={`/edit-user/${user.id}`}
                            className="flex gap-2 items-center py-4 text-blue-600 hover:text-blue-800"
                          >
                            <FaPen size={18} />
                            Edit
                          </Link>
                        </div>
                        <div
                          className="flex gap-2 items-center py-4 w-full text-red-400 hover:text-red-600  justify-center cursor-pointer"
                          onClick={() => deleteUser(user.id)}
                        >
                          <FaTrash size={18} />
                          Delete
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
