import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/encontrarGamers.css";

export const EncontrarGamers = (props) => {
  const { actions } = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    actions.privateData();
  }, []);

  return (
    <div className="encontrar-gamers">
      <div className="titulo-principal">
        Bienvenido a Plugged-In!
        <button
          onClick={(e) => {
            actions.logOutUser();
            history.push("/iniciar-sesion");
          }}
          className="btn btn-link btn-primary login-button"
        >
          Cerrar Sesión
        </button>
      </div>
      <div className="publicar-anuncio">
        <div className="form-group shadow-textarea">
          <label
            htmlfor="exampleFormControlTextarea6"
            className="titulo-textarea mb-3"
          >
            Publica tu anuncio
          </label>
          <div className="info-user d-flex">
            <p>Escoge el juego que deseas jugar:</p>
            <div class="dropdown">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Juegos Favoritos
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className="info-user d-flex">
              <p>Escoge tu región actual:</p>
            <div class="dropdown">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Regiones
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
              </div>
            </div>
          </div>
          <textarea
              className="form-control cuerpo-textarea z-depth-1 mt-2"
              id="exampleFormControlTextarea6"
              rows="4"
              placeholder="Agrega una descripción corta de tu anuncio..."
          ></textarea>
          <p className="mt-3">Formas de Contacto:</p>
          <textarea
              className="form-control cuerpo-textarea z-depth-1 mt-2 w-50"
              id="exampleFormControlTextarea6"
              rows="3"
              placeholder="Agrega tus plataformas favoritas en la que los jugadores te pueden contactar..."
          ></textarea>
          <button
              type="button"
              className="btn btn-publicar btn-primary btn-lg mt-5"
          >
              Publicar
            </button>
        </div>
      </div>
      <div className="anuncios-publicados">
          <label
            className="titulo-textarea mb-3"
          >
            Anuncios Publicados
          </label>
          <div className="user-anuncio">
            <div className="info-anuncio">
              <span>.User. y foto</span>
              <span>.Juegos.</span>
              <span>.Regiones.</span>
            </div>
            <div className="d-flex">
              <div className="cuerpo-anuncio">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper placerat nisl a ultricies. Quisque sed velit eu eros finibus vehicula vel eget eros. Nullam ac neque in felis rhoncus tristique eu non ipsum. Duis tempor viverra maximus.
              </div>
              <div></div>
              <div className="info-anuncio">
              <span>Formas de contacto:</span>
            </div>
              <div className="contacto-anuncio">
              Discord: Instagram: Facebook:
              </div>
            </div>
          </div>
          <div className="user-anuncio">
            <div className="info-anuncio">
              <span>.User. y foto</span>
              <span>.Juegos.</span>
              <span>.Regiones.</span>
            </div>
            <div className="d-flex">
              <div className="cuerpo-anuncio">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper placerat nisl a ultricies. Quisque sed velit eu eros finibus vehicula vel eget eros. Nullam ac neque in felis rhoncus tristique eu non ipsum. Duis tempor viverra maximus.
              </div>
              <div></div>
              <div className="info-anuncio">
              <span>Formas de contacto:</span>
            </div>
              <div className="contacto-anuncio">
              Discord: Instagram: Facebook:
              </div>
            </div>
          </div><div className="user-anuncio">
            <div className="info-anuncio">
              <span>.User. y foto</span>
              <span>.Juegos.</span>
              <span>.Regiones.</span>
            </div>
            <div className="d-flex">
              <div className="cuerpo-anuncio">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper placerat nisl a ultricies. Quisque sed velit eu eros finibus vehicula vel eget eros. Nullam ac neque in felis rhoncus tristique eu non ipsum. Duis tempor viverra maximus.
              </div>
              <div></div>
              <div className="info-anuncio">
              <span>Formas de contacto:</span>
            </div>
              <div className="contacto-anuncio">
              Discord: Instagram: Facebook:
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};
