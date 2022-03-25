import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { readCustomer } from "../../utils/api";

const Login = ({ user, setUser }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState({});
  const handleChange = ({ target }) => {
    const { id } = target;
    id === "username" ? setUsername(target.value) : setPassword(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await readCustomer({ data: { username, password } });
      setUser(response.data);
      history.push("/");
    } catch (error) {
      setLoginError(error);
    }
    setUsername("");
    setPassword("");
    return;
  };
  return (
    <div className="login d-flex flex-column align-items-center">
      <h2 className="mt-5">Eclipse Bank</h2>
      <p className="text-muted mb-5">CUSTOMER LOG IN</p>
      <form className="form row g-3 border p-4" onSubmit={handleSubmit} id="login-form">
        <div className="col-12">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            className="form-control"
            id="username"
            type="text"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label">Remember Me</label>
          </div>
        </div>
        <div className="col-12 d-grid gap-2">
          <button
            className="login btn btn-lg btn-success"
            type="submit"
            form="login-form"
            value="Submit">
            Login
          </button>
        </div>
        <div>
          <span className="text-sm me-2">Don&apos;t have an account?</span>
          <Link to="/signup" className="text-sm text-success text-decoration-underline">
            Click here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
