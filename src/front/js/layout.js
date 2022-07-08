import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Register } from "./pages/register";
import { LogIn } from "./pages/login";
import { EncontrarGamers } from "./pages/encontrar-gamers";
import { Perfil } from "./pages/perfil";
import { UnPerfil } from "./pages/unPerfil";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/registrarse">
              <Register />
            </Route>
            <Route exact path="/encontrar-gamers">
              <EncontrarGamers />
            </Route>
            <Route exact path="/detalles-usuario/:id">
              <UnPerfil />
            </Route>
            <Route exact path="/iniciar-sesion">
              <LogIn />
            </Route>
            <Route exact path="/tu-perfil">
              <Perfil />
            </Route>
            <Route>
              <h1 className="text-light">Not found!</h1>
            </Route>
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
