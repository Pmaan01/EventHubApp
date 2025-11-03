import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import AuthContainer from "../components/AuthContainer";
import AuthHeader from "../components/AuthHeader";
import IconInput from "../components/IconInput";
import LoadingButton from "../components/LoadingButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      navigate("/home");
    } catch (err) {
      const msg =
        err.code === "auth/wrong-password"
          ? "Wrong password"
          : err.code === "auth/user-not-found"
          ? "No account with this email"
          : "Failed to login";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <form onSubmit={handleLogin} className="space-y-6">
        <AuthHeader
          logoSrc={logo}
          title="Welcome Back"
          subtitle="Sign in to continue to EventHub"
        />

        <div className="space-y-5">
          <IconInput
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            placeholder="you@example.com"
            autoComplete="username"
            leftIcon={
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            }
          />

          <IconInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            autoComplete="current-password"
            leftIcon={
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            }
          />
        </div>

        <LoadingButton type="submit" loading={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </LoadingButton>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
          </div>
        </div>

        <Link
          to="/signup"
          className="block text-center py-3 rounded-xl border-2 border-indigo-200 text-indigo-600 font-semibold hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Create Account
        </Link>
      </form>
    </AuthContainer>
  );
}