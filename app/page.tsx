import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Histoire from "@/components/sections/Histoire";
import Carte from "@/components/sections/Carte";
import Ambiance from "@/components/sections/Ambiance";
import FoodFunk from "@/components/sections/FoodFunk";
import Infos from "@/components/sections/Infos";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Histoire />
      <Carte />
      <Ambiance />
      <FoodFunk />
      <Infos />
      <Footer />
    </main>
  );
}
