import NavBar from "./NavBar";

const Header = ({ title, subtitle }) => {
  return (
    <div>
      <NavBar />
      <h1>{title}</h1>
      <h4>{subtitle}</h4>
    </div>
  );
};

export default Header;
