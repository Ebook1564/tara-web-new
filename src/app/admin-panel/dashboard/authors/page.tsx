"use client";

import { Upload, User, ArrowRight, CheckCircle2, Database, Search, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface ClientData {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}

export default function AuthorsDashboard() {
  const [activeTab, setActiveTab] = useState<"upload" | "data">("upload");
  const [username, setUsername] = useState("");
  const [previewLink, setPreviewLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [clientData, setClientData] = useState<ClientData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/authors/admin/uploads?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setClientData(prev => prev.filter(row => row.id !== id));
      } else {
        alert("Failed to delete entry.");
      }
    } catch (err) {
      console.error("Error deleting entry:", err);
      alert("Error deleting entry.");
    } finally {
      setDeletingId(null);
    }
  };

  const fetchClientData = async () => {
    setIsLoadingData(true);
    try {
      const res = await fetch('/api/authors/claims');
      const data = await res.json();
      if (data.success) {
        setClientData(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch client data", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (activeTab === "data") {
      fetchClientData();
    }
  }, [activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !previewLink) {
      alert("Please provide both a username and a preview link.");
      return;
    }

    setIsSubmitting(true);

    const uploadLink = async () => {
      try {
        const res = await fetch('/api/authors/admin/uploads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: username,
            fileName: "Preview Link",
            fileData: previewLink
          })
        });
        if (res.ok) {
          setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            setUsername("");
            setPreviewLink("");

            setTimeout(() => {
              setSuccess(false);
              setActiveTab("data");
            }, 2000);
          }, 500);
        } else {
          alert("Failed to upload preview link.");
          setIsSubmitting(false);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to upload preview link.");
        setIsSubmitting(false);
      }
    };

    uploadLink();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-purple-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard - Authors</h1>
              <Link 
                href="/admin-panel/dashboard"
                className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg transition-colors inline-block"
              >
                Back to Menu
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              Manage intelligence data and assignments for authors.
            </p>
          </div>
          
          <div className="flex bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "upload" 
                  ? "bg-purple-600 text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Upload size={16} />
              Upload Link
            </button>
            <button
              onClick={() => setActiveTab("data")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "data" 
                  ? "bg-purple-600 text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Database size={16} />
              User Data
            </button>
          </div>
        </div>

        {activeTab === "upload" && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xl">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Author Preview Link Upload</h2>
                <p className="text-sm text-gray-500">Assign a preview link directly to specific author users.</p>
              </div>

              {success && (
                <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">Data successfully uploaded and assigned to {username || "the user"}!</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Target Username <span className="text-purple-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g., johndoe_123"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Enter the exact username of the account to assign this preview link to.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview Link <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={previewLink}
                    onChange={(e) => setPreviewLink(e.target.value)}
                    placeholder="https://example.com/preview"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !username || !previewLink}
                  className={`w-full flex items-center justify-center gap-2 font-bold rounded-xl px-4 py-4 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)]
                    ${(isSubmitting || !username || !previewLink) 
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" 
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transform hover:-translate-y-0.5"
                    }
                  `}
                >
                  {isSubmitting ? (
                    "Processing Upload..."
                  ) : (
                    <>
                      Upload and Assign Link
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "data" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-gray-900">Uploaded Intelligence Data</h2>
                <div className="relative w-full sm:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search data..."
                    className="w-full sm:w-64 bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {isLoadingData ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          Loading data...
                        </td>
                      </tr>
                    ) : clientData.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No data has been assigned yet.
                        </td>
                      </tr>
                    ) : (
                      clientData.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{row.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{row.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{row.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              row.status === "Claimed" 
                                ? "bg-green-50 text-green-700 border-green-200" 
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => handleDelete(row.id)}
                              disabled={deletingId === row.id}
                              className="text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
                              title="Delete Entry"
                            >
                              {deletingId === row.id ? (
                                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></span>
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span>Showing {clientData.length} entries</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors cursor-not-allowed text-gray-400">Previous</button>
                  <button className="px-3 py-1 rounded bg-purple-600 text-white">1</button>
                  <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors cursor-not-allowed text-gray-400">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
