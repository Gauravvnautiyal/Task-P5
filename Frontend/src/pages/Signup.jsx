import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "../firebase";

const signupSchema = z
    .object({
        name: z
            .string()
            .trim()
            .refine((v) => v.split(/\s+/).length >= 2, "Enter your full name (first and last name)"),
        email: z.string().trim().email("Enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Passwords do not match",
    });

function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // 1. validate
        const result = signupSchema.safeParse(form);
        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        setLoading(true);
        try {
            const email = result.data.email.toLowerCase();
            const userRef = doc(db, "users", email); // email used as document id

            // 2. check if email already exists
            const existing = await getDoc(userRef);
            if (existing.exists()) {
                setError("An account with this email already exists. Try logging in.");
                setLoading(false);
                return;
            }

            // 3. hash password, then save
            const hashedPassword = await bcrypt.hash(result.data.password, 10);
            await setDoc(userRef, {
                name: result.data.name,
                email,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
            });

            // 4. go to login page
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h3 className="auth-title">Create a DEV@Deakin Account</h3>

                <label>Name*</label>
                <input name="name" type="text" value={form.name} onChange={handleChange} />

                <label>Email*</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} />

                <label>Password*</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} />

                <label>Confirm password*</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />

                {error && <p className="auth-error">{error}</p>}

                <button type="submit" className="auth-btn" disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                </button>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;