import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CrossDeviceDemo from "@/components/CrossDeviceDemo";
import FeatureGrid from "@/components/FeatureGrid";
import SectionDivider from "@/components/ui/SectionDivider";
import HowItWorks from "@/components/HowItWorks";
import DisplayShowcase from "@/components/DisplayShowcase";
import ComparisonSection from "@/components/ComparisonSection";
import UseCasesStrip from "@/components/UseCasesStrip";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/ui/FloatingParticles";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CrossDeviceDemo />
      <FeatureGrid />
      <SectionDivider />
      <HowItWorks />
      <DisplayShowcase />
      <ComparisonSection />
      <UseCasesStrip />
      <DownloadSection />
      <Footer />
      <FloatingParticles />
    </>
  );
}
