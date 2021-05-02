import React from "react";
import LoginForm  from "../templates/LoginForm";

function LoginPage() {

  const lineStyle = {
    border: "1px solid black",
  };

  return (
    <div className="container is-centered">
      <div className="column is-5 is-offset-4">
        <div className="box mt-2">
          <div className="column is-12">
            <h5 className="title is-4 has-text-black has-text-centered">
              COIN TRANSACTION
            </h5>
            <h5 className="title is-5 has-text-black mt-5 mb-0 has-text-centered">
              Login
            </h5>
            <hr className="login-hr" style={lineStyle} />
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
