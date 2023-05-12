import http from '../http-common';

const WellService = {
	async getList() {
		const response = await http.get("/well");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/well/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/well", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/well/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/well/${id}`)
		return response.data;
	},
};

export default WellService;