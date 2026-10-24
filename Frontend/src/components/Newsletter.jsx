import { useState } from "react";

function Newsletter() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault(); // stops page from refreshing

        // check if email is empty
        if (email === "") {
            setIsError(true);
            setMessage("Please enter your email");
            return;
        }

        try {
            // send email to the backend
            const response = await fetch("http://localhost:5000/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email }),
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
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>

            {message && (
                <p style={{ color: isError ? "red" : "green" }}>{message}</p>
            )}
        </form>
    );
}

export default Newsletter;