import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

export const Perfil = () => {
  const { store, actions } = useContext(Context);
  const [userProfile, setUserProfile] = useState({
    about_me: "",
    favorite_games: "",
    region: "",
    contact: "",
    image: "",
  });

  const history = useHistory();

  const datosPerfil = (e) => {
    console.log(e.target.name)
    // setUserProfile({
    //   ...userProfile,
    //   [e.target.name]: e.target.value,
    // });
    actions.handleUserProfile(e.target.name, e.target.value)
  };

  const handleUpdate = async () => {
    let data = {
      about_me: store.user.about_me,
      favorite_games: store.user.favorite_games,
      region: store.user.region,
      contact: store.user.contact,
      image: ""
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

  return (
    <> 
      <div className="perfil-body h-100">

      <div className="titulo-principal z-depth-1">Tu Perfil!</div>
      <div className="perfil row shadow-lg">
        <div className="img-username col-6">
          <div className="image">
            <img src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png" />
            <div className="btn-foto">
              <Button variant="text">Editar foto de perfil</Button>
            </div>
          </div>
          <div className="username">{store.user.username}</div>
          <div className="info-extra">{store.user.email}</div>
          <div className="info-extra">Fecha de nacimiento: </div>
          <div className="info-extra2">{store.user.birthdate}</div>
        </div>
        <div className="descripcion-usuario col-7 text-center">
          <div className="titulo-descripcion-username">{store.user.username}</div>
          <div className="titulo-descripcion">Descripción</div>
          <div className="text-field">
            <TextField
              name="about_me"
              id="outlined-basic"
              label="Agrega una descripción corta sobre ti!"
              value={store.user.about_me}
              onChange={datosPerfil}
              variant="outlined"
              className="TextField"
              multiline
              />
          </div>
          <div className="titulo-descripcion">Juegos favoritos</div>
          <div className="text-field">
            <TextField
              name="favorite_games"
              id="outlined-basic"
              label="Escoge tus juegos favoritos"
              value={store.user.favorite_games}
              onChange={datosPerfil}
              variant="outlined"
              className="TextField"
              multiline
              />
          </div>
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
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {store.games &&
                store.games.map((games, index) => {
                  return (
                    <li key={index}>
                      <p className="dropdown-item" href="#">
                        {games.name}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="titulo-descripcion">Región</div>
          <div className="text-field">
            <TextField
              name="region"
              id="outlined-basic"
              label="Escoge tu región actual"
              value={store.user.region}
              onChange={datosPerfil}
              variant="outlined"
              className="TextField"
              multiline
              />
          </div>
          <div className="titulo-descripcion">Formas de Contacto</div>
          <div className="text-field">
            <TextField
              name="contact"
              id="outlined-basic"
              label="Añade tus formas de contacto (eg. Discord, Instagram, Xbox Live, PSN)"
              value={store.user.contact}
              onChange={datosPerfil}
              variant="outlined"
              className="TextField"
              multiline
              />
          </div>
            <Button type="button"
              className="btn btn-primary m-3"
              variant="contained"
              size="large"
              >
              Editar Información
            </Button>
            <Button type="button"
              className="btn btn-primary m-3"
              variant="contained"
              size="large"
              onClick={handleUpdate}
              >
              Guardar Información
            </Button>
        </div>
        {localStorage.getItem("token") == undefined && (
          <Redirect to={"/iniciar-sesion"}></Redirect>
          )}
      </div>
      </div>
    </>
  );
};
