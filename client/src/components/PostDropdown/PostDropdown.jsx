import iconMore from "../../assets/images/icon-more.svg";
import "./PostDropdown.css";

export default function PostDropdown() {
  return (
    <div className="post-dropdown">
      <button className="btn-more" type="button" title="More">
        <img className="icon-more" src={iconMore} alt="More" />
      </button>
    </div>
  );
}
