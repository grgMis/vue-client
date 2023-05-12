import http from '../http-common';

const DeptService = {
	async getList() {
		const response = await http.get("/dept");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/dept/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/dept", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/dept/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/dept/${id}`)
		return response.data;
	},
};

export default DeptService;