"use client";

import { Upload, User, FileText, ArrowRight, LogOut, CheckCircle2, Database, Search, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Types for fetched data
interface ClientData {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upload" | "data">("upload");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState<File | null>(null);
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

  useEffect(() => {
    if (activeTab === "data") {
      fetchClientData();
    }
  }, [activeTab]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (
        selectedFile.type === "text/csv" || 
        selectedFile.name.endsWith(".csv") ||
        selectedFile.name.endsWith(".xlsx")
      ) {
        setFile(selectedFile);
      } else {
        alert("Please upload a valid CSV or Excel (.xlsx) file.");
        e.target.value = "";
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !file) {
      alert("Please provide both a username and a file.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Read the file and save to database via API
    const reader = new FileReader();
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

        if (res.ok) {
          setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            setUsername("");
            setFile(null);
            
            setTimeout(() => {
              setSuccess(false);
              setActiveTab("data"); 
            }, 2000);
          }, 1000);
        } else {
          alert("Failed to upload to database. Check console.");
          setIsSubmitting(false);
        }
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    router.push("/admin-panel");
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Top Navigation Bar */}
      <nav className="border-b border-white/10 bg-[#0a0a0a] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {/* Logo and title removed as requested */}
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 relative">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Page Header & Tabs */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400 text-sm">
              Manage intelligence data and assignments.
            </p>
          </div>
          
          <div className="flex bg-[#0a0a0a] p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "upload" 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Upload size={16} />
              Upload Data
            </button>
            <button
              onClick={() => setActiveTab("data")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "data" 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Database size={16} />
              User Data
            </button>
          </div>
        </div>

        {/* Tab Content: Upload Data */}
        {activeTab === "upload" && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-2">Data Upload Center</h2>
                <p className="text-sm text-gray-400">Assign bulk intelligence data directly to specific users.</p>
              </div>

              {success && (
                <div className="mb-6 flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-4 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">Data successfully uploaded and assigned to {username || "the user"}!</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                    Target Username <span className="text-purple-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g., johndoe_123"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Enter the exact username of the account to assign this data to.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Intelligence Data File (CSV / XLSX) <span className="text-purple-400">*</span>
                  </label>
                  
                  <div className="relative group cursor-pointer">
                    <input
                      type="file"
                      id="csvFile"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      required={!success} // only require if not already succeeded to prevent brief flash of required popup on success reset
                    />
                    
                    <div className={`w-full border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 flex flex-col items-center justify-center gap-3
                      ${file ? "border-purple-500/50 bg-purple-500/5" : "border-white/10 bg-white/5 group-hover:border-purple-500/30 group-hover:bg-white/10"}`}
                    >
                      {file ? (
                        <>
                          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                            <FileText size={24} />
                          </div>
                          <div className="text-white font-medium">{file.name}</div>
                          <div className="text-xs text-gray-400">
                            {(file.size / 1024).toFixed(2)} KB • Ready to upload
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-gray-400 mb-2 group-hover:text-purple-400 group-hover:bg-purple-500/20 transition-all">
                            <Upload size={24} />
                          </div>
                          <div className="text-gray-300 font-medium">Click to upload or drag and drop</div>
                          <div className="text-xs text-gray-500">
                            CSV or XLSX (Excel) files only
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !username || !file}
                  className={`w-full flex items-center justify-center gap-2 font-bold rounded-xl px-4 py-4 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)]
                    ${(isSubmitting || !username || !file) 
                      ? "bg-white/10 text-gray-500 cursor-not-allowed shadow-none" 
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transform hover:-translate-y-0.5"
                    }
                  `}
                >
                  {isSubmitting ? (
                    "Processing Upload..."
                  ) : (
                    <>
                      Upload and Assign Data
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab Content: User Data */}
        {activeTab === "data" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              
              <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-white">Uploaded Intelligence Data</h2>
                
                <div className="relative w-full sm:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search data..."
                    className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {isLoadingData ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                          Loading data...
                        </td>
                      </tr>
                    ) : clientData.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                          No data has been assigned yet.
                        </td>
                      </tr>
                    ) : (
                      clientData.map((row) => (
                        <tr key={row.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{row.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-400">{row.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-400">{row.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-400">{row.company}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              row.status === "Claimed" 
                                ? "bg-green-500/10 text-green-400 border-green-500/20" 
                                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => handleDelete(row.id)}
                              disabled={deletingId === row.id}
                              className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                              title="Delete Entry"
                            >
                              {deletingId === row.id ? (
                                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></span>
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
              
              <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between text-xs text-gray-500">
                <span>Showing {clientData.length} entries</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-not-allowed text-gray-600">Previous</button>
                  <button className="px-3 py-1 rounded bg-white/10 text-white">1</button>
                  <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-not-allowed text-gray-600">Next</button>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
