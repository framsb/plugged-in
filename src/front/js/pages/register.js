import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/register.css";

export const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    birthdate: ""
  });

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


  return (
    <>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-200">
            <div className="col-lg-10 col-xl-10">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-left">
                    Información de Registro
                  </h3>

                  <form className="px-md-2">
                    <div className="col-lg-8 mb-4">
                      <div className="row">
                        <div className="col-9 form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form3Example1q"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            id="form3Example1q"
                            name="username"
                            value={register.username}
                            onChange={datosRegistro}
                            className="form-control"
                            onBlur={(e) => {
                              if (usernamergx.test(register.username)) {
                                setErrors({ ...errors, username: false });
                              } else {
                                setErrors({ ...errors, username: true });
                              }
                            }}
                          />
                          {errors.username && (
                        <div className="text-secondary">Username inválido: 5-20 caracteres (letras, numeros y . _), sin . o _ al final o al principio </div>
                      )}
                        </div>
                        <div className="col-9 form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form3Example2q"
                          >
                            Email
                          </label>
                          <input
                            name="email"
                            type="text"
                            value={register.email}
                            onChange={datosRegistro}
                            id="form3Example2q"
                            className="form-control"
                            onBlur={(e) => {
                              if (emailrgx.test(register.email)) {
                                setErrors({ ...errors, email: false });
                              } else {
                                setErrors({ ...errors, email: true });
                              }
                            }}
                          />
                          {errors.email && (
                          <div className="text-secondary">Correo electrónico inválido</div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-9 form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form3Example3q"
                          >
                            Contraseña
                          </label>
                          <div className="input-btn">
                          <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            id="form3Example3q"
                            className="form-control"
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
                          </div>
                          {errors.password && (
                        <div className="text-secondary">
                          Recuerda que tu contraseña debe tener: 8
                          caracteres, 1 letra minúscula, 1 letra mayúscula,
                          1 número y 1 caracter especial.
                        </div>
                      )}
                        </div>
                        <div className="col-md-9 form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form3Example4q"
                          >
                            Repetir Contraseña
                          </label>
                          <div className="input-btn">

                          <input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            id="form3Example4q"
                            className="form-control"
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
                          </div>
                          {errors.confirmPassword && (
                        <div className="text-secondary">
                          Contraseña distinta, intente otra vez
                        </div>
                      )}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline datepicker">
                          <label
                            htmlFor="exampleDatepicker1"
                            className="form-label"
                            value={register.birthdate}
                            onChange={datosRegistro}
                          >
                            Fecha de nacimiento
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="exampleDatepicker1"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg mb-1"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
