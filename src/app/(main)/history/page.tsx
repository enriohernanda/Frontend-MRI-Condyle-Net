'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type HistoryItem = {
  model_used: number[] | number;
  date: string;
  upload_url: string;
  result_url: string;
};

const modelIdToName: Record<number, string> = {
  1: 'Mask R-CNN',
  2: 'Cascade Mask R-CNN',
  3: 'HTC',
  4: 'Mask2Formers',
  5: 'SOLOv2',
  6: 'Ensemble Method (Recommended)',
};

const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [searchDate, setSearchDate] = useState('');

  const fetchHistory = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const formData = new FormData();
    formData.append('mytoken', token);

    try {
      const res = await fetch(`${baseUrl}/api/get-history`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setHistory(data.history || []);
      } else {
        console.error('Gagal ambil data:', data.msg);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (date: string) => {
    setSelectedDate(date);
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setSelectedDate(null);
    setShowConfirm(false);
  };

  const handleDeleteConfirmed = async () => {
    const token = localStorage.getItem('token');
    if (!token || !selectedDate) return;

    const formData = new FormData();
    formData.append('mytoken', token);
    formData.append('date', selectedDate);

    try {
      const res = await fetch(`${baseUrl}/api/delete-history`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        await fetchHistory();
      } else {
        console.error('Gagal hapus:', data.msg);
      }
    } catch (err) {
      console.error('Error saat hapus:', err);
    } finally {
      setShowConfirm(false);
      setSelectedDate(null);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token || !searchDate) return;

    const formData = new FormData();
    formData.append('mytoken', token);
    formData.append('date', searchDate);

    try {
      const res = await fetch(`${baseUrl}/api/history/search`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setHistory(data.history || []);
      } else {
        console.error('Gagal cari:', data.msg);
        setHistory([]);
      }
    } catch (err) {
      console.error('Error saat cari:', err);
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

        <form onSubmit={handleSearch} className="mt-6 flex flex-wrap gap-2 w-full">
          <input
            type="text"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="Search by date"
            className="date-input flex-grow min-w-0 p-2 rounded-2xl bg-[#D9D9D9] dark:bg-[#1B1F24] dark:text-white cursor-pointer pr-10"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-[#3674B5] dark:bg-[#161B22] text-white hover:bg-[#2a5f9e] border border-sky-600 dark:border-[#2AB7C6] rounded-2xl cursor-pointer"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="rounded-lg flex flex-col items-center justify-center mt-6 p-10 transition-colors border border-sky-400 dark:border-[#2AB7C6] bg-[#F4F9FF] dark:bg-[#161B22]">
            Loading...
          </div>
        ) : history.length === 0 ? (
          <div className="rounded-lg flex flex-col items-center justify-center mt-6 p-10 transition-colors border border-sky-400 dark:border-[#2AB7C6] bg-[#F4F9FF] dark:bg-[#161B22]">
            <p>You don&apos;t have any history yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {history.map((item) => (
              <div
                key={`${item.date}-${item.result_url}`}
                className="border-2 border-sky-400 rounded-lg p-4 dark:border-[#2AB7C6]"
              >
                <p className="text-sm mb-2">
                  Model:{' '}
                  {Array.isArray(item.model_used)
                    ? item.model_used.map((id) => modelIdToName[id] || `Unknown (${id})`).join(', ')
                    : modelIdToName[item.model_used] || `Unknown (${item.model_used})`}
                </p>
                <p className="text-sm mb-2">Date: {item.date}</p>
                <div className="flex flex-col md:flex-row gap-4 mb-4 px-2 me-2">
                  <Image
                    src={`${baseUrl}/static/${item.upload_url}`}
                    alt="Uploaded"
                    width={500}
                    height={500}
                    unoptimized
                    className="object-cover w-full md:w-1/2 h-auto rounded border border-sky-400 dark:border-[#2AB7C6]"
                  />
                  <Image
                    src={`${baseUrl}/static/${item.result_url}`}
                    alt="Result"
                    width={500}
                    height={500}
                    unoptimized
                    className="object-cover w-full md:w-1/2 h-auto rounded border border-sky-400 dark:border-[#2AB7C6]"
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => confirmDelete(item.date)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                  >
                    Delete
                  </button>
                    <a
                      href={`${baseUrl}/static/${item.result_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex items-center gap-1 px-3 py-1 bg-[#EBEBEB] dark:bg-[#161B22] text-black dark:text-white hover:bg-[#2a5f9e] border border-sky-600 dark:border-[#2AB7C6] rounded cursor-pointer"
                    >
                    <Image
                      src="/download-blue.png"
                      alt="Download Light"
                      width={20}
                      height={20}
                      className="block dark:hidden"
                    />
                    <Image
                      src="/download-white.png"
                      alt="Download Dark"
                      width={20}
                      height={20}
                      className="hidden dark:block"
                    />
                    View & Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-[#F4F9FF] dark:bg-[#161B22] p-6 rounded-lg border border-sky-400 dark:border-[#2AB7C6] shadow-lg max-w-sm w-full text-center">
            <p className="mb-4 text-black dark:text-white font-semibold p-4">
              Are you sure want to delete this history?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-[#3674B5] dark:bg-[#161B22] text-white hover:bg-[#2a5f9e] border border-sky-600 dark:border-[#2AB7C6] rounded cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
