import http from '../http-common';

const RepairActionTypeDataService = {
	async getList() {
		const response = await http.get("/repair-action-type");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/repair-action-type/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/repair-action-type", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/repair-action-type/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/repair-action-type/${id}`)
		return response.data;
	},
};

export default RepairActionTypeDataService;