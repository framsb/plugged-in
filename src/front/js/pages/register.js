import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/register.css";

export const Register = () => {
  const {actions} = useContext(Context) 
  const [register, setRegister] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    birthdate: ""
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
      birthdate: register.birthdate
    };
    if (await actions.registerUser(data)) {
      history.push("/encontrar-gamers");
    } else {
      alert("El usuario ya existe, intente de nuevo");
    }
  };
 
  return (
    <>
      <section className="h-100 h-custom ">
              <div className="card p-4">
                <div className="card-body p-md-3">
                  <form className="px-md-5">
                    <div className="col-lg-5 mb-4 ">
                          <div
                            className="Container-Input">

                          <input
                            type="text" required
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
                          </div>
                          {errors.username && (
                        <div className="text-danger"><i className="fa-solid fa-delete-left"></i>Username inválido: 5-20 caracteres (letras, numeros y . _), sin . o _ al final o al principio</div>
                      )}
                      
                      <div
                            className="Container-Input mt-4">
                          <input
                            name="email"
                            type="text" required
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
                          </div>
                          {errors.email && (
                          <div className="text-secondary">Correo electrónico inválido</div>
                          )}
                      
                      
                      
                      <div
                            className="Container-Input mt-5">

                          <div className="input-btn">
                          <input
                            name="password" required
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
                          </div>
                          </div>
                          {errors.password && (
                        <div className="text-secondary">
                          Recuerda que tu contraseña debe tener: 8
                          caracteres, 1 letra minúscula, 1 letra mayúscula,
                          1 número y 1 caracter especial.
                        </div>
                      )}
                       
                       <div
                            className="Container-Input mt-5">

                          <div className="input-btn">

                          <input
                            name="confirmPassword" required
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
                      </div>
                          {errors.confirmPassword && (
                        <div className="text-secondary">
                          Contraseña distinta, intente otra vez
                        </div>
                      )}

                      <div className="col-md-6 mb-4">
                        <div className="form-outline datepicker">
                          <label
                            htmlFor="exampleDatepicker1"
                            className="form-label"
                            value={register.date}
                            onChange={datosRegistro}
                          >
                            Fecha de nacimiento
                          </label>
                          <input
                            name="birthdate"
                            type="date"
                            className="form-control"
                            id="exampleDatepicker1"
                            value={register.birthdate}
                            onChange={datosRegistro}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg mb-1"
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
                    >
                      Registrarse
                    </button>
                  </form>
                </div>
              </div>
      </section>
    </>
  );
};
