import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import fondoLogin from "../../img/Fondo-Login.jpg";

import ReactTooltip from "react-tooltip";

export const LogIn = () => {
  const { actions } = useContext(Context);
  const [login, setLogin] = useState({
    email: "",
    password: "",
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
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    let data = {
      email: login.email,
      password: login.password,
    };
    if (await actions.loginUser(data)) {
      history.push("/tu-perfil");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      <section className="h-100 h-custom login-container d-flex">
        <div className="card p-4">
          <p className="registro-titulo">Inicia Sesión!</p>
          <div className="card-body"></div>
          <form className="px-md-5">
            <div className="col-lg-12 mb-4 ">
              <div className="Container-Input mt-5">
                <input
                  name="email"
                  type="text"
                  required
                  value={login.email}
                  onChange={datosLogin}
                  onBlur={(e) => {
                    if (emailrgx.test(login.email)) {
                      setErrors({ ...errors, email: false });
                    } else {
                      setErrors({ ...errors, email: true });
                    }
                  }}
                />
                <label>Email</label>
                {errors.email && (
                  <span
                    data-tip
                    data-for="Tooltip1"
                    className="FloatIcon btn float"
                  >
                    <i className="fa-solid fa-delete-left"></i>
                    <ReactTooltip
                      id="Tooltip1"
                      place="top"
                      textColor="white"
                      backgroundColor="black"
                    >
                      Correo electrónico inválido
                    </ReactTooltip>
                  </span>
                )}
              </div>

              <div className="Container-Input mt-5">
                <div className="input-btn">
                  <input
                    name="password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={login.password}
                    onChange={datosLogin}
                    onBlur={(e) => {
                      if (passwordregex.test(login.password)) {
                        setErrors({ ...errors, password: false });
                      } else {
                        setErrors({ ...errors, password: true });
                      }
                    }}
                  />
                  <button
                    className={
                      showPassword
                        ? "fa fa-eye-slash password-icon btn btn-password btn-outline-dark"
                        : "fa fa-eye password-icon btn btn-outline-dark"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                  ></button>
                  <label>Contraseña</label>
                  {errors.password && (
                    <span
                      data-tip
                      data-for="Tooltip1"
                      className="FloatIcon btn float"
                    >
                      <i className="fa-solid fa-delete-left"></i>
                      <ReactTooltip
                        id="Tooltip1"
                        place="top"
                        textColor="white"
                        backgroundColor="black"
                      >
                        Recuerda que tu contraseña debe tener: 8 caracteres, 1
                        letra minúscula, 1 letra mayúscula, 1 número y 1
                        caracter especial.
                      </ReactTooltip>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Button
              type="button"
              className="mt-3 mb-1"
              onClick={handleSubmit}
              disabled={
                errors.email ||
                errors.password ||
                !login.email.length > 0 ||
                !login.password.length > 0
              }
              variant="contained"
              size="large"
            >
              Iniciar Sesión
            </Button>
              <Link to="/registrarse">
                <div className="redirect-link">
                  No tienes cuenta todavía? Crea una aquí
                </div>
              </Link>

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
