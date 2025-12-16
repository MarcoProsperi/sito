import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import BentoGrid from "@/components/BentoGrid";
import SocialFeed from "@/components/SocialFeed";
import SponsorSlider from "@/components/SponsorSlider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <BentoGrid />

      {/* Editorial Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-virtus-yellow font-display font-bold tracking-widest uppercase mb-4">La Nostra Missione</h3>
          <p className="text-3xl md:text-4xl font-display font-bold text-virtus-blue leading-tight mb-8">
            "NON SOLO SPORT, MA UNA SCUOLA DI VITA PER LA NOSTRA CITTÀ."
          </p>
          <div className="h-1 w-20 bg-virtus-blue mx-auto"></div>
        </div>
      </section>

      <SponsorSlider />
      <SocialFeed />
    </div>
  );
}
