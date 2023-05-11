import http from '../http-common';

const RepairActionDataService = {
	async getList() {
		const response = await http.get("/repair-action");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/repair-action/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/repair-action", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/repair-action/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/repair-action/${id}`)
		return response.data;
	},
};

export default RepairActionDataService;