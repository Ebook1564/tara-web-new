"use client";

import { FileText, Database } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function AdminDashboardMenu() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-purple-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mt-20 max-w-4xl mx-auto">
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
        </div>
      </main>
    </div>
  );
}