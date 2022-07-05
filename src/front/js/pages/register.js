import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/register.css";
import ReactTooltip from "react-tooltip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import fondoRegistro from "../../img/Fondo-Registro.jpg";

export const Register = () => {
  const { actions } = useContext(Context);
  const [register, setRegister] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    birthdate: "",
  });

  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // condiciones para el submit
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    birthdate: false,
  });

  let usernamergx = /^(?=[a-zA-Z0-9._]{5,20}$)[^_.].*[^_.]$/;
  let emailrgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; //

  const datosRegistro = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    let data = {
      username: register.username,
      email: register.email,
      password: register.password,
      birthdate: register.birthdate,
    };
    if (await actions.registerUser(data)) {
      history.push("/encontrar-gamers");
    } else {
      alert("El usuario ya existe, intente de nuevo");
    }
  };

  return (
    <>
      <section className="h-100 h-custom register-container d-flex">
        <div className="card p-4">
          <p className="registro-titulo">Información de Registro</p>
          <div className="card-body"></div>
          <form className="px-md-5">
            <div className="col-lg-12 mb-4 ">
              <div className="Container-Input">
                <input
                  type="text"
                  required
                  name="username"
                  value={register.username}
                  onChange={datosRegistro}
                  onBlur={(e) => {
                    if (usernamergx.test(register.username)) {
                      setErrors({ ...errors, username: false });
                    } else {
                      setErrors({ ...errors, username: true });
                    }
                  }}
                />
                <label>Username</label>
                {errors.username && (
                  <span data-tip data-for="Tooltip1" className="FloatIcon btn">
                    <i className="fa-solid fa-delete-left"></i>
                    <ReactTooltip
                      id="Tooltip1"
                      place="top"
                      textColor="white"
                      backgroundColor="black"
                    >
                      Inválido: 5-20 caracteres (letras, numeros y . _), sin . o
                      _ al final o al principio
                    </ReactTooltip>{" "}
                  </span>
                )}
              </div>

              <div className="Container-Input mt-5">
                <input
                  name="email"
                  type="text"
                  required
                  value={register.email}
                  onChange={datosRegistro}
                  onBlur={(e) => {
                    if (emailrgx.test(register.email)) {
                      setErrors({ ...errors, email: false });
                    } else {
                      setErrors({ ...errors, email: true });
                    }
                  }}
                />
                <label>Email</label>
                {errors.email && (
                  <span data-tip data-for="Tooltip2" className="FloatIcon btn">
                    <i className="fa-solid fa-delete-left"></i>
                    <ReactTooltip
                      id="Tooltip2"
                      place="top"
                      textColor="white"
                      backgroundColor="black"
                    >
                      Correo electrónico inválido
                    </ReactTooltip>{" "}
                  </span>
                )}
              </div>

              <div className="Container-Input mt-5">
                <div className="input-btn">
                  <input
                    name="password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={register.password}
                    onChange={datosRegistro}
                    onBlur={(e) => {
                      if (passwordregex.test(register.password)) {
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
                      data-for="Tooltip3"
                      className="FloatIcon btn"
                    >
                      <i className="fa-solid fa-delete-left"></i>
                      <ReactTooltip
                        id="Tooltip3"
                        place="top"
                        textColor="white"
                        backgroundColor="black"
                      >
                        Tu contraseña debe tener: 8 caracteres, 1 letra
                        minúscula, 1 letra mayúscula, 1 número y 1 caracter
                        especial.
                      </ReactTooltip>{" "}
                    </span>
                  )}
                </div>
              </div>

              <div className="Container-Input mt-5">
                <div className="input-btn">
                  <input
                    name="confirmPassword"
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    value={register.confirmPassword}
                    onChange={datosRegistro}
                    onBlur={(e) => {
                      if (register.confirmPassword !== register.password) {
                        setErrors({ ...errors, confirmPassword: true });
                      } else {
                        setErrors({ ...errors, confirmPassword: false });
                      }
                    }}
                  />

                  <button
                    className={
                      showConfirmPassword
                        ? "fa fa-eye-slash password-icon btn btn-password btn-outline-dark"
                        : "fa fa-eye password-icon btn btn-outline-dark"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                  ></button>
                  <label>Repetir Contraseña</label>
                </div>
                {errors.confirmPassword && (
                  <span data-tip data-for="Tooltip4" className="FloatIcon btn">
                    <i className="fa-solid fa-delete-left"></i>
                    <ReactTooltip
                      id="Tooltip4"
                      place="top"
                      textColor="white"
                      backgroundColor="black"
                    >
                      Contraseña distinta, intente otra vez
                    </ReactTooltip>{" "}
                  </span>
                )}
              </div>

              <div className="col-md-9 mb-2">
                <div className="Container-Input mt-5">
                  <span>Fecha de nacimiento </span>
                  <input
                    name="birthdate"
                    type="date"
                    value={register.birthdate}
                    onChange={datosRegistro}
                  />
                </div>
              </div>
            </div>
            <Button
              type="button"
              className="btn btn-primary btn-lg mt-3 mb-1"
              onClick={handleSubmit}
              disabled={
                errors.email ||
                errors.password ||
                errors.confirmPassword ||
                !register.username.length > 0 ||
                !register.email.length > 0 ||
                !register.password.length > 0 ||
                !register.confirmPassword.length > 0
              }
              variant="contained"
              size="large"
            >
              Registrarse
            </Button>
            <Link to="/iniciar-sesion">
              <div className="redirect-link">
                Ya creaste tu cuenta? Inicia sesión aquí
              </div>
            </Link>
          </form>
        </div>
        <div className="register-photo">
          <img src={fondoRegistro} alt="Sample photo" className="img-fluid" />
        </div>
        {localStorage.getItem("token") != undefined && (
          <Redirect to={"/encontrar-gamers"}></Redirect>
        )}
      </section>
    </>
  );
};
