import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function PricingPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            Simple{" "}
            <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            No hidden costs. No surprises. Choose the plan that fits your needs.
          </p>
        </div>
      </section>
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
