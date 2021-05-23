import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://quizzard99.herokuapp.com/auth/login",
        {
          email: email,
          password: password,
        }
      );
      setIsLoading(false);
      if (!res.data.token) {
        setError(res.data);
      } else {
        toast("Logged in Successfully", {
          type: "success",
        });
        setAuth(res.data);
        setAuth((prev) => {
          localStorage.setItem("auth", JSON.stringify(prev));
          return prev;
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  return (
    <div className="login--container">
      <div className="login--modal">
        <Link to="/">
          <GrClose className="close--btn" />
        </Link>
        <div className="login--title">
          <h1>YOUR ACCOUNT FOR</h1>
          <h1>
            EVERYTHING <span style={{ color: "#ef4444" }}>QUIZZARD</span>
          </h1>
        </div>
        <div className="login--input">
          <input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleSignIn} className="login--btn">
          {isLoading ? (
            <CircularProgress
              style={{ width: "1rem", height: "1rem", color: "#fff" }}
            />
          ) : (
            "Sign In"
          )}
        </button>
        <Link className="link" to="/join">
          <p className="signup">Sign Up</p>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
