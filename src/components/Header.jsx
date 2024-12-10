import NavBar from "./NavBar";

const Header = ({ title, subtitle }) => {
  return (
    <div>
      <NavBar />
      <div className="container">
        <h1>{title}</h1>
        <h4>{subtitle}</h4>
      </div>
    </div>
  );
};

export default Header;
