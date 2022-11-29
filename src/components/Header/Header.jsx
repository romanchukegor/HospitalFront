import vector from "images/Vector.svg";
import "./style.scss";

const HeaderImage = ({ title }) => {
  return (
    <div className="header">
      <img src={vector} alt="" />
      <p className="header__title">{title}</p>
    </div>
  );
};

export default HeaderImage;
