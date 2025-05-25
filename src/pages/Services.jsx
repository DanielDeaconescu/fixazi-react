import { Helmet } from "react-helmet-async";
import HeaderServices from "../components/HeaderServices";
import ServicesCallToAction from "../components/ServicesCallToAction";
import ServicesOurServices from "../components/ServicesOurServices";

function Services() {
  return (
    <>
      <Helmet>
        <title>Fixazi | Servicii</title>
        <meta
          name="description"
          content="Servicii înlocuire display, înlocuire baterie, înlocuire tastatură, reparații telefoane, tablete, laptopuri"
        />
      </Helmet>
      <HeaderServices />
      <ServicesOurServices />
      <ServicesCallToAction />
    </>
  );
}

export default Services;
