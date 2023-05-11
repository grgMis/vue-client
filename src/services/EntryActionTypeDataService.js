import http from '../http-common';

const EntryActionTypeDataService = {
	async getList() {
		const response = await http.get("/entry-action-type");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/entry-action-type/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/entry-action-type", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/entry-action-type/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/entry-action-type/${id}`)
		return response.data;
	},
};

export default EntryActionTypeDataService;