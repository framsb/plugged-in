import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import Button from '@mui/material/Button';
import "../../styles/boxuser.css";
import PropTypes from "prop-types";

export const Boxuser = (props) => {
  return (
    <div className="our-team">
      <div className="picture">
        <img className="img-fluid" src={props.image} />
      </div>
      <div className="team-content">
        <h3 className="name">{props.username}</h3>
        <h5 className="title">{props.region}</h5>
        <Link
          to={`/detalles-usuario/${props.profile_user_id}`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined">Visitar Perfil</Button>
        </Link>
      </div>
    </div>
  );
};

Boxuser.propTypes = {
  username: PropTypes.string,
  image: PropTypes.string,
  about_me: PropTypes.string,
};
