"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("mytoken", token);

    try {
      const res = await fetch("http://localhost:5000/api/get-history", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setHistory(data.history || []);
      } else {
        console.error("Gagal ambil data:", data.msg);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (date) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("mytoken", token);
    formData.append("date", date);

    try {
      const res = await fetch("http://localhost:5000/api/delete-history", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setHistory((prev) => prev.filter((item) => item.date !== date));
      } else {
        console.error("Gagal hapus:", data.msg);
      }
    } catch (err) {
      console.error("Error saat hapus:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="w-full h-full px-4 py-2 text-black dark:text-white">
      <div className="mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Image src="/history-blue.png" alt="History Light" width={32} height={32} className="block dark:hidden" />
          <Image src="/history-white.png" alt="History Dark" width={32} height={32} className="hidden dark:block" />
          History
        </h1>

        {loading ? (
          <div className="p-4 mt-6 border rounded-lg text-center">Loading...</div>
        ) : history.length === 0 ? (
          <div className="rounded-lg flex flex-col items-center justify-center p-10 mt-6 transition-colors border border-sky-400 dark:border-[#2AB7C6] bg-[#F4F9FF] dark:bg-[#161B22]">
            <p>You don't have any history yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {history.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 dark:border-gray-700">
                <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">
                  Model: {item.model_used?.join(", ")}
                </p>
                <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">
                  Date: {item.date}
                </p>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <img
                    src={item.upload_url}
                    alt="Uploaded"
                    className="w-full md:w-1/2 h-auto rounded border"
                  />
                  <img
                    src={item.result_url}
                    alt="Result"
                    className="w-full md:w-1/2 h-auto rounded border"
                  />
                </div>
                <button
                  onClick={() => handleDelete(item.date)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
