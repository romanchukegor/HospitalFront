import headerIcon from "src/images/headerIcon.svg";
import "./style.scss";

const Header = ({children, title}) => {
  return (
    <div className="header">
      <div className="header-box">
        <img src={headerIcon} alt="" />
        <p className="header-box__title">{title}</p>
      </div>
      {children}
    </div>
  );
};

export default Header;
