import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";


export const Perfil = () => {
  const { store, actions } = useContext(Context);

  const history = useHistory();

  useEffect(() => {
    actions.privateData();
  }, []);

  return (
    <>
      <div className="titulo-principal">Tu Perfil!</div>
      <div className="perfil row">
        <div className="img-username col-6">
          <div className="image">
            <img src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png" />
          </div>
          <div className="username">Username</div>
        </div>
        <div className="descripcion-usuario col-6 text-center">
          <div className="titulo-descripcion">Username</div>
          <div className="titulo-descripcion">Descripcion</div>
          <div className="titulo-descripcion">Juegos Favoritos</div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Escoge tus juegos favoritos...
                  </button>
                  <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                  >
                  {store.games &&
                    store.games.map((games) => {
                    return (
                      <li>
                        <p className="dropdown-item" href="#">
                        {games.name}
                        </p>
                      </li>
                  );
                  })}
                  </ul>
                </div>
          <div className="titulo-descripcion">Region</div>
        </div>
      </div>
    </>
  );
};
