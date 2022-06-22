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

			loadRegions: async () => {
			try{	
			 	let response = await fetch("https://restcountries.com/v3.1/subregion/europe");
			 	const data = await response.json();
			 	//setStore({ europe: data});
				console.log(data)
			}catch(error){console.log(error)}
			} 
			,
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
