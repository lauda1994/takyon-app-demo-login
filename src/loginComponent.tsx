import React, { ChangeEvent, FormEvent, useState } from "react";

const LoginComponent = () => {
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Aggiungo un ritardo di 2 secondi per permettere di visualizzare il load
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      fetch("https://staging-api.takyon.io/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => {
        //Verifico risposta sia ok(codice 200)che quindi identifica credenziali corrette,se invece da codice 500 setto come credenziali errate stando alle vostre api
        if (response.ok) {
          setLoginSuccess(true);
          setLoginError(false);
        } else {
          setLoginSuccess(false);
          setLoginError(true);
        }
      });
    } catch (error) {
      console.error("Credenziali errate:", error);
      setLoginSuccess(false);
      setLoginError(true);
    }

    setLoading(false);
  };

  const handlePopupClose = () => {
    setLoginSuccess(false);
    setLoginError(false);
  };

  return (
    <div className="container py-4 mb-5">
      {!loading && !loginSuccess && !loginError && (
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div
              className="card cascading-right"
              style={{
                background: "hsla(0, 0%, 100%, 0.55)",
                backdropFilter: "blur(30px)",
              }}
            >
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      name="email"
                      onChange={handleInputChange}
                    />
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      onChange={handleInputChange}
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0">
            <img
              src="https://www.startup-turismo.it/wp-content/uploads/listing-uploads/logo/2022/12/Logo-IG.png"
              className="w-70 rounded-3 shadow-4"
              alt=""
            />
          </div>
        </div>
      )}

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}

      {loginSuccess && (
        <div className="alert alert-success rounded" role="alert">
          Login effettuato con successo!
          <button
            type="button"
            className="btn-close"
            onClick={handlePopupClose}
          ></button>
        </div>
      )}

      {loginError && (
        <div className="alert alert-danger rounded" role="alert">
          Login fallito. Verifica le credenziali e riprova.
          <button
            type="button"
            className="btn-close"
            onClick={handlePopupClose}
          ></button>
        </div>
      )}
    </div>
  );
};

export default LoginComponent;
