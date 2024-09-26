import iconLike from "../../assets/images/icon-like.svg";
import "./BtnLike.css";

export default function BtnLike() {
  return (
    <button className="btn-like" type="button" title="Like">
      <img src={iconLike} alt="Like" />
      <span>0</span>
    </button>
  );
}
