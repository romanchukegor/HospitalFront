import headerIcon from "src/images/headerIcon.svg";
import "./style.scss";

const Header = (props) => {
  return (
    <div className="header">
      <div className="header-box">
        <img src={headerIcon} alt="" />
        <p className="header-box__title">{props.title}</p>
      </div>
      {props.children}
    </div>
  );
};

export default Header;
