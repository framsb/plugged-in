import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";

export const Results = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <>
      {props.gameResults.map((game) => (
        <li key={game.id}>
          <p
            className="dropdown-item"
            onClick={(e) => {
              actions.updateFavoriteGame(game.name);
            }}
          >
            {game.name}
          </p>
        </li>
      ))}
    </>
  );
};
