import http from '../http-common';

const ActionStateService = {
	async getList() {
		const response = await http.get("/action-state");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/action-state/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/action-state", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/action-state/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/action-state/${id}`)
		return response.data;
	},
};

export default ActionStateService;