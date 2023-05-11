import http from '../http-common';

const DeptTypeDataService = {
	async getList() {
		const response = await http.get("/dept-type");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/dept-type/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/dept-type", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/dept-type/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/dept-type/${id}`)
		return response.data;
	},
};

export default DeptTypeDataService;