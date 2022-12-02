import vector from "src/images/vector.svg";
import "./style.scss";

const Header = (props) => {
  return (
    <div className="header">
      <div className="header-box">
        <img src={vector} alt="" />
        <p className="header-box__title">{props.title}</p>
      </div>
      {props.children}
    </div>
  );
};

export default Header;
