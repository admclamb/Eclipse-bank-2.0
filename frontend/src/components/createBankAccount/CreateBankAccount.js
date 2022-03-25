import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { createBankAccount } from "../../utils/api";
const CreateBankAccount = ({ user }) => {
  console.log(user);
  const [account_name, setAccount_name] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await createBankAccount({
        account_name,
        customer_ID: user.customer_ID,
        balance: 0
      });
      console.log("bank account", response);
    } catch (error) {
      console.log(error);
    }
    history.push("/");
  };
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
            value={account_name}
            onChange={({ target }) => setAccount_name(target.value)}
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
