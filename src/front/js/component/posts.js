import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/encontrarGamers.css";
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
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

export const Posts = (props) => {
  const { store, actions } = useContext(Context);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //

  return (
    <>
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar src={props.image} sx={{ bgcolor: red[500] }} aria-label="recipe">
              </Avatar>
            }
            title={props.username}
            subheader={props.posted}
          />
          <CardContent>
            <Typography
              variant="body1"
              className="mb-3"
              style={{ fontWeight: "600" }}
            >
              {props.post_title}
            </Typography>
            <Typography
              variant="body2"
              className="mb-3"
              style={{ fontWeight: "600" }}
            >
              {props.post_game}
            </Typography>
            <Typography variant="body2">{props.post_description}</Typography>
            <Typography variant="subtitle2" className="mt-3">
              Region:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.region}
            </Typography>
            <Typography variant="subtitle2" className="mt-3">
              Formas de contacto:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.contact}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="like">
              <FavoriteIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <AddCommentIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <ul className="comment-section">
                <li> 
                  <div className="Container-Input">
                    <input className="comments-input" placeholder="Agregar comentario..."></input>
                  </div>
                </li>
                <li>
                  <div className="comments">
                    <Typography paragraph>
                      
                    </Typography>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </>
  );
};

Posts.propTypes = {
  username: PropTypes.string,
  posted: PropTypes.string,
  post_title: PropTypes.string,
  post_game: PropTypes.string,
  post_description: PropTypes.string,
  region: PropTypes.string,
  contact: PropTypes.string,
};
