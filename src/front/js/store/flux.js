const getState = ({ getStore, getActions, setStore }) => {
  const API_URL = process.env.BACKEND_URL;
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      games: [],
      user: [],
      profile: [],
      region: ["Asia",
        "África",
        "Europa",
        "América del Norte",
        "América del Sur",
        "Oceanía"],
      posts: [],
      comments: [],
      profiles: []
    },
    actions: {
      registerUser: async (data) => {
        let response = await fetch(`${API_URL}/api/registrarse`, {
          method: "POST",
          // mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        console.log(response.status);
        if (response.status == 200) {
          let data = await response.json();
          localStorage.setItem("token", data.token);
          setStore({ isLoggedIn: true });
          return true;
        } else return false;
      },

      loginUser: async (data) => {
        let response = await fetch(`${API_URL}/api/iniciar-sesion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          let data = await response.json();
          localStorage.setItem("token", data.token);
          setStore({ isLoggedIn: true });
          return true;
        } else return false;
      },

      logOutUser: () => {
        localStorage.removeItem("token");
        setStore({ isLoggedIn: false });
      },

      loadRegions: async () => {
        try {
          let response = await fetch(
            "https://restcountries.com/v3.1/subregion/europe"
          );
          const data = await response.json();
          //setStore({ europe: data});
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },

      loadGamesData: async () => {
        const url =
          "https://api.rawg.io/api/games?key=0929bf6edddc4ca0b6b87155780d1977&tags=7";
        try {
          let response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setStore({ games: data });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },

      getUserDetails: async (data) => {
        let response = await fetch(`${API_URL}/api/detalles-usuario`, {
          method: "GET",
          // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
        if (response.status == 200) {
          let data = await response.json();
          setStore({ user: data.user_data });
          return true;
        } else return console.log("Ocurrio un error", response.status);
      },

      handleUserProfile: (prop, data) => {
        let store = getStore();
        let user_data = (store.user[`${prop}`] = data);
        setStore((prev) => ({
          ...prev,
          user_data,
        }));
      },

      updateUserProfile: async (data) => {
        let response = await fetch(`${API_URL}/api/detalles-usuario`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
        if (response.status == 204 || response.status == 201) {
          // let data = await response.json();
          alert("Datos Actualizados!");
          getActions().getUserDetails();
          return true;
        } else return console.log("Ocurrio un error", response.status);
      },

      putImage: async (data) => {
        let response = await fetch(`${API_URL}/api/detalles-usuario/imagen`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
        if (response.status == 204 || response.status == 201) {
          // let data = await response.json();
          console.log("Foto de perfil Actualizada!");
          getActions().getUserDetails();
          return true;
        } else return console.log("Ocurrio un error", response.status);
      },

      publishPost: async (data) => {
        let response = await fetch(`${API_URL}/api/encontrar-gamers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          alert("Anuncio Publicado!");
          getActions().getPosts();
          return true;
        } else return console.log("Ocurrio un error", response.status);
      },

      publishComment: async(data) => {
        let response = await fetch(`${API_URL}/api/encontrar-gamers/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const data = await response.json();
          alert("Comentario Publicado!");
          getActions().getComments();
          return true;
        } else return console.log("Ocurrio un error", response.status);
      },

      getPosts: async () => {
        let response = await fetch(`${API_URL}/api/encontrar-gamers/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          let data = await response.json();
          setStore({ posts: data.results });
          return true;
        } else return console.log("Ocurrio un error", response.status);
      },

      getComments: async () => {
        let response = await fetch(`${API_URL}/api/encontrar-gamers/comments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          let data = await response.json();
          setStore({ comments: data.results });
          return true;
        } else return console.log("Ocurrio un error", response.status);
      },

      getProfiles: async (data) => {
        let response = await fetch(`${API_URL}/api/user-profiles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          let data = await response.json();
          setStore({ profiles: data.results });
          return true;
        } else return console.log("Ocurrio un error", response.status);
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
    },
  };
};

export default getState;
