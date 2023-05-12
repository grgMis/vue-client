import http from '../http-common';

const FieldService = {
	async getList() {
		const response = await http.get("/field");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/field/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/field", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/field/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/field/${id}`)
		return response.data;
	},
};

export default EquipmentStateService;