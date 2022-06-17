import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/register.css";

export const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    email: "",
    date: ""
  });

  let usernamergx = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
  let emailrgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let usernameregex = /^(?=[a-zA-Z0-9]{8,20}$)$/;

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
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-center">
                    Registration Info
                  </h3>

                  <form className="px-md-2">
                    <div className="col-lg-8 mb-4">
                      <div className="row">
                        <div className="col-md-6 form-outline mb-4">
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
                          />
                        </div>
                        <div className="col-md-6 form-outline mb-4">
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
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form3Example3q"
                          >
                            Contraseña
                          </label>
                          <input
                            name="password"
                            type="password"
                            id="form3Example3q"
                            className="form-control"
                            value={register.password}
                            onChange={datosRegistro}
                          />
                        </div>
                        <div className="col-md-6 form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form3Example4q"
                          >
                            Repetir Contraseña
                          </label>
                          <input
                            type="password"
                            id="form3Example4q"
                            className="form-control"
                            value={register.confirmpassword}
                            onChange={datosRegistro}
                          />
                        </div>
                      </div>
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
                            type="date"
                            className="form-control"
                            id="exampleDatepicker1"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <select className="select">
                          <option value="1" disabled>
                            Region (falta api)
                          </option>
                          <option value="2">Vzla</option>
                          <option value="3">USA</option>
                          <option value="4">España</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <select className="select">
                        <option value="1" disabled>
                          Juegos Favoritos
                        </option>
                        <option value="2">Call of Duty</option>
                        <option value="3">Fortnite</option>
                        <option value="4">Counter Strike</option>
                        <option value="5">FIFA</option>
                      </select>
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
