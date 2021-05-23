import "./Footer.css";
import { SocialIcon } from "react-social-icons";
import { FaReact } from "react-icons/fa";


function Footer() {
  return (
    <div className="footer--container">
      <div className="icons--row">
        <SocialIcon className="icon" url="https://www.linkedin.com/in/kshivam99/" />
        <SocialIcon className="icon" url="https://github.com/kshivam99" bgColor="#fff" />
        <SocialIcon className="icon" url="https://twitter.com/kshivam99_" fgColor="#fff"/>
      </div>
      <p>Made in React{<FaReact className="span"/>} by kshivam99</p>
    </div>
  );
}

export default Footer;
