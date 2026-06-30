import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import Portfolio from "@/components/Portfolio";
import { Code2, Layout, Database, Smartphone } from "lucide-react";

export default function WebDevelopmentPage() {
  return (
    <>
      <PageHero 
        title={<>Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Web Development</span></>}
        description="Scalable, secure, and blazing-fast web applications tailored to your business needs."
        badgeText="WEB DEVELOPMENT"
      />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Web Engineering Expertise</h2>
            <p className="text-lg text-gray-600">
              From responsive landing pages to complex full-stack web applications, we build robust digital solutions that perform flawlessly across all devices.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Layout, title: "Frontend Development", desc: "Pixel-perfect, responsive interfaces using React, Next.js, and modern CSS frameworks." },
              { icon: Database, title: "Backend Architecture", desc: "Secure, scalable server-side solutions with Node.js, Python, and cloud infrastructure." },
              { icon: Code2, title: "Custom Web Apps", desc: "Tailored web applications designed to solve your specific business challenges." },
              { icon: Smartphone, title: "PWA & Mobile-First", desc: "Progressive Web Apps that deliver app-like experiences directly in the browser." },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  <feature.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Portfolio />
      <CTA />
    </>
  );
}
