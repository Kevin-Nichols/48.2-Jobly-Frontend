import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../auth/Login";
import ProfileForm from "../profiles/Profiles";
import SignupForm from "../auth/Signup";
import ProtectedRoute from "./ProtectedRoute";

//All site routes.

const Routes = ({login, signup}) => {
  return (
    <div className="pt-5">
      <Switch>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <PrivateRoute exact path="/companies">
          <CompanyList />
        </PrivateRoute>

        <PrivateRoute exact path="/jobs">
          <JobList />
        </PrivateRoute>

        <PrivateRoute exact path="/companies/:handle">
          <CompanyDetail />
        </PrivateRoute>

        <ProtectedRoute path="/profile">
          <ProfileForm />
        </ProtectedRoute>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;