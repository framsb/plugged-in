import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";

export const Results = (props) => {

  return (
    <>
      {
        props.gameResults.map(game => (
          <li key={game.id}>
            <p className="dropdown-item">{game.name}</p>
          </li>
        ))
      }
    </>
  );
}
