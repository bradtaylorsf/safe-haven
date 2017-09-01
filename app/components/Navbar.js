import React from 'react';

const Navbar = () =>
  (
    <nav className = "navbar navbar-toggleable-md navbar-light bg-faded">
      <button
        className = "navbar-toggler navbar-toggler-right"
        type = "button"
        data-toggle = "collapse"
        data-target = "#navbarNavAltMarkup"
        aria-controls = "navbarNavAltMarkup"
        aria-expanded = "false"
        aria-label = "Toggle navigation">
        <span className = "navbar-toggler-icon" />
      </button>
      <a className = "navbar-brand" href = "/home">Home</a>
      <div className = "collapse navbar-collapse" id = "navbarNavAltMarkup">
        <div className = "navbar-nav">
          <a className = "nav-item nav-link active" href = "/login">Login</a>
          <a className = "nav-item nav-link active" href = "/profile">Profile</a>
          <a className = "nav-item nav-link active" href = "/register">Register</a>
          <a className = "nav-item nav-link active" href = "/logout">Logout</a>
          <a className = "nav-item nav-link active" href = "/shelter">Shelters List</a>
          {/* <a className = "nav-item nav-link active" href = "/shelter/some-shelter">
            One Shelter
          </a>
          <a className = "nav-item nav-link active" href = "/shelter/some-shelter/edit">
            Edit Shelter
          </a>
          <a className = "nav-item nav-link active" href = "/shelter/submit">
          Submit New Shelter</a> */}
        </div>
      </div>
    </nav>
  );


export default Navbar;
