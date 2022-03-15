import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Eclipse
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggle">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggle">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/accounts" className="nav-link">
                Accounts
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/transactions" className="nav-link">
                Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/benefits" className="nav-link">
                Benefits
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className="nav-link">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
