"use client";

import { Upload, User, FileText, ArrowRight, CheckCircle2, Database, Search, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface ClientData {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  row_count: number;
  status: string;
}

export default function LeadGenerationDashboard() {
  const [activeTab, setActiveTab] = useState<"upload" | "data">("upload");
  const [username, setUsername] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [clientData, setClientData] = useState<ClientData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/uploads?id=${id}`, {
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
      const res = await fetch('/api/claims');
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter((f) => {
        const valid = f.type === "text/csv" || f.name.endsWith(".csv") || f.name.endsWith(".xlsx");
        if (!valid) alert(`Skipping "${f.name}" - only CSV or Excel (.xlsx) files are allowed.`);
        return valid;
      });
      if (selectedFiles.length > 0) {
        setFiles(selectedFiles);
      } else {
        e.target.value = "";
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || files.length === 0) {
      alert("Please provide both a username and at least one file.");
      return;
    }

    setIsSubmitting(true);

    const uploadFile = async (file: File): Promise<boolean> => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = async (event) => {
          const base64Data = event.target?.result as string;
          try {
            const res = await fetch('/api/admin/uploads', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: username,
                fileName: file.name,
                fileData: base64Data
              })
            });
            resolve(res.ok);
          } catch (err) {
            console.error(err);
            resolve(false);
          }
        };
        reader.readAsDataURL(file);
      });
    };

    const uploadAll = async () => {
      let failed = false;
      for (const file of files) {
        const ok = await uploadFile(file);
        if (!ok) {
          failed = true;
          console.error(`Failed to upload ${file.name}`);
        }
      }

      if (!failed) {
        setTimeout(() => {
          setIsSubmitting(false);
          setSuccess(true);
          setUsername("");
          setFiles([]);

          setTimeout(() => {
            setSuccess(false);
            setActiveTab("data");
          }, 2000);
        }, 500);
      } else {
        alert("Some files could not be uploaded. Check console for details.");
        setIsSubmitting(false);
      }
    };

    uploadAll();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-purple-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard - Lead Generation</h1>
              <Link 
                href="/admin-panel/dashboard"
                className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg transition-colors inline-block"
              >
                Back to Menu
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              Manage lead generation data and assignments.
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
              Upload Data
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
                <h2 className="text-xl font-bold text-gray-900 mb-2">Data Upload Center</h2>
                <p className="text-sm text-gray-500">Assign bulk intelligence data directly to specific users.</p>
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
                    Enter the exact username of the account to assign this data to.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intelligence Data File (CSV / XLSX) <span className="text-purple-600">*</span>
                  </label>
                  
                  <div className="relative group cursor-pointer">
                    <input
                      type="file"
                      id="csvFile"
                      multiple
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      required={!success}
                    />
                    
                    <div className={`w-full border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 flex flex-col items-center justify-center gap-3
                      ${files.length > 0 ? "border-purple-500/60 bg-purple-50" : "border-gray-300 bg-gray-50 group-hover:border-purple-500/50 group-hover:bg-purple-50/50"}`}
                    >
                      {files.length > 0 ? (
                        <>
                          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 mb-2">
                            <FileText size={24} />
                          </div>
                          <div className="text-gray-900 font-medium">
                            {files.length} file{files.length > 1 ? "s" : ""} selected
                          </div>
                          <div className="text-xs text-gray-500 max-w-full space-y-1">
                            {files.map((f) => (
                              <div key={f.name} className="truncate">
                                {f.name} • {(f.size / 1024).toFixed(2)} KB
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-2 group-hover:text-purple-600 group-hover:bg-purple-100 transition-all">
                            <Upload size={24} />
                          </div>
                          <div className="text-gray-700 font-medium">Click to upload or drag and drop</div>
                          <div className="text-xs text-gray-500">
                            CSV or XLSX (Excel) files only • You can select multiple
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !username || files.length === 0}
                  className={`w-full flex items-center justify-center gap-2 font-bold rounded-xl px-4 py-4 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)]
                    ${(isSubmitting || !username || files.length === 0) 
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" 
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transform hover:-translate-y-0.5"
                    }
                  `}
                >
                  {isSubmitting ? (
                    "Processing Upload..."
                  ) : (
                    <>
                      Upload and Assign {files.length > 1 ? `${files.length} Files` : "Data"}
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
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Records</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {isLoadingData ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                          Loading data...
                        </td>
                      </tr>
                    ) : clientData.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
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
                            <div className="text-sm text-gray-600">{row.company}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{row.row_count}</div>
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
