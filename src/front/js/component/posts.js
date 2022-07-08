import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { blue } from "@mui/material/colors";
import Button from '@mui/material/Button';
import AddCommentIcon from "@mui/icons-material/AddComment";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";


export const Posts = (props) => {
  const { store, actions } = useContext(Context);

  const [comment, setComment] = useState({
    content: "",
    post_id: props.id,
  });

  const datosComment = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

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

  if (typeof window !== "undefined") {
    injectStyle();
  }

  const CustomAlertsComment = () => {
    toast.dark("Comentario publicado! 💬👾");
  }

  const handleSubmit = async () => {
    let data = {
      comment_content: comment.content,
      post_id: comment.post_id,
    };
    if (await actions.publishComment(data)) {
      CustomAlertsComment();
    } else {
      alert("Ocurrio un error");
    }
  };

  return (
    <>
      <div className="posts-columnas-2">
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar
                src={props.image}
                sx={{ bgcolor: blue[500] }}
                aria-label="recipe"
              ></Avatar>
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
              Formas de contacto y Plataforma:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.contact}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <AddCommentIcon />
              <p>{props.comments.length}</p>
            </ExpandMore>
            <div className="button-perfil">

            <Link
              to={`/detalles-usuario/${props.profile_user_id}`}
              style={{textDecoration: 'none'}}
              >
              <Button variant="text">Visitar Perfil</Button>
            </Link>
              </div>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <p className="text-secondary ps-1">Comentarios...</p>
              <ul className="comment-section">
                <li>
                  <div className="comments">
                    {props.comments &&
                      props.comments.map((comments, index) => {
                        if (comments.post_id == props.id) {
                          return (
                            <div key={index} className="one-comment">
                              <div className="comment-content">
                                {comments.comment_content}
                              </div>
                              <div className="comment-author d-flex">
                                <div>
                                  <Avatar
                                    src={comments.image}
                                    sx={{
                                      bgcolor: blue[500],
                                      width: 24,
                                      height: 24,
                                    }}
                                    aria-label="recipe"
                                  ></Avatar>
                                </div>
                                <div className="ps-2">{comments.username}</div>
                              </div>
                            </div>
                          );
                        }
                      })}
                  </div>
                </li>
                <li>
                  {props.comments.length == 0 && (
                    <Typography paragraph className="no-comments">
                      No hay comentarios :C
                    </Typography>
                  )}
                </li>
                <li>
                  <div className="send-comments d-flex mt-2">
                    <div className="Container-Input">
                      <input
                        name="content"
                        className="comments-input"
                        placeholder="Agregar comentario..."
                        value={comment.content}
                        onChange={datosComment}
                        style={{ width: "245px" }}
                      ></input>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm mt-2"
                      onClick={handleSubmit}
                    >
                      <SendIcon />
                    </button>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Collapse>
        </Card>
      </div>
      <ToastContainer />
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
  id: PropTypes.number,
  user_id: PropTypes.number,
};
