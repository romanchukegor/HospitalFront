import { Context } from "src";
import { useContext } from "react";
import vector from "src/images/vector.svg";
import "./style.scss";

const Header = ({ title, logOutUser }) => {
  const store = useContext(Context);

  return (
    <div className="header">
      <div className="header-box">
        <img src={vector} alt="" />
        <p className="header-box__title">{title}</p>
      </div>
      {store.isAuth && <button onClick={logOutUser}>Выход</button>}
    </div>
  );
};

export default Header;
