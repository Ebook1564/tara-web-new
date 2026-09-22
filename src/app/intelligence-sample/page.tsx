"use client";

import Testimonials from "@/components/Testimonials";
import { ArrowRight, CheckCircle2, Shield, Download } from "lucide-react";
import React, { useState } from "react";

export default function IntelligenceSamplePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [countryCode, setCountryCode] = useState("+971"); // Default to UAE

  const handleRequestSample = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setIsChecking(true);

    // Simulate database lookup delay
    setTimeout(async () => {
      try {
        const fetchRes = await fetch(`/api/admin/uploads/${name.trim()}`);
        if (fetchRes.ok) {
          const fetchObj = await fetchRes.json();
          const match = fetchObj.data;

          // Trigger file download
          const link = document.createElement("a");
          link.href = match.file_data;
          link.download = match.file_name || "intelligence_data.csv";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Save to PostgreSQL via API (so Admin sees they claimed it)
          try {
            await fetch('/api/claims', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: name,
                email: email,
                phone: `${countryCode} ${phone}`,
                csv_name: match.file_name || 'unknown.csv'
              }),
            });
          } catch (e) {
            console.error("Failed to save claim to DB:", e);
          }

          setMessage({ text: "Intelligence data found! Downloading your file now...", type: "success" });
        } else {
          setMessage({ 
            text: "No intelligence data found for this name. Please ensure it matches exactly what was assigned to you.", 
            type: "error" 
          });
        }
      } catch (err) {
        setMessage({ text: "An error occurred while checking for your data.", type: "error" });
      } finally {
        setIsChecking(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-12 overflow-hidden relative">
      
      {/* Decorative Crystals / Light Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-300/30 blur-[100px]" />
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[50%] rounded-full bg-blue-300/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-indigo-300/20 blur-[100px]" />
      </div>

      {/* Hero & Form Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Copy & Trust Signals */}
          <div className="relative">
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

          {/* Right Column: Form */}
          <div className="relative">
            {/* Soft decorative glow behind the form */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl blur-xl opacity-50" />
            
            <div className="relative bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200/50">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sample</h3>
                <p className="text-slate-500 text-sm">Fill out the details below to receive your intelligence data sample.</p>
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
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value.replace(/[^0-9+]/g, ''))} // Allow numbers and '+'
                      placeholder="+971"
                      className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all shadow-sm text-center"
                    />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // Strips out anything that is not a number
                      placeholder="50 000 0000"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isChecking}
                  className={`w-full flex items-center justify-center gap-2 font-bold rounded-xl px-4 py-4 transition-all duration-300 shadow-[0_8px_20px_rgba(147,51,234,0.2)] 
                    ${isChecking 
                      ? "bg-slate-200 text-slate-500 shadow-none cursor-not-allowed" 
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white hover:shadow-[0_8px_25px_rgba(147,51,234,0.3)] transform hover:-translate-y-0.5"
                    }`}
                >
                  {isChecking ? "Checking Database..." : "Get Intelligence Sample"}
                  {!isChecking && <ArrowRight className="w-5 h-5" />}
                </button>

                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span>Your information is secure and encrypted.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="mt-12 relative z-10">
        <Testimonials />
      </div>
    </div>
  );
}
