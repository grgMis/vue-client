import http from '../http-common';

const ACtionService = {
	async getList() {
		const response = await http.get("/action");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/action/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/action", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/action/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/action/${id}`)
		return response.data;
	},
};

export default ACtionService;