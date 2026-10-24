import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from "../firebase";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setLoading(true);
        try {
            const snap = await getDoc(doc(db, "users", email.trim().toLowerCase()));

            // same message for "no user" and "wrong password"
            const failMsg = "Incorrect email or password. Try again, or sign up for a free account.";

            if (!snap.exists()) {
                setError(failMsg);
                setLoading(false);
                return;
            }

            const user = snap.data();
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                navigate("/"); // correct details -> home page
            } else {
                setError(failMsg);
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <div className="auth-top">
                    <Link to="/signup" className="signup-btn">Sign up</Link>
                </div>

                <label>Your email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Your password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                {error && <p className="auth-error">{error}</p>}

                <button type="submit" className="auth-btn" disabled={loading}>
                    {loading ? "Checking..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;