import http from '../http-common';

const EntryActionGroupDataService = {
	async getList() {
		const response = await http.get("/entry-action-group");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/entry-action-group/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/entry-action-group", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/entry-action-group/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/entry-action-group/${id}`)
		return response.data;
	},
};

export default EntryActionGroupDataService;