import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
    <div className="home">
    {/* div con clase Home: incluye carousel y las formas de registro */}
	    <div className="registro-home text-center">
      {/* Div del lado derecho con opciones de registrarte e iniciar sesion */}
        <div className="register-links">
          <div className="register-now col-md-8 offset-md-2">
            <p>Regístrate ahora!</p>
            <Link to="/registrarse" className="btn btn-registro btn-dark">Register</Link>
          </div>
          <div className="register-now col-md-8 offset-md-2">
            <p>Si ya tienes cuenta... Inicia sesión aquí!</p>
            <Link to="/iniciar-sesion" className="btn btn-registro btn-dark">Log In</Link>
          </div>
        </div>
	    </div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="false"
      >
      {/* Carousel */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3500">
            <img src="https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg" className="d-flex w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Crea tu cuenta!</h5>
              <p>
                Simplemente dirígete a /registrarse o presiona el botón de "Registrarse"
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3500">
            <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg" className="d-flex w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Publica tu anuncio o descubre anuncios de los demás!</h5>
              <p>
                Podrás filtrar por juegos favoritos y tu región actual para encontrar tu compañero perfecto
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3500">
            <img src="https://thumbs.dreamstime.com/b/hands-making-love-heart-shadow-rainbow-background-colors-painted-slats-weathered-wood-36340314.jpg" className="d-flex w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Conéctate y disfruta!</h5>
              <p>
                Juega con tus nuevos amigos y pásala increíble
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div className="sobre-nosotros">
      {/* incluye solo el final de la pagina con nuestra info */}
      <p className="sn-titulo">Sobre Nosotros...</p>
        <div className="sn-persona1 col-md-8 offset-md-2">
          <img className="sn-img1" src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"/>
          <div className="sn-texto1">Alfonso Méndez</div>
          <div className="sn-cuerpo1">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
        </div>
        <div className="sn-persona2 col-md-8 offset-md-2">
          <img className="sn-img2" src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"/>
          <div className="sn-texto2">Framberling Barrios</div>
          <div className="sn-cuerpo2">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
        </div>
      </div>
    </>
  );
};
