import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { useAuth } from "../../contexts/authContext";

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();



  async function handleSignUp() {
    try {
      setIsLoading(true);
      const res = await axios.post("https://quizzard99.herokuapp.com/auth/register", {
        name: name,
        email: email,
        password: password,
      });
      setIsLoading(false);
      if (!res.data.user) {
        setError(res.data);
      } else {
        toast("Signed Up Successfully", {
          type: "success",
        });
        setAuth(res.data);
        setAuth((prev) => {
          localStorage.setItem("auth", JSON.stringify(prev));
          return prev;
        });
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
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
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
        <button className="login--btn" onClick={handleSignUp}>
        {isLoading ? (
            <CircularProgress
              style={{ width: "1rem", height: "1rem", color: "#fff" }}
            />
          ) : (
            "Sign Up"
          )}
        </button>
        <Link className="link" to="/login">
          <p className="signup">Sign In</p>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
