"use client";

import { FileText, Database, ScrollText, X, Trash2, Mail, Phone, Clock } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

interface LogEntry {
  id: number;
  username_attempted: string;
  email: string;
  phone: string;
  service_type: string;
  attempted_at: string;
}

export default function AdminDashboardMenu() {
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [deletingLogId, setDeletingLogId] = useState<number | null>(null);

  const fetchLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const res = await fetch("/api/admin/access-logs");
      if (res.ok) {
        const data = await res.json();
        setLogs(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  const handleOpenLogs = () => {
    setShowLogs(true);
    fetchLogs();
  };

  const handleClearLogs = async () => {
    if (!confirm("Are you sure you want to clear all access logs?")) return;
    try {
      const res = await fetch("/api/admin/access-logs", { method: "DELETE" });
      if (res.ok) setLogs([]);
    } catch (err) {
      console.error("Failed to clear logs:", err);
    }
  };

  const handleDeleteLog = async (id: number) => {
    setDeletingLogId(id);
    try {
      const res = await fetch(`/api/admin/access-logs?id=${id}`, { method: "DELETE" });
      if (res.ok) setLogs(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      console.error("Failed to delete log:", err);
    } finally {
      setDeletingLogId(null);
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-purple-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mt-20 max-w-6xl mx-auto">
          <Link
            href="/admin-panel/dashboard/authors"
            className="flex-1 bg-white backdrop-blur-xl border border-gray-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-6 hover:bg-purple-50 hover:border-purple-400/60 transition-all duration-300 group shadow-sm text-center"
          >
            <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform duration-300">
              <FileText size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Authors</h2>
          </Link>
          
          <Link
            href="/admin-panel/dashboard/lead-generation"
            className="flex-1 bg-white backdrop-blur-xl border border-gray-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-6 hover:bg-blue-50 hover:border-blue-400/60 transition-all duration-300 group shadow-sm text-center"
          >
            <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
              <Database size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Lead Generation</h2>
          </Link>

          <button
            onClick={handleOpenLogs}
            className="flex-1 bg-white backdrop-blur-xl border border-gray-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-6 hover:bg-orange-50 hover:border-orange-400/60 transition-all duration-300 group shadow-sm text-center cursor-pointer"
          >
            <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform duration-300">
              <ScrollText size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Access Logs</h2>
          </button>
        </div>
      </main>

      {/* Logs Modal */}
      {showLogs && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600">
                  <ScrollText size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Access Logs</h3>
                  <p className="text-sm text-gray-500">{logs.length} failed attempt{logs.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {logs.length > 0 && (
                  <button
                    onClick={handleClearLogs}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setShowLogs(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {isLoadingLogs ? (
                <div className="text-center py-12 text-gray-400">Loading logs...</div>
              ) : logs.length === 0 ? (
                <div className="text-center py-12 text-gray-400">No failed access attempts recorded yet.</div>
              ) : (
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 ${
                        log.service_type === "Author"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {log.service_type}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-semibold truncate">
                          {log.username_attempted}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                          <span className="inline-flex items-center gap-1"><Mail size={12} className="text-gray-400" /> {log.email || "N/A"}</span>
                          <span className="inline-flex items-center gap-1"><Phone size={12} className="text-gray-400" /> {log.phone || "N/A"}</span>
                          <span className="inline-flex items-center gap-1"><Clock size={12} className="text-gray-400" /> {formatDate(log.attempted_at)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        disabled={deletingLogId === log.id}
                        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="Delete this log"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}