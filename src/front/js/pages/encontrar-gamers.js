import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/encontrarGamers.css";
import { Posts } from "../component/posts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Boxuser } from "../component/boxuser";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [gameResults, setGameResults] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let slug = searchTerm.split(" ").join("-").toLowerCase();

    setGameResults([]);
    fetch(
      `https://api.rawg.io/api/games?key=0929bf6edddc4ca0b6b87155780d1977&search=${slug}`
    )
      .then((resp) => resp.json())
      .then(({ results }) => {
        results === undefined
          ? alert("Juego no encontrado, intenta de nuevo")
          : setGameResults(results);
      });
    setSearchTerm("");
  };

  return (
    <div className="encontrar-gamers">
      <div className="titulo-principal">Bienvenido a Plugged-In!</div>
      <div class="overlay" id="banner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1>!Bienvenido a Plugged-In!</h1>
                  <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est magni perferendis fugit modi similique, suscipit, deserunt a iure.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="col-md-4 col-sm-4 col-xs-12 nav-item" role="presentation">
            <button id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" className="btn btn-dark box px-4 py-5">
            <i className="text-center fa-solid fa-pen-to-square"></i>
                    <h3>Publica un post</h3>
            </button>
          </li>
          <li className="col-md-4 col-sm-4 col-xs-12 col-6 nav-item" role="presentation">
              <button id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" className="btn btn-dark box px-4 py-5">
                <i className="text-center fa-solid fa-magnifying-glass"></i>
                  <h3>Busca gamers</h3>
              </button>
            </li>
          <li className="col-md-4 col-sm-4 col-xs-12 col-6 nav-item" role="presentation">
              <button id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" className="btn btn-dark box px-4 py-5">
                <i className="text-center fa-solid fa-user-group"></i>
                <h3>Encuentra un duo</h3>
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
                        {/* <div className="search mb-4">
                <form onSubmit={onSubmit}>
                  <div className="dropdown">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      bs-auto-close="false"
                    >
                    <input
                    type="text"
                    className="btn-primary"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Busca tus juegos favoritos..."
                    />
                    </button>
                    <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuClickableInside"
                    >
                    <ResultsEG
                        onClick={datosPost}
                        gameResults={gameResults}
                      />
                      </ul>
                      <input
                      type="submit"
                      placeholder="Buscar..."
                      className="btn btn-primary m-2"
                      />
                  </div>
                  </form>
              </div> */}
                      </ThemeProvider>
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
                {/* <ThemeProvider theme={darkTheme}>
          {store.posts && (
            <Autocomplete
              sx={{ width: 300 }}
              name="favorite_games"
              id="checkboxes-games"
              className="autocomplete-juegos"
              options={store.posts}
              disableCloseOnSelect
              onChange={filterPosts}
              getOptionLabel={(option) => option.post_game}
              renderInput={(params) => (
                <TextField {...params} label="Filtra por juegos" />
              )}
            />
          )}
              </ThemeProvider> */}

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
          <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
              <form action="#">
                <div class="form-group d-flex">
                  <input type="text" class="form-control" placeholder="Ingresa usuario"/>
                  <input type="submit" class="btn btn-primary text-white px-4" value="Buscar"/>
                </div>
                </form>
                <div class="container">
                   <div class="row row-cols-1 row-cols-md-3 g-4 text-center">
                    
                  {store.profiles &&
          store.profiles.map((user, index) => {
            return (
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <Boxuser 
                key={index}
                id={user.id}
                image={user.image}
                username={user.username}
                region={user.region}
                />
           </div> 
           );
          })}
                
              </div>
            </div>
          </div>
            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
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
