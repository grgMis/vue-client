import http from '../http-common';

const WellStateDataService = {
	async getList() {
		const response = await http.get("/well-state");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/well-state/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/well-state", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/well-state/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/well-state/${id}`)
		return response.data;
	},
};

export default WellStateDataService;