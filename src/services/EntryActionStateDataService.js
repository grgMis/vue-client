import http from '../http-common';

const EntryActionStateDataService = {
	async getList() {
		const response = await http.get("/entry-action-state");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/entry-action-state/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/entry-action-state", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/entry-action-state/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/entry-action-state/${id}`)
		return response.data;
	},
};

export default EntryActionStateDataService;