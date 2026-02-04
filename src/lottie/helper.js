const handleLoginError = (error) => {
    switch (error.code) {
        case "auth/invalid-credential":
            return "Invalid email or password.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/invalid-email":
            return "Invalid email address.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet.";

        default:
            console.error("Unhandled Firebase error:", error.code);
            return "Login failed. Please try again.";
    }
};

const handleRegisterError = (error) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "This email is already registered. Please login.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/weak-password":
            return "Password must be at least 6 characters.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        default:
            console.error("Unhandled register error:", error.code);
            return "Registration failed. Please try again.";
    }
};


export { handleLoginError, handleRegisterError };