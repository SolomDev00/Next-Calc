import ContactSection from "./website/ContactSection";
import LandingSection from "./website/LandingSection";

const HomePage = () => {
  return (
    <div className="w-full mb-8 max-sm:overflow-x-hidden relative">
      <LandingSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
