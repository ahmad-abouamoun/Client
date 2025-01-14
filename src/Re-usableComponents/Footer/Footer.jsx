import {Facebook, Instagram, Linkedin} from "lucide-react";
import "./Footer.css";
const Footer = () => {
    return (
        <div>
            <footer>
                <div class="footer-container">
                    <div class="footer-section">
                        <h3>Customer Service</h3>
                        <ul>
                            <li>
                                <a href="#">Help</a>
                            </li>
                            <li>
                                <a href="#">Lorem Ipsum</a>
                            </li>
                            <li>
                                <a href="#">Lorem Ipsum</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Information</h3>
                        <ul>
                            <li>
                                <a href="#">My Account</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                            <li>
                                <a href="#">Affiliate Program</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-section follow-us">
                        <h3>Follow us for latest updates</h3>
                        <div>
                            <Linkedin size={32} className="linkedin-icon" />
                            <Instagram size={32} className="instagram-icon" />
                            <Facebook size={32} className="facebook-icon" />
                        </div>
                        <div class="social-icons"></div>
                        <p>Follow US</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Footer;
