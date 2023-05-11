import http from '../http-common';

const RepairActionGroupDataService = {
	async getList() {
		const response = await http.get("/repair-action-group");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/repair-action-group/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/repair-action-group", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/repair-action-group/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/repair-action-group/${id}`)
		return response.data;
	},
};

export default RepairActionGroupDataService;