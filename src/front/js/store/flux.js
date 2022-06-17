const getState = ({ getStore, getActions, setStore }) => {
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
			regiones: []
		},
		actions: {
			// loadRegions: async () => {
			// 	const url = "https://restcountries.com/v2/all";
			// 	let response = await fetch(url);
			// 	const data = await response.json();
			// 	setStore({ regiones: data.results });
			// },

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
