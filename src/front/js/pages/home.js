import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
    <div className="home">
    {/* div con clase Home: incluye carousel y las formas de registro */}
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="false"
      >
      {/* Carousel */}
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
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
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="3500">
            <img src="https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg" class="d-flex w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3500">
            <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg" class="d-flex w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3500">
            <img src="https://thumbs.dreamstime.com/b/hands-making-love-heart-shadow-rainbow-background-colors-painted-slats-weathered-wood-36340314.jpg" class="d-flex w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
	    <div className="registro-home text-center">
      {/* Div del lado derecho con opciones de registrarte e iniciar sesion */}
		<p>Regístrate ahora!</p>
    <button>Registrarse</button>
		<p>Si ya tienes cuenta... Inicia sesión aquí!</p>
    <button>Iniciar Sesion</button>
	    </div>
    </div>
    <div className="sobre-nosotros">
      {/* incluye solo el final de la pagina con nuestra info */}
      <p className="sn-titulo">Sobre Nosotros...</p>
        <div className="sn-persona1">
          <img className="sn-img1" src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"/>
          <p className="sn-texto">Alfonso Mendez</p>
          <div className="sn-cuerpo">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
        </div>
        <div className="sn-persona2">
          <img className="sn-img2" src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"/>
          <p className="sn-texto2">Framberling Barrios</p>
          <div className="sn-cuerpo">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
        </div>
      </div>
    </>
  );
};
