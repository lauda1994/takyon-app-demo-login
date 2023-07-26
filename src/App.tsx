import React from "react";
import LoginComponent from "./loginComponent";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-light" style={{backgroundColor:"#3a38c4"}}>
          <img
          style={{borderRadius:"50px"}}
            src="https://www.startup-turismo.it/wp-content/uploads/listing-uploads/logo/2022/12/Logo-IG.png"
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt=""
          />
      </nav>
      <LoginComponent></LoginComponent>
    </div>
  );
}

export default App;
