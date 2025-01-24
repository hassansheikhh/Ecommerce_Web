import React, { useState } from "react";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch("http://192.168.16.12:8099/api/user/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login Successful", data);
        // Handle successful login, e.g., redirect or save user info
      } else {
        console.error("Login Failed", response.status);
        // Handle login error
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {/* Login Tab */}
            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Username *"
                    name="username"
                    onChange={handleChange}
                    value={loginData.username}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password *"
                    name="password"
                    onChange={handleChange}
                    value={loginData.password}
                    required
                  />
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                    <p>
                      <Link to="/resetPassword">Lost password?</Link>
                    </p>
                  </div>
                  <button onClick={handleLogin}>Log In</button>
                </form>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet?{" "}
                    <span onClick={() => handleTab("tabButton2")}>
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Register Tab */}
            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                <form>
                  <input type="text" placeholder="Username *" required />
                  <input type="password" placeholder="Password *" required />
                  <input type="email" placeholder="Email address *" required />
                  <input type="number" placeholder="Phone No *" required />
                  <input type="text" placeholder="State *" required />
                  <input type="number" placeholder="Postal Code *" required />
                  <input type="text" placeholder="City *" required />
                  <input type="text" placeholder="Address *" required />
                  <p>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our
                    <Link
                      to="/terms"
                      style={{ textDecoration: "none", color: "#c32929" }}
                    >
                      {" "}
                      privacy policy
                    </Link>
                    .
                  </p>
                  <button>Register</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
