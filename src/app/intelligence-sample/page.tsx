"use client";

import ClientLogos from "@/components/ClientLogos";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Download,
  FileText,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import React, { useState } from "react";

interface Sample {
  id: number;
  file_name: string;
  uploaded_at: string;
  row_count: number;
}

interface SampleDetail {
  id: number;
  file_name: string;
  file_data: string;
}

export default function IntelligenceSamplePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+971");
  const [phone, setPhone] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [samples, setSamples] = useState<Sample[]>([]);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleRequestSample = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setIsChecking(true);

    setTimeout(async () => {
      try {
        const fetchRes = await fetch(`/api/admin/uploads/${name.trim()}`);
        if (fetchRes.ok) {
          const fetchObj = await fetchRes.json();
          setSamples(fetchObj.data || []);
        } else {
          setMessage({
            text: "Please enter your name exactly as it appears on your LinkedIn profile to access the list.",
            type: "error",
          });
          // Log the failed access attempt
          fetch("/api/admin/access-logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username_attempted: name.trim(), service_type: "Lead Generation", email: email.trim(), phone: `${countryCode} ${phone}`.trim() }),
          }).catch(() => {});
        }
      } catch {
        setMessage({ text: "An error occurred while checking for your data.", type: "error" });
      } finally {
        setIsChecking(false);
      }
    }, 800);
  };

  const handleRecordClaim = async (sample: Sample) => {
    try {
      await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: `${countryCode} ${phone}`,
          csv_name: sample.file_name || "unknown.csv",
        }),
      });
    } catch (e) {
      console.error("Failed to save claim to DB:", e);
    }
  };

  // Downloads only the specific file the user clicked
  const handleDownload = async (sample: Sample) => {
    setDownloadingId(sample.id);
    try {
      const res = await fetch(`/api/admin/uploads/${name.trim()}?id=${sample.id}`);
      if (res.ok) {
        const obj = await res.json();
        const detail: SampleDetail = obj.data;

        const link = document.createElement("a");
        link.href = detail.file_data;
        link.download = detail.file_name || "intelligence_data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        handleRecordClaim(sample);
      } else {
        setMessage({ text: "Could not download this sample. Please try again.", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "An error occurred while downloading the sample.", type: "error" });
    } finally {
      setDownloadingId(null);
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-12 overflow-hidden relative">
      
      {/* Decorative Crystals / Light Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-300/30 blur-[100px]" />
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[50%] rounded-full bg-blue-300/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-indigo-300/20 blur-[100px]" />
      </div>

      {/* Hero & Content Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Copy & Trust Signals */}
          <div className="relative lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100 text-purple-600 text-sm font-semibold mb-6 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Premium Data Quality
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Intelligence Sample</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              Experience the power of our data-driven lead generation. Request a custom intelligence sample tailored to your business needs and see the quality of our prospects firsthand.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Highly targeted and verified B2B contacts",
                "Actionable market insights and intent data",
                "Direct dials and verified email addresses",
                "GDPR and CCPA compliant data sources"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Dynamic Flow */}
          <div className="relative">
            {/* Soft decorative glow behind the panel */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl blur-xl opacity-50" />
            
            <div className="relative bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200/50">
              {/* STEP 1: Request form */}
              {samples.length === 0 && (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sample</h3>
                    <p className="text-slate-500 text-sm">Fill out the details below to receive your intelligence data samples.</p>
                  </div>

                  {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-medium border flex items-start gap-3 ${
                      message.type === "success" 
                        ? "bg-green-50 border-green-200 text-green-700" 
                        : "bg-red-50 border-red-200 text-red-700"
                    }`}>
                      {message.type === "success" ? <Download className="w-5 h-5 shrink-0" /> : <Shield className="w-5 h-5 shrink-0" />}
                      <p>{message.text}</p>
                    </div>
                  )}

                  <form className="space-y-6" onSubmit={handleRequestSample}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        Name (as per LinkedIn) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all shadow-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all shadow-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          id="countryCode"
                          name="countryCode"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value.replace(/[^\d\s+-]/g, ''))}
                          placeholder="+971"
                          className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all shadow-sm text-center"
                        />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="50 000 0000"
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isChecking}
                      className={`group relative w-full flex items-center justify-center gap-3 font-bold text-lg rounded-2xl px-8 py-4.5 transition-all duration-500 overflow-hidden isolate
                        ${isChecking 
                          ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed" 
                          : "text-white shadow-[0_10px_40px_-10px_rgba(147,51,234,0.6)] hover:shadow-[0_20px_50px_-10px_rgba(147,51,234,0.8)] transform hover:-translate-y-1"
                        }`}
                    >
                      {!isChecking && (
                        <>
                          {/* Rich animated gradient base */}
                          <div className="absolute inset-0 -z-20 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 transition-all duration-500 group-hover:scale-105" />
                          
                          {/* Inner glow / reflection */}
                          <div className="absolute inset-0 -z-10 rounded-2xl border-t border-white/30 border-b border-black/20 mix-blend-overlay" />
                          
                          {/* Sweeping Sheen Effect */}
                          <div className="absolute inset-0 -z-10 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out skew-x-12" />
                        </>
                      )}

                      {isChecking ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <span className="relative z-10 tracking-wide drop-shadow-sm">Get your leads</span>
                          <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:drop-shadow-sm" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
                      <Shield className="w-4 h-4 text-slate-400" />
                      <span>Your information is secure and encrypted.</span>
                    </div>
                  </form>
                </>
              )}

              {/* STEP 2: List of downloadable samples */}
              {samples.length > 0 && (
                <>
                  <div className="mb-8">
                    <button
                      onClick={() => {
                        setSamples([]);
                        setMessage({ text: "", type: "" });
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors mb-4"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Use a different name
                    </button>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Intelligence Samples</h3>
                    <p className="text-slate-500 text-sm">
                      We found <span className="font-semibold text-purple-600">{samples.length}</span> sample
                      {samples.length > 1 ? "s" : ""} for <span className="font-semibold text-slate-700">{name.trim()}</span>. Click download to save the file assigned to you.
                    </p>
                  </div>

                  {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-medium border flex items-start gap-3 ${
                      message.type === "success" 
                        ? "bg-green-50 border-green-200 text-green-700" 
                        : "bg-red-50 border-red-200 text-red-700"
                    }`}>
                      {message.type === "success" ? <Download className="w-5 h-5 shrink-0" /> : <Shield className="w-5 h-5 shrink-0" />}
                      <p>{message.text}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {samples.map((sample, idx) => (
                      <div
                        key={sample.id}
                        className="group rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100 transition-all duration-200 overflow-hidden"
                      >
                        <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-slate-900 font-semibold truncate">
                              {sample.file_name}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 space-x-2">
                              <span>{sample.row_count} records</span>
                              <span>•</span>
                              <span>Uploaded {formatDate(sample.uploaded_at)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleDownload(sample)}
                              disabled={downloadingId === sample.id}
                              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                                ${downloadingId === sample.id
                                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                                }`}
                            >
                              {downloadingId === sample.id ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Downloading...
                                </>
                              ) : (
                                <>
                                  <Download className="w-4 h-4" />
                                  Download
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="px-5 pb-4 flex items-center gap-2.5">
                          <span className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <span
                              className={`block h-full rounded-full ${
                                idx === 0 ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-purple-300"
                              }`}
                              style={{ width: `${Math.max(15, Math.min(100, (sample.row_count / (samples[0]?.row_count || 1)) * 100))}%` }}
                            />
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">Sample {idx + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Partners Section */}
      <div className="mt-12 relative z-10">
        <ClientLogos />
      </div>
    </div>
  );
}