import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { SelectGames } from "../component/selectGames";
import FotoAlfonso from "../../img/Foto-alfonso.jpg";
import FotoFram from "../../img/Foto-fram.jpeg";

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
              <Link to="/registrarse" className="btn btn-registro btn-dark">
                Register
              </Link>
            </div>
            <div className="register-now col-md-8 offset-md-2">
              <p>Si ya tienes cuenta... Inicia sesión aquí!</p>
              <Link to="/iniciar-sesion" className="btn btn-registro btn-dark">
                Log In
              </Link>
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
              <img
                src="https://static9.depositphotos.com/1003924/1208/i/450/depositphotos_12087544-stock-photo-register-key-concept.jpg"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Crea tu cuenta!</h5>
                <p>
                  Simplemente dirígete a /registrarse o presiona el botón de
                  "Registrarse"
                </p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="3500">
              <img
                src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_816882180_350503.jpg"
                className="d-flex w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Publica tu anuncio o descubre anuncios de los demás!</h5>
                <p>
                  Podrás filtrar por juegos favoritos y tu región actual para
                  encontrar tu compañero perfecto
                </p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="3500">
              <img
                src="https://thebusinessofesports.com/wp-content/uploads/2022/03/gig-gaming-friends.png"
                className="d-flex w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Conéctate y disfruta!</h5>
                <p>Juega con tus nuevos amigos y pásala increíble</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="sobre-nosotros">
        {/* incluye solo el final de la pagina con nuestra info */}
        <p className="sn-titulo">Sobre Nosotros...</p>
        <div className="sn-persona1 col-md-8 offset-md-2">
          <img
            className="sn-img1"
            src={FotoAlfonso}
          />
          <div className="sn-texto1">Alfonso Méndez</div>
          <div className="sn-cuerpo1">
            Mi nombre es Alfonso y nací el 22 de septiembre de 2005 en la ciudad
            de Caracas, Venezuela. Desde que era muy pequeño siempre me ha
            apasionado la tecnología y la informática, por lo que decidí
            adentrarme por primera vez en el mundo de la programación a través
            del curso de Full-Stack Dev. en 4GeeksAcademy. Uno de mis grandes
            intereses actualmente es el desarrollo y avance de la Inteligencia
            Artificial. Aunque este es solo el comienzo, me encantaría manejar
            en un futuro los suficientes contenidos para poder expresarme
            libremente a través de lenguajes de programación y desarrollar todo
            tipo de ideas que tenga en la cabeza.
          </div>
        </div>
        <div className="sn-persona2 col-md-8 offset-md-2">
          <img
            className="sn-img2"
            src={FotoFram}
          />
          <div className="sn-texto2">Framberling Barrios</div>
          <div className="sn-cuerpo2 justify-content-center">
            Mi nombre es Framberling, actualmente soy estudiante de 9no semestre 
            de ingenieria en informatica. Soy apasianada por mi carrera y me encanta 
            aprender cada dia de ella. Hoy, me siento orgullosa de cada
            pasito que he dado y  contenta de haber iniciado en 4geeks. 
          </div>
        </div>
      </div>
    </>
  );
};
