import CallToActionIndex from "../components/CallToActionIndex";
import HeaderHome from "../components/HeaderHome";
import OurValues from "../components/OurValues";
import OurValuesTabbedComponent from "../components/OurValuesTabbedComponent";
import PhotoGallery from "../components/PhotoGallery";
import { Helmet } from "react-helmet-async";

function Home({ toggleChat }) {
  return (
    <>
      <Helmet>
        <title>Fixazi | Reparații telefoane</title>
        <meta
          name="description"
          content="Reparații telefoane, tablete, laptopuri - fixazi.com"
        />
      </Helmet>
      <HeaderHome toggleChat={toggleChat} />
      {/* <OurValues /> */}
      <OurValuesTabbedComponent />
      <CallToActionIndex />
      <PhotoGallery />
    </>
  );
}

export default Home;
