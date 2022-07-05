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

export const Perfil = () => {
  const { store, actions } = useContext(Context);
  const [canEdit, setCanEdit] = useState(false);
  const [inputValue, setInputValue] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
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

  const history = useHistory();

  const datosPerfil = (e) => {
    actions.handleUserProfile(e.target.name, e.target.value);
  };

  const handleUpdate = async () => {
    let data = {
      about_me: store.user.about_me,
      favorite_games: store.user.favorite_games,
      region: store.user.region,
      contact: store.user.contact,
      image: "",
    };
    if (actions.updateUserProfile(data)) {
      console.log("Perfecto");
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
            <div className="btn-foto">
              <input
                type="file"
                onChange={(e) => setUploadImages(e.target.files[0])}
              />
              <button onClick={uploadFile}>Uploads Image</button>
            </div>
            </div>

            <div className="username">{store.user.username}</div>
            <div className="info-extra">{store.user.email}</div>
            <div className="info-extra">Fecha de nacimiento: </div>
            <div className="info-extra2">{store.user.birthdate}</div>
          </div>
          <div className="descripcion-usuario col-7 text-center">
            <div className="titulo-descripcion-username">
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
            <div className="titulo-descripcion">Juegos favoritos</div>
            <ThemeProvider theme={darkTheme}>
              {/* {!canEdit ? (
                <div className="text-field">
                  <TextField
                    disabled
                    name="favorite_games"
                    id="outlined-basic"
                    label="Tus juegos favoritos..."
                    value={store.user.favorite_games}
                    InputLabelProps={{ shrink: true }}
                    onChange={datosPerfil}
                    variant="outlined"
                    className="TextField"
                    multiline
                  />
                </div>
              ) : (
                <div className="text-field">
                  <TextField
                    name="favorite_games"
                    id="outlined-basic"
                    label="Tus juegos favoritos..."
                    value={store.user.favorite_games}
                    InputLabelProps={{ shrink: true }}
                    onChange={datosPerfil}
                    variant="outlined"
                    className="TextField"
                    multiline
                  />
                  <Search />
                </div>
              )} */}
              <TextField
                disabled
                name="favorite_games"
                id="outlined-basic"
                label="Tus juegos favoritos..."
                value={store.user.favorite_games}
                InputLabelProps={{ shrink: true }}
                onChange={datosPerfil}
                variant="outlined"
                className="TextField"
                multiline
              />
              <Search />
            </ThemeProvider>
            <div className="titulo-descripcion">Región</div>
            <div className="text-field">
              <ThemeProvider theme={darkTheme}>
                {!canEdit ? (
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
                ) : (
                  <TextField
                    name="region"
                    id="outlined-basic"
                    label="Escoge tu región actual"
                    InputLabelProps={{ shrink: true }}
                    value={store.user.region}
                    onChange={datosPerfil}
                    variant="outlined"
                    className="TextField"
                    multiline
                  />
                  
                )}
              </ThemeProvider>
            </div>
            <div className="titulo-descripcion">Formas de Contacto</div>
            <div className="text-field">
              <ThemeProvider theme={darkTheme}>
                {!canEdit ? (
                  <TextField
                    disabled
                    name="contact"
                    id="outlined-basic"
                    label="Añade tus formas de contacto (eg. Discord, Instagram, Xbox Live, PSN)"
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
          {localStorage.getItem("token") == undefined && (
            <Redirect to={"/iniciar-sesion"}></Redirect>
          )}
        </div>
      </div>
    </>
  );
};
