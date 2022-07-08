import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Search } from "../component/Search";
import { PostsProfile } from "../component/postsProfile";
import { Results } from "../component/Results";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";


export const Perfil = () => {
  const { store, actions } = useContext(Context);
  const [canEdit, setCanEdit] = useState(false);
  const editar = () => {
    setCanEdit((canEdit) => !canEdit);
  };

  // Subir imagenes
  const [uploadImages, setUploadImages] = useState("");

  async function uploadFile() {
    const cloud_name = "pluggedin";
    const preset = "icnpftra";

    const formData = new FormData();
    formData.append("file", uploadImages);
    formData.append("upload_preset", `${preset}`);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        actions.putImage(data.secure_url);
      }
    } catch (error) {
      console.log("message", error);
    }
  }

  const datosPerfil = (e) => {
    actions.handleUserProfile(e.target.name, e.target.value);
  };

  if (typeof window !== "undefined") {
    injectStyle();
  }

  const CustomAlertsUser = () => {
    toast.dark("Datos actualizados! 😄");
  }

  const handleUpdate = async () => {
    let data = {
      about_me: store.user.about_me,
      favorite_games: store.user.favorite_games,
      region: store.user.region,
      contact: store.user.contact,
      image: store.user.image,
    };
    if (actions.updateUserProfile(data)) {
      CustomAlertsUser();
    } else {
      alert("Ocurrio un error");
    }
  };

  useEffect(() => {
    actions.getUserDetails();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

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
    <>
      <div className="perfil-body h-100">
        <div className="titulo-principal z-depth-1">Tu Perfil!</div>
        <div className="perfil row shadow-lg">
          <div className="img-username col-6">
            <div className="image">
              <img
                src={
                  store.user.image == ""
                    ? "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"
                    : store.user.image
                }
              />
              {!canEdit ? (
                <></>
              ) : (
                <div className="btn-foto d-flex mb-3">
                  <input
                    className="form-control input-foto bg-primary text-white"
                    type="file"
                    id="formFile"
                    onChange={(e) => setUploadImages(e.target.files[0])}
                  ></input>
                  <Button variant="contained" onClick={uploadFile}>
                    Subir Foto
                  </Button>
                </div>
              )}
            </div>

            <div className="username">{store.user.username}</div>
            <div className="info-extra">{store.user.email}</div>
            <div className="info-extra">Fecha de nacimiento: </div>
            <div className="info-extra2">{store.user.birthdate}</div>
          </div>
          <div className="descripcion-usuario col-7 text-center">
            <div className="titulo-descripcion-username p-2">
              {store.user.username}
            </div>
            <div className="titulo-descripcion">Descripción</div>

            <div className="text-field">
              <ThemeProvider theme={darkTheme}>
                {!canEdit ? (
                  <TextField
                    disabled
                    name="about_me"
                    id="outlined-basic-disabled"
                    label="Agrega una descripción corta sobre ti!"
                    value={store.user.about_me}
                    onChange={datosPerfil}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    className="TextField"
                    multiline
                  />
                ) : (
                  <TextField
                    name="about_me"
                    id="outlined-basic"
                    label="Agrega una descripción corta sobre ti!"
                    value={store.user.about_me}
                    onChange={datosPerfil}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    className="TextField"
                    multiline
                  />
                )}
              </ThemeProvider>
            </div>
            <div className="titulo-descripcion">Juego favorito</div>
            <div className="text-field">

            {!canEdit ? (
              <>
                <ThemeProvider theme={darkTheme}>
                  <TextField
                    disabled
                    name="favorite_games"
                    id="outlined-basic"
                    label="Tu juego favorito..."
                    value={store.user.favorite_games}
                    InputLabelProps={{ shrink: true }}
                    onChange={datosPerfil}
                    variant="outlined"
                    className="TextField"
                    multiline
                    />
                </ThemeProvider>
              </>
            ) : (
              <>
                <ThemeProvider theme={darkTheme}>
                  <div className="search mb-4">
                    <form onSubmit={onSubmit}>
                      <div className="dropdown">
                        <button
                          className="btn btn-primary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          onChange={(e) => {e.preventDefault()}}
                          bs-auto-close="false"
                          >
                          <input
                            type="text"
                            className="btn-primary"
                            value={searchTerm}
                            onChange={handleChange}
                            placeholder="Busca tu juego favorito..."
                          />
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuClickableInside"
                          >
                          <Results
                            onClick={datosPerfil}
                            gameResults={gameResults}
                          />
                        </ul>
                        <input type="submit" placeholder="Buscar..." className="btn btn-primary m-2"/>
                      </div>
                    </form>
                  </div>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    name="favorite_games"
                    id="outlined-basic"
                    label="Tu juego favorito..."
                    value={store.user.favorite_games}
                    InputLabelProps={{ shrink: true }}
                    onChange={datosPerfil}
                    variant="outlined"
                    className="TextField"
                    multiline
                  />
                </ThemeProvider>
              </>
            )}
            </div>
            <div className="titulo-descripcion">Región</div>
            <div className="text-field">
              <ThemeProvider theme={darkTheme}>
                {!canEdit ? (
                  <>
                    <TextField
                      disabled
                      name="region"
                      id="outlined-basic"
                      label="Escoge tu región actual"
                      value={store.user.region}
                      InputLabelProps={{ shrink: true }}
                      onChange={datosPerfil}
                      variant="outlined"
                      className="TextField"
                      multiline
                    />
                  </>
                ) : (
                  <div>
                    <select name="region" className="btn btn-primary mb-4" style={{width:"280px"}}onChange={datosPerfil}>
                      <option value="seleccion" className="btn btn-light" disabled selected>
                        Selecciona tu región!
                      </option>
                      {store.region &&
                        store.region.map((oner, i) => {
                          return <option key={i} value={oner} className="btn btn-light">{oner}</option>;
                        })}
                    </select>
                    <TextField
                      name="region"
                      id="outlined-basic"
                      label="Escoge tu región actual"
                      InputLabelProps={{ shrink: true }}
                      value={store.user.region}
                      onChange={datosPerfil}
                      variant="outlined"
                      className="TextField mt-2"
                      multiline
                    />
                  </div>
                )}
              </ThemeProvider>
            </div>
            <div className="titulo-descripcion">Formas de Contacto y Plataforma</div>
            <div className="text-field">
              <ThemeProvider theme={darkTheme}>
                {!canEdit ? (
                  <TextField
                    disabled
                    name="contact"
                    id="outlined-basic"
                    label="Añade tus formas de contacto (eg. Discord, Instagram, Xbox Live, PSN) y Plataforma"
                    InputLabelProps={{ shrink: true }}
                    value={store.user.contact}
                    onChange={datosPerfil}
                    variant="outlined"
                    className="TextField"
                    multiline
                  />
                ) : (
                  <TextField
                    name="contact"
                    id="outlined-basic"
                    label="Añade tus formas de contacto (eg. Discord, Instagram, Xbox Live, PSN)"
                    value={store.user.contact}
                    InputLabelProps={{ shrink: true }}
                    onChange={datosPerfil}
                    variant="outlined"
                    className="TextField"
                    multiline
                  />
                )}
              </ThemeProvider>
            </div>
            {!canEdit ? (
              <Button
                type="button"
                className="btn btn-primary m-3"
                variant="contained"
                size="large"
                onClick={editar}
              >
                Editar Información
              </Button>
            ) : (
              <Button
                type="button"
                className="btn btn-primary m-3"
                variant="contained"
                size="large"
                onClick={() => {
                  handleUpdate();
                  editar();
                }}
              >
                Guardar Información
              </Button>
            )}
          </div>
          <div className="tus-posts row overX anuncios-publicados">
            <label
              htmlFor="exampleFormControlTextarea6"
              className="titulo-textarea mb-3"
            >
              Tus Posts
            </label>
            {store.user.post_id &&
              store.user.post_id.map((post_id, index) => {
                return (
                  <div className="col-10 col-md-8 col-lg-4 mt-3" key={index}>
                    <PostsProfile
                      image={post_id.image}
                      username={post_id.username}
                      posted={post_id.posted}
                      post_title={post_id.post_title}
                      post_game={post_id.post_game}
                      post_description={post_id.post_description}
                      region={post_id.region}
                      contact={post_id.contact}
                      id={post_id.id}
                      comments={post_id.comments}
                    />
                  </div>
                );
              })}
          </div>
          {localStorage.getItem("token") == undefined && (
            <Redirect to={"/iniciar-sesion"}></Redirect>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
