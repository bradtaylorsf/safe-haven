import React from 'react';

const Login = () =>
  (
    <div className = "container">
      <form>
        <div className = "form-group row">
          <label htmlFor = "inputUsername3" className = "col-sm-2 col-form-label">Email</label>
          <div className = "col-sm-10">
            <input
              id = "inputUsername3"
              type = "email"
              className = "form-control"
              placeholder = "Email" />
          </div>
        </div>
        <div className = "form-group row">
          <label htmlFor = "inputPassword3" className = "col-sm-2 col-form-label">Password</label>
          <div className = "col-sm-10">
            <input
              type = "password"
              className = "form-control"
              id = "inputPassword3"
              placeholder = "Password" />
          </div>
        </div>
        <div className = "form-group row">
          <div className = "offset-sm-2 col-sm-10">
            <button type = "submit" className = "btn btn-primary">Sign in</button>
          </div>
        </div>
      </form>
    </div>
);


export default Login;
