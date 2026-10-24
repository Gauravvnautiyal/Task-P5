import { useState } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubscribe() {
    // check if empty
    if (email.trim() === "") {
      setIsError(true);
      setMessage("Please enter your email");
      return;
    }

    try {
      // send the email to the backend
      const response = await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage(data.message);
        setEmail(""); // clear the box
      } else {
        setIsError(true);
        setMessage(data.message);
      }
    } catch (error) {
      setIsError(true);
      setMessage("Cannot connect to server. Is the backend running?");
    }
  }

  return (
    <footer>
      <div className="insider-bar">
        <span>SIGN UP FOR OUR DAILY INSIDER</span>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
        {message && (
          <span className={isError ? "insider-msg error" : "insider-msg ok"}>
            {message}
          </span>
        )}
      </div>
      <div className="footer-main">
        <div className="footer-cols">
          <div>
            <h4>Explore</h4>
            <a href="/">Home</a>
            <a href="#">Questions</a>
            <a href="/#articles">Articles</a>
            <a href="/#tutorials">Tutorials</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#">FAQs</a>
            <a href="#">Help</a>
            <a href="#">Contact Us</a>
          </div>
          <div>
            <h4>Stay connected</h4>
            <div className="socials">
              <Facebook size={26} />
              <Twitter size={26} />
              <Instagram size={26} />
            </div>
          </div>
        </div>

        <p className="copyright">DEV@Deakin 2026</p>
        <div className="legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Code of Conduct</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;