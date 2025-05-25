import CookiesHeader from "../components/CookiesHeader";
import CookiesInfo from "../components/CookiesInfo";

function Cookies() {
  return (
    <>
      <Helmet>
        <title>Fixazi | Politica de cookies</title>
        <meta
          name="description"
          content="Politica de cookies fixazi.com. fixazi.com nu folosește cookies momentan."
        />
      </Helmet>
      <CookiesHeader />
      <CookiesInfo />
    </>
  );
}

export default Cookies;
