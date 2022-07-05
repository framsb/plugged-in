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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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
      alert("Post publicado");
    } else {
      alert("Ocurrio un error");
    }
  };

  useEffect(() => {
    actions.getPosts();
    actions.getProfiles();
    actions.getComments();
  }, []);


  return (
    <div className="encontrar-gamers">
      <div className="titulo-principal">
        Bienvenido a Plugged-In!
      </div>
      <div className="publicar-anuncio">
        <div className="form-group shadow-textarea">
          <label
            htmlFor="exampleFormControlTextarea6"
            className="titulo-textarea mb-3"
          >
            Publica tu anuncio
          </label>
          <div className="info-user d-flex">
            <p style={{ marginTop: "25px" }}>
              Escoge el juego que deseas jugar:
            </p>
            <ThemeProvider theme={darkTheme}>
              {store.games.results && (
                <Autocomplete
                  sx={{ width: 300 }}
                  name="favorite_games"
                  id="checkboxes-games"
                  className="autocomplete-juegos"
                  options={store.games.results}
                  disableCloseOnSelect
                  value={store.user.favorite_games}
                  onChange={(event, newValue) => setInputValue(newValue)}
                  // onChange={(event, newValue) => {
                  //   console.log(newValue);
                  // }}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Juegos Favoritos" />
                  )}
                />
              )}
            </ThemeProvider>
            <textarea
              name="juego"
              className="form-control cuerpo-textarea z-depth-1 mt-2"
              id="exampleFormControlTextarea6"
              rows="1"
              placeholder="juego (temporal)"
              value={post.juego}
              onChange={datosPost}
            ></textarea>
          </div>
          <textarea
            name="titulo"
            className="form-control cuerpo-textarea z-depth-1 mt-2"
            id="exampleFormControlTextarea6"
            rows="1"
            placeholder="titulo del post..."
            value={post.titulo}
            onChange={datosPost}
          ></textarea>
          <textarea
            name="cuerpo"
            className="form-control cuerpo-textarea z-depth-1 mt-2"
            id="exampleFormControlTextarea6"
            rows="2"
            placeholder="Agrega una descripción corta de tu anuncio..."
            value={post.cuerpo}
            onChange={datosPost}
          ></textarea>
          <button
            type="button"
            className="btn btn-publicar btn-primary btn-lg mt-2"
            onClick={handleSubmit}
          >
            Publicar
          </button>
        </div>
      </div>
      <div className="row overX anuncios-publicados">
        {store.posts &&
          store.posts.map((posts, index) => {
            return (
              <div className="col-10 col-md-8 col-lg-4 mt-5" key={index}>
                <Posts
                image={posts.image}
                  username={posts.username}
                  posted={posts.posted}
                  post_title={posts.post_title}
                  post_game={posts.post_game}
                  post_description={posts.post_description}
                  region={posts.region}
                  contact={posts.contact}
                />
              </div>
            );
          })}
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
