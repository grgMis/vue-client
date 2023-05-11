import http from '../http-common';

const RepairActionStateDataService = {
	async getList() {
		const response = await http.get("/repair-action-state");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/repair-action-state/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/repair-action-state", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/repair-action-state/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/repair-action-state/${id}`)
		return response.data;
	},
};

export default RepairActionStateDataService;