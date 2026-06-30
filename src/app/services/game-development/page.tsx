import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import Portfolio from "@/components/Portfolio";
import { Gamepad2, Layers, Cpu, Users } from "lucide-react";

export default function GameDevelopmentPage() {
  return (
    <>
      <PageHero 
        title={<>Immersive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Game Development</span></>}
        description="Engaging 2D and 3D games across mobile, web, and PC platforms."
        badgeText="GAME STUDIO"
      />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Bringing Ideas to Play</h2>
            <p className="text-lg text-gray-600">
              Our game development studio crafts addictive gameplay loops, stunning graphics, and robust multiplayer experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Gamepad2, title: "Unity & Unreal", desc: "Industry-leading engines to build high-fidelity 2D and 3D experiences." },
              { icon: Layers, title: "Game Design & Art", desc: "Concept art, 3D modeling, texturing, and comprehensive level design." },
              { icon: Users, title: "Multiplayer Systems", desc: "Scalable backend architecture for real-time multiplayer gaming." },
              { icon: Cpu, title: "Web3 & NFT Gaming", desc: "Blockchain integration, smart contracts, and tokenomics design." },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-6">
                  <feature.icon className="text-pink-600" size={24} />
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
