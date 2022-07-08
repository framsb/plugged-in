import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/encontrarGamers.css";
import { Posts } from "../component/posts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Searchgamers } from "../component/searchgamers";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const EncontrarGamers = (props) => {
  const { store, actions } = useContext(Context);
  const history = useHistory();

  const [post, setPost] = useState({
    titulo: "",
    cuerpo: "",
    juego: "",
  });

  const datosPost = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const [inputValue, setInputValue] = useState("");

  // funciones de material-ui
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleSubmit = async () => {
    let data = {
      post_title: post.titulo,
      post_description: post.cuerpo,
      post_game: post.juego,
    };
    if (await actions.publishPost(data)) {
    } else {
      alert("Ocurrio un error");
    }
  };

  useEffect(() => {
    actions.getPosts();
    actions.getProfiles();
    actions.getComments();
  }, []);

  //search videojuegos API

  const handleRandomUser = () => {
    Math.floor(Math.random() * store.user.length);
  };

  return (
    <div className="encontrar-gamers">
      <div className="titulo-principal">
        <h1>¡Bienvenido a Plugged-In!</h1>
      </div>
      <div className="overlay" id="banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="titulo-overlay text-center p-3">
              <h5>
                La plataforma perfecta para encontrar tu compañero ideal,
                PluGGed-in... donde todas las partidas son GGs!
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row row-overlay pt-4">
        <ul
          className="nav nav-pills mb-3 justify-content-center"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              className="btn btn-dark box px-4 py-5"
              data-aos="zoom-out"
            >
              <i className="text-center fa-solid fa-pen-to-square"></i>
              <h3>Publica un post</h3>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
              className="btn btn-dark box px-4 py-5"
            >
              <i className="text-center fa-solid fa-magnifying-glass" data-aos="zoom-out"></i>
              <h3>Busca gamers</h3>
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="publicar-anuncio">
              <div className="form-group form-publicar shadow-textarea">
                <label
                  htmlFor="exampleFormControlTextarea6"
                  className="titulo-textarea mb-3"
                >
                  Publica tu anuncio
                </label>
                <div className="inputs-post col-lg-12">
                  <div className="info-user d-flex">
                    <p style={{ marginTop: "25px" }} className="me-5">
                      Indica el/los juego(s) que desees jugar:
                    </p>
                    <ThemeProvider theme={darkTheme}>
                      <TextField
                        name="juego"
                        value={post.juego}
                        onChange={datosPost}
                        id="standard-basic"
                        label="Juego o Juegos"
                        className="z-depth-1 mt-2 ms-3"
                        variant="filled"
                        style={{ width: "400px" }}
                      />
                    </ThemeProvider>
                  </div>
                  <div className="info-user d-flex">
                    <p
                      style={{ marginTop: "25px", paddingRight: "40px" }}
                      className="me-5"
                    >
                      Agrega un título a tu publicación:
                    </p>
                    <ThemeProvider theme={darkTheme}>
                      <TextField
                        name="titulo"
                        value={post.titulo}
                        onChange={datosPost}
                        id="standard-basic"
                        label="Título"
                        className="z-depth-1 mt-2 ms-3"
                        variant="filled"
                        style={{ width: "400px" }}
                      />
                    </ThemeProvider>
                  </div>
                  <div className="info-user d-flex mb-3">
                    <p style={{ marginTop: "25px", paddingRight: "0px" }}>
                      Agrega una descripción corta a tu publicación:
                    </p>
                    <ThemeProvider theme={darkTheme}>
                      <TextField
                        multiline
                        name="cuerpo"
                        value={post.cuerpo}
                        onChange={datosPost}
                        id="standard-basic"
                        label="Descripción"
                        className="z-depth-1 mt-2 ms-3"
                        variant="filled"
                        style={{ width: "400px" }}
                      />
                    </ThemeProvider>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-publicar btn-primary btn-lg mt-3"
                  onClick={handleSubmit}
                  disabled={
                    !post.titulo.length > 0 ||
                    !post.juego.length > 0 ||
                    !post.cuerpo.length > 0
                  }
                >
                  Publicar
                </button>
              </div>
            </div>
            <div className="row overX anuncios-publicados">
              <label
                htmlFor="exampleFormControlTextarea6"
                className="titulo-textarea mb-3"
              >
                Anuncios Publicados
              </label>
              {store.posts &&
                store.posts.map((posts, index) => {
                  return (
                    <div
                      className="col-12 col-md-10 col-lg-4 m-5 posts-columnas"
                      key={index}
                    >
                      <Posts
                        image={posts.image}
                        username={posts.username}
                        posted={posts.posted}
                        post_title={posts.post_title}
                        post_game={posts.post_game}
                        post_description={posts.post_description}
                        region={posts.region}
                        contact={posts.contact}
                        id={posts.id}
                        profile_user_id={posts.profile_user_id}
                        comments={posts.comments}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <Searchgamers />
          </div>
        </div>
      </div>
      {localStorage.getItem("token") == undefined && (
        <Redirect to={"/iniciar-sesion"}></Redirect>
      )}
    </div>
  );
};

// {store.games &&
//   store.games.map((games, index) => {
//     return (
//       <li key={index}>
//         <p className="dropdown-item" href="#">
//           {games.name}
//           </p>
//         </li>
//         </p>
//       </li>
//     );
//     })}
