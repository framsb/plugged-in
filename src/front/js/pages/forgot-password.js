import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import fondoLogin from "../../img/Fondo-Login.jpg";

export const ForgotPassword = () => {
  const { actions } = useContext(Context);
  const [newPasswordEmail, setNewPasswordEmail] = useState({
    email: "",
  });

  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);

  let emailrgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; //

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const datosLogin = (e) => {
    setNewPasswordEmail({
      ...newPasswordEmail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    let data = {
      email: newPasswordEmail.email,
    };
    if (await actions.loginUser(data)) {
      history.push("/encontrar-gamers");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      <section className="h-100 h-custom login-container d-flex">
        <div className="card p-4">
          <p className="registro-titulo">Recuperar Contraseña</p>
          <div className="card-body"></div>
          <form className="px-md-5">
            <div className="col-lg-12 mb-4 ">
              <div className="Container-Input mt-5">
                <input
                  name="email"
                  type="text"
                  required
                  value={newPasswordEmail.email}
                  onChange={datosLogin}
                  onBlur={(e) => {
                    if (emailrgx.test(newPasswordEmail.email)) {
                      setErrors({ ...errors, email: false });
                    } else {
                      setErrors({ ...errors, email: true });
                    }
                  }}
                />
                <label>Email</label>
              </div>
              {errors.email && (
                <div className="text-secondary">
                  Correo electrónico inválido
                </div>
              )}
            </div>
            <Button
              type="button"
              className="mt-3 mb-1"
              onClick={handleSubmit}
              disabled={errors.email || !newPasswordEmail.email.length > 0}
              variant="contained"
              size="large"
            >
              Submit
            </Button>
          </form>
        </div>
        <div className="register-photo">
          <img src={fondoLogin} alt="Sample photo" className="img-fluid" />
        </div>
        {localStorage.getItem("token") != undefined && (
          <Redirect to={"/encontrar-gamers"}></Redirect>
        )}
      </section>
    </>
  );
};
