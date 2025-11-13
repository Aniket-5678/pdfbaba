import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import { useAuth } from "../../context/auth";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AdminUserSourceCodeOrder = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get(`/api/v1/sourcecode/all-orders`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        if (res.data.success) {
          setOrders(res.data.orders);
          setFilteredOrders(res.data.orders);
        }
      } catch (error) {
        console.error("Error fetching all orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, [auth?.token]);

  // ✅ Filter Orders by Date
  const handleFilterChange = (value) => {
    setFilter(value);
    const now = new Date();

    if (value === "today") {
      setFilteredOrders(
        orders.filter(
          (order) =>
            new Date(order.createdAt).toDateString() === now.toDateString()
        )
      );
    } else if (value === "7days") {
      const past = new Date();
      past.setDate(now.getDate() - 7);
      setFilteredOrders(
        orders.filter((order) => new Date(order.createdAt) >= past)
      );
    } else if (value === "30days") {
      const past = new Date();
      past.setDate(now.getDate() - 30);
      setFilteredOrders(
        orders.filter((order) => new Date(order.createdAt) >= past)
      );
    } else {
      setFilteredOrders(orders);
    }
  };

  // ✅ Export to Excel
  const handleExportExcel = () => {
    if (filteredOrders.length === 0) {
      alert("No data to export!");
      return;
    }

    const data = filteredOrders.map((order) => ({
      "User Name": order.userName,
      "Email": order.userEmail,
      "Source Code": order.title,
      "Price (₹)": order.price,
      "Order Date": new Date(order.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(file, `Orders_${filter}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 mt-40">
        {/* Header + Filters + Download */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            🧾 All User Source Code Orders
          </h1>

          <div className="flex items-center gap-2">
            {[
              { label: "All", value: "all" },
              { label: "Today", value: "today" },
              { label: "Last 7 Days", value: "7days" },
              { label: "Last 30 Days", value: "30days" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => handleFilterChange(btn.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === btn.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-blue-100 text-gray-700"
                }`}
              >
                {btn.label}
              </button>
            ))}

            {/* 🧾 Excel Download Button */}
            <button
              onClick={handleExportExcel}
              className="ml-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all"
            >
              ⬇️ Export Excel
            </button>
          </div>
        </div>

        {/* 🧾 Table */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-medium">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-100">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-5 font-semibold">User Name</th>
                  <th className="py-3 px-5 font-semibold">Email</th>
                  <th className="py-3 px-5 font-semibold">Source Code</th>
                  <th className="py-3 px-5 font-semibold">Price</th>
                  <th className="py-3 px-5 font-semibold">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, idx) => (
                  <tr
                    key={order._id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="py-3 px-5">{order.userName}</td>
                    <td className="py-3 px-5">{order.userEmail}</td>
                    <td className="py-3 px-5">{order.title}</td>
                    <td className="py-3 px-5 font-medium text-gray-800">
                      ₹{order.price}
                    </td>
                    <td className="py-3 px-5 text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminUserSourceCodeOrder;
