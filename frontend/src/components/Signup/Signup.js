import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="login d-flex flex-column align-items-center">
      <h2 className="mt-5">Eclipse Bank</h2>
      <p className="text-muted mb-5">CUSTOMER SIGN UP</p>
      <form className="form row g-3 border p-4">
        <div className="col-12">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input className="form-control" id="username" type="text" />
        </div>
        <div className="col-12">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input className="form-control" id="password" type="password" />
        </div>

        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label">Remember Me</label>
          </div>
        </div>
        <div className="col-12 d-grid gap-2">
          <button className="login btn btn-lg btn-success">Login</button>
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
