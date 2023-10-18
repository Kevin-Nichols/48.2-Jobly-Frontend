import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

/** Form for signing up.
 * 
 * Displays form and handles updates to state on changes.
 * 
 * On submit calls the signup function and redirects to /companies.
 */
const Signup = ({signup}) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(d => ({...d, [name]: value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await signup(formData);

    if (res.success) {
      history.push("/companies");
    } else {
      setErrors(res.errors);
    }
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>First name</label>
                <input
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                />
              </div>

              {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null
              }

              <button
                  type="submit"
                  className="btn btn-primary float-right"
                  onSubmit={handleSubmit}
              >
                Submit
              </button>
              <div className="form-group" align="center">
                <div>
                Already have an account? <span><a href="/react-jobly/login">Log in</a></span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;