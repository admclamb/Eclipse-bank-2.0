import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { createCustomer } from "../../utils/api";
import ErrorAlert from "../errors/ErrorAlert";

const Signup = ({ setUser }) => {
  const initSignupInfo = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: ""
  };

  const [signupInfo, setSignupInfo] = useState(initSignupInfo);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState({});
  const history = useHistory();
  const handleChange = ({ target }) => {
    const { id } = target;
    setSignupInfo({
      ...signupInfo,
      [id]: target.value
    });
  };

  const handleSubmit = async (event) => {
    setSignupError({});
    event.preventDefault();
    if (signupInfo.password !== confirmPassword) {
      setSignupError({ message: "Passwords are not matching" });
      return;
    }
    try {
      const response = await createCustomer({ data: signupInfo });
      setUser(response.data);
      setSignupInfo(initSignupInfo);
      setConfirmPassword("");
      history.push("/createBankAccount");
    } catch (error) {
      setSignupError(error);
    }
  };
  return (
    <div className="login d-flex flex-column align-items-center">
      <h2 className="mt-5">Eclipse Bank</h2>
      <p className="text-muted mb-5">CUSTOMER SIGN UP</p>

      <form className="form row g-3 border p-4" onSubmit={handleSubmit} id="signup-form">
        <div className="col-12">
          <ErrorAlert error={signupError} />
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="username" className="form-label">
                First Name
              </label>
              <input
                className="form-control"
                id="first_name"
                type="text"
                placeholder="First Name"
                value={signupInfo.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="username" className="form-label">
                Last Name
              </label>
              <input
                className="form-control"
                id="last_name"
                placeholder="Last Name"
                type="text"
                value={signupInfo.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-12 mb-3">
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <input
              className="form-control"
              id="email"
              type="email"
              placeholder="yourEmail@example.com"
              value={signupInfo.email}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            className="form-control"
            id="username"
            type="text"
            placeholder="Username"
            value={signupInfo.username}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
            placeholder="Password"
            value={signupInfo.password}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            className="form-control"
            id="confirm_password"
            type="password"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            placeholder="Confirm this password!"
          />
        </div>

        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label">Remember Me</label>
          </div>
        </div>
        <div className="col-12 d-grid gap-2">
          <button className="login btn btn-lg btn-success" form="signup-form">
            Signup
          </button>
        </div>
        <div>
          <span className="text-sm me-2">Have an account?</span>
          <Link to="/login" className="text-sm text-success text-decoration-underline">
            Click here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
