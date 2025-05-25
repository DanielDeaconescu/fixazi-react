import ContactCTA from "../components/ContactCTA";
import ContactMiddleSection from "../components/ContactMiddleSection";
import HeaderContact from "../components/HeaderContact";
import ServicesReviews from "../components/ServicesReviews";
import { Helmet } from "react-helmet-async";

function Contact() {
  return (
    <>
      <Helmet>
        <title>Fixazi | Contact</title>
        <meta
          name="description"
          content="Contact prin telefon, email sau completare formular. Reparații telefoane, tablete, laptop-uri - fixazi.com."
        />
      </Helmet>
      <HeaderContact />
      <ContactMiddleSection />
      <ServicesReviews />
      <ContactCTA />
    </>
  );
}

export default Contact;
