import http from '../http-common';

const EntryActionDataService = {
	async getList() {
		const response = await http.get("/entry-action");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/entry-action/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/entry-action", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/entry-action/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/entry-action/${id}`)
		return response.data;
	},
};

export default EntryActionDataService;