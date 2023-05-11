import http from '../http-common';

const EquipmentCategoryDataService = {
	async getList() {
		const response = await http.get("/equipment-category");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/equipment-category/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/equipment-category", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/equipment-category/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/equipment-category/${id}`)
		return response.data;
	},
}

export default EquipmentCategoryDataService;