import http from '../http-common';

const WellEquipmentService = {
	async getList() {
		const response = await http.get("/well-equipment");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/well-equipment/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/well-equipment", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/well-equipment/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/well-equipment/${id}`)
		return response.data;
	},
};

export default WellEquipmentService;