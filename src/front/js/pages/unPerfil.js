import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { PostsOneProfile } from "../component/postsOneProfile";

export const UnPerfil = (props) => {
  const { store, actions } = useContext(Context);
  const [userProfile, setUserProfile] = useState({});
  const { id } = useParams();

  useEffect(() => {
    actions.getProfiles();
    actions.getPosts();
  }, []);

  useEffect(() => {
    let user = store.profiles.filter((profile) => profile.user_id == id);
    setUserProfile(user[0]);
  }, [store.profiles]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // console.log(store);

  return (
    <>
      {userProfile && (
        <>
          <div className="perfil-body h-100">
            <div className="titulo-principal z-depth-1">Perfil de {userProfile.username}</div>
            <div className="perfil row shadow-lg">
              <div className="img-username col-6">
                <div className="image">
                  <img src={userProfile.image} />
                </div>

                <div className="username">{userProfile.username}</div>
                <div className="info-extra">{userProfile.email}</div>
                <div className="info-extra">Fecha de nacimiento: </div>
                <div className="info-extra2 pb-3">{userProfile.birthdate}</div>
              </div>
              <div className="descripcion-usuario col-7 text-center">
                <div className="titulo-descripcion-username p-2">
                  {userProfile.username}
                </div>
                  <div className="text-secondary">Se unió el: {userProfile.registration_date}</div>
                <div className="titulo-descripcion">Descripción</div>

                <div className="text-field">
                  <ThemeProvider theme={darkTheme}>
                    <TextField
                      disabled
                      name="about_me"
                      id="outlined-basic-disabled"
                      label="Descripción"
                      value={userProfile.about_me}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      className="TextField"
                      multiline
                    />
                  </ThemeProvider>
                </div>
                <div className="titulo-descripcion">Juego favorito</div>
                <div className="text-field">
                  <ThemeProvider theme={darkTheme}>
                    <TextField
                      disabled
                      name="favorite_games"
                      id="outlined-basic"
                      label="Juego favorito"
                      value={userProfile.favorite_games}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      className="TextField"
                      multiline
                    />
                  </ThemeProvider>
                </div>
                <div className="titulo-descripcion">Región</div>
                <div className="text-field">
                  <ThemeProvider theme={darkTheme}>
                    <TextField
                      disabled
                      name="region"
                      id="outlined-basic"
                      label="Región"
                      value={userProfile.region}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      className="TextField"
                      multiline
                    />
                  </ThemeProvider>
                </div>
                <div className="titulo-descripcion">Formas de Contacto y Plataforma</div>
                <div className="text-field">
                  <ThemeProvider theme={darkTheme}>
                    <TextField
                      disabled
                      name="contact"
                      id="outlined-basic"
                      label="Formas de Contacto y Plataforma"
                      InputLabelProps={{ shrink: true }}
                      value={userProfile.contact}
                      variant="outlined"
                      className="TextField"
                      multiline
                    />
                  </ThemeProvider>
                </div>
              </div>
              <div className="tus-posts row overX anuncios-publicados">
                <label
                  htmlFor="exampleFormControlTextarea6"
                  className="titulo-textarea mb-3"
                >
                  Posts de {userProfile.username}
                </label>
                {userProfile.post_id &&
                  userProfile.post_id.map((post_id, index) => {
                    return (
                      <div
                        className="col-10 col-md-8 col-lg-4 mt-3"
                        key={index}
                      >
                        <PostsOneProfile
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
        </>
      )}
    </>
  );
};

UnPerfil.propTypes = {
  username: PropTypes.string,
};
