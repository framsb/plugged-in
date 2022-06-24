const getState = ({ getStore, getActions, setStore }) => {
	const API_URL = process.env.BACKEND_URL;
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			games: [],
			europe: []
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
				  setStore({isLoggedIn: true})
				  return true;
				} else return false;
			},

			logOutUser: () => {
				localStorage.removeItem("token");
				setStore({isLoggedIn: false})
			}, 

			privateData: async () => {
				let response = await fetch(`${API_URL}/api/encontrar-gamers`, {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				  },
				});
				let data = await response.json();
				console.log("Esta es mi data privada", data);
			  },

			loadRegions: async () => {
			try{	
			 	let response = await fetch("https://restcountries.com/v3.1/subregion/europe");
			 	const data = await response.json();
			 	//setStore({ europe: data});
				console.log(data)
			}catch(error){console.log(error)}
			},
			
			loadGames: async () => {
				const url = "https://api.igdb.com/v4/games";
				let response = await fetch(url ,{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Client-ID": "vv0iej57iqk1yc5vok6jxv5qwewuih",
						Authorization: "Bearer m62v47lki4it9tj1uku36n7x58fsc0"
					},
				});
				const data = await response.json();
				setStore({ games: data.results })
				console.log("Estos son mis juegos", data);
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
		}
	};
};

export default getState;
