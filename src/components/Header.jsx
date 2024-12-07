import NavBar from "./NavBar";

const Header = ({ title, subtitle }) => {
  return (
    <div className="container">
      <NavBar />
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default Header;
