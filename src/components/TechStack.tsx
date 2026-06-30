"use client";

const techs = [
  { name: "React", color: "#61DAFB", bg: "bg-sky-50" },
  { name: "Next.js", color: "#000000", bg: "bg-gray-50" },
  { name: "Node.js", color: "#339933", bg: "bg-green-50" },
  { name: "TypeScript", color: "#3178C6", bg: "bg-blue-50" },
  { name: "Python", color: "#3776AB", bg: "bg-blue-50" },
  { name: "Flutter", color: "#02569B", bg: "bg-blue-50" },
  { name: "React Native", color: "#61DAFB", bg: "bg-sky-50" },
  { name: "Firebase", color: "#FFCA28", bg: "bg-amber-50" },
  { name: "AWS", color: "#FF9900", bg: "bg-orange-50" },
  { name: "MongoDB", color: "#47A248", bg: "bg-green-50" },
  { name: "PostgreSQL", color: "#4169E1", bg: "bg-blue-50" },
  { name: "Docker", color: "#2496ED", bg: "bg-blue-50" },
  { name: "Unity", color: "#000000", bg: "bg-gray-50" },
  { name: "Kubernetes", color: "#326CE5", bg: "bg-blue-50" },
  { name: "GraphQL", color: "#E10098", bg: "bg-pink-50" },
  { name: "Tailwind CSS", color: "#06B6D4", bg: "bg-cyan-50" },
];

export default function TechStack() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-4">
            Technology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Our Tech{" "}
            <span className="text-primary">Stack</span>
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Modern tools and frameworks we use to build cutting-edge solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {techs.map((tech) => (
            <div
              key={tech.name}
              className={`group p-4 rounded-xl border border-border ${tech.bg} hover:shadow-md hover:border-primary/20 transition-all duration-300 text-center hover:-translate-y-1`}
            >
              <div
                className="w-8 h-8 mx-auto rounded-lg flex items-center justify-center text-xs font-bold mb-2"
                style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
              >
                {tech.name.charAt(0)}
              </div>
              <div className="text-xs font-medium text-muted group-hover:text-foreground transition-colors">
                {tech.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
