import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/boxuser.css";
import PropTypes from "prop-types";


export const Boxuser = (props) => {
  return (
            <div class="our-team">
                <div class="picture">
                <img class="img-fluid" src={props.image}/>
                </div>
                <div class="team-content">
                <h3 class="name">{props.username}</h3>
                <h5 class="title">{props.region}</h5>
                <Link
              to={`/detalles-usuario/${props.id}`}
              id={props.id}
            >
                Visitar Perfil
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
  