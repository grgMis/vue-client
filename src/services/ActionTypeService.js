import http from '../http-common';

const ActionTypeService = {
	async getList() {
		const response = await http.get("/action-type");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/action-type/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/action-type", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/action-type/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/action-type/${id}`)
		return response.data;
	},
};

export default ActionTypeService;