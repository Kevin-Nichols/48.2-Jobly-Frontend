import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Alert from "../common/Alert";

/** Form for Logging in.
 * 
 * Displays form and handles updates to state on changes.
 * 
 * On submit calls the login function and redirects to /companies.
 */
const Login = ({login}) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(d => ({...d, [name]: value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await login(formData);

    if (res.success) {
      history.push("/companies");
    } else {
      setErrors(res.errors);
    }
  }

  return (
    <div className="LoginForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">Log In</h3>

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
                      autoComplete="username"
                      required
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
                      autoComplete="current-password"
                      required
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
                <div className="form-group" align="center">
                  <div>
                    Don't have an account yet? <span className="tr-pri-c"><a href="/react-jobly/signup">Sign up</a></span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;