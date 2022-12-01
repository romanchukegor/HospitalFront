import vector from "src/images/vector.svg";
import "./style.scss";

const Header = ({ title }) => {
  return (
    <div className="header">
      <img src={vector} alt="" />
      <p className="header__title">{title}</p>
    </div>
  );
};

export default Header;
