import React, { useEffect, useState } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Slide, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginSignUp = ({ setUserInfo }) => {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("tabButton1");
  const storedData = sessionStorage.getItem("UserInfo");
  const parsedData = storedData ? JSON.parse(storedData) : null;
  const isLoggedIn = parsedData && parsedData.UserId;

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    fullName: "",
    username: "",
    password: "",
    phoneNo: "",
    email: "",
    postalCode: "",
    state: "",
    city: "",
    address: "",
  });

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (message === "Login Successfull" || message === "SignUp Successfull") {
  //     notifySuccess(message);
  //   }
  //   else{
  //     notifyError(message)
  //   }
  // }, [message]);

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:44336/api/user/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: loginData.username,
          Password: loginData.password,
        }),
      });

      let data;
      if (response.ok) {
        data = await response.json();
        if (data.Message === "Login Success") {
          notifySuccess(data.Message);
        }
        if (data && data.Data) {
          sessionStorage.setItem("UserInfo", JSON.stringify(data.Data));
          setUserInfo(data.Data);
        } else {
          alert("Invalid response from server");
        }
        if (data.Message === "Login Success") {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          notifyError(data.Message);
        }
      } else {
        data = await response.json();
        notifyError(data.Message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:44336/api/user/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      if (response.ok) {
        const data = await response.json();
        notifySuccess(data.Message);
        if (data.Message === "SignUp Success") {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
        }
      } else {
        notifyError(response.Message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("UserInfo");
    window.location.reload();
  };

  return (
    <>
      <div className="loginSignUpSection">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <div className="loginSignUpContainer">
          {isLoggedIn ? (
            <div className="loginSignUpTabsContentRegister">
              <div className="profileSection">
                <div className="profile-heading" style={{ marginBottom: "20px" }}>
                  <h2>Profile</h2>
                </div>
                <form>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      value={parsedData.FullName}
                      disabled
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      value={parsedData.UserName}
                      disabled
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={parsedData.Email}
                      disabled
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNo">Phone Number</label>
                    <input
                      type="text"
                      id="phoneNo"
                      value={parsedData.PhoneNo}
                      disabled
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      value={parsedData.State}
                      disabled
                      placeholder="State"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      value={parsedData.City}
                      disabled
                      placeholder="City"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      value={parsedData.Address}
                      disabled
                      placeholder="Address"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      value={parsedData.Postalcode}
                      disabled
                      placeholder="Postal Code"
                    />
                  </div>
                  <div className="profile-actions">
                    <button type="button" onClick={handleLogout}>
                      Sign Out
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <>
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
                      <button type="submit">Log In</button>
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

                {activeTab === "tabButton2" && (
                  <div className="loginSignUpTabsContentRegister">
                    <form onSubmit={handleSignUp}>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={signUpData.fullName}
                        name="fullName"
                        placeholder="Full Name *"
                        required
                      />
                      <input
                        type="text"
                        onChange={handleChange}
                        value={signUpData.username}
                        name="username"
                        placeholder="Username *"
                        required
                      />
                      <input
                        type="password"
                        onChange={handleChange}
                        value={signUpData.password}
                        name="password"
                        placeholder="Password *"
                        required
                      />
                      <input
                        type="email"
                        onChange={handleChange}
                        value={signUpData.email}
                        name="email"
                        placeholder="Email address *"
                        required
                      />
                      <input
                        type="number"
                        onChange={handleChange}
                        value={signUpData.phoneNo}
                        name="phoneNo"
                        placeholder="Phone No *"
                        required
                      />
                      <input
                        type="text"
                        onChange={handleChange}
                        value={signUpData.state}
                        name="state"
                        placeholder="State *"
                        required
                      />
                      <input
                        type="number"
                        onChange={handleChange}
                        value={signUpData.postalCode}
                        name="postalCode"
                        placeholder="Postal Code *"
                        required
                      />
                      <input
                        type="text"
                        onChange={handleChange}
                        value={signUpData.city}
                        name="city"
                        placeholder="City *"
                        required
                      />
                      <input
                        type="text"
                        onChange={handleChange}
                        value={signUpData.address}
                        name="address"
                        placeholder="Address *"
                        required
                      />
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
                      <button type="submit">Register</button>
                    </form>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
