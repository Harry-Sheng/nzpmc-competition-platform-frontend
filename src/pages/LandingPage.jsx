import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import LandingPageLogged from "./LandingPageLogged";
import LandingPageNotLogged from "./LandingPageNotLogged";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      {user ? (
        <div>
          <LandingPageLogged />
        </div>
      ) : (
        <div>
          <LandingPageNotLogged />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
