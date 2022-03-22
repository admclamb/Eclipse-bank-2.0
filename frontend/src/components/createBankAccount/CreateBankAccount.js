import { useState } from "react";
import { Link } from "react-router-dom";
const CreateBankAccount = () => {
  const [accountName, setAccountName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  console.log(accountName);
  return (
    <div className="login d-flex flex-column align-items-center">
      <h2 className="mt-5">Eclipse Bank</h2>
      <p className="text-muted mb-5">BANK ACCOUNT CREATION</p>
      <form className="form row g-3 border p-4" onSubmit={handleSubmit} id="login-form">
        <div className="col-12">
          <label htmlFor="username" className="form-label">
            Name of bank account
          </label>
          <input
            className="form-control"
            id="username"
            type="text"
            value={accountName}
            onChange={({ target }) => setAccountName(target.value)}
          />
        </div>

        <div className="col-12 d-grid gap-2">
          <button
            className="login btn btn-lg btn-success"
            type="submit"
            form="login-form"
            value="Submit">
            Create Account
          </button>
        </div>
        <div>
          <span className="text-sm me-2">Don&apos;t want to create an account?</span>
          <Link to="/" className="text-sm text-success text-decoration-underline">
            Click here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateBankAccount;
