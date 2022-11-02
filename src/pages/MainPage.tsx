import { ContentRouter } from "../components/ContentRouter";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";

export const MainPage = () => {
  return (
    <div>
      <Navbar />
      <ContentRouter />
      <Footer />
    </div>
  );
};
