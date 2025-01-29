import React, { useEffect, useState } from "react";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const LoginSignUp = () => {
  const notify = () => toast(message);
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [message, setMessage] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (message) {
      notify(message);
    } 
  }, [message]);
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

  const HandleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:44365/api/user/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: loginData.username,
          Password: loginData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login Successful", data);
        setMessage(data.Message)
        localStorage.setItem("UserInfo", JSON.stringify(response.Data));
      } else {
        console.error("Login Failed", response.status);
        setMessage(response.Message)
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="loginSignUpSection">
        <div>
          <ToastContainer />
        </div>
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
                <form onSubmit={HandleLogin}>
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
                  <button onClick={HandleLogin}>Log In</button>
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
