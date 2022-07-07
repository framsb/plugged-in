import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import fondoLogin from "../../img/Fondo-Login.jpg";

export const ResetPassword = () => {
  const { actions } = useContext(Context);
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: ""
  });

  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; //

  const [errors, setErrors] = useState({
      password: false,
      confirmPassword: false,
  });

  const datosLogin = (e) => {
    setNewPassword({
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
                <div className="input-btn">
                  <input
                    name="password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={newPassword.password}
                    onChange={datosLogin}
                    placeholder='Contraseña'
                    onBlur={(e) => {
                      if (passwordregex.test(newPassword.password)) {
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
                <div className="Container-Input mt-5">
                  <div className="input-btn">
                    <input
                      name="confirmPassword"
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      value={newPassword.confirmPassword}
                      onChange={datosLogin}
                      onBlur={(e) => {
                        if (newPassword.confirmPassword !== newPassword.password) {
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
                {errors.password && (
                  <div className="text-secondary">
                    Recuerda que tu contraseña debe tener: 8 caracteres, 1 letra
                    minúscula, 1 letra mayúscula, 1 número y 1 caracter
                    especial.
                  </div>
                )}
              </div>
            </div>
            <Button
              type="button"
              className="mt-3"
              onClick={handleSubmit}
              disabled={
                errors.confirmPassword ||
                errors.password ||
                !newPassword.confirmPassword.length > 0 ||
                !newPassword.password.length > 0
              }
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
