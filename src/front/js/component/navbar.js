import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const history = useHistory();


  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/">
          <span className="navbar navbar-logo mb-0">Plugged-in</span>
        </Link>
        {store.isLoggedIn ? (
          <>
            <div className="ml-auto">
              <Link to="/encontrar-gamers">
                <button className="btn btn-link btn-primary">
                  Encontrar Gamers
                </button>
              </Link>
              <Link to="/tu-perfil">
                <button className="btn btn-link btn-primary">
                  Tu Perfil
                </button>
              </Link>
              <Link to="/">
                <button
                  onClick={(e) => {
                    actions.logOutUser();
                    history.push("/iniciar-sesion");
                  }}
                  className="btn btn-link btn-primary"
                >
                  Cerrar Sesión
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="ml-auto">
              <Link to="/registrarse">
                <button className="btn btn-link btn-primary">
                  Registrarse
                </button>
              </Link>
              <Link to="/iniciar-sesion">
                <button className="btn btn-link btn-primary login-button">
                  Iniciar Sesión
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
