import http from '../http-common';

const EquipmentCategoryService = {
	async getList() {
		const response = await http.get("/equipment-category");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/equipment-category/${id}`);
		return response.data;
	},

	async create(requestData) {
		const response = await http.post("/equipment-category", requestData);
		return response.data;
	},

	async update(equipmentCategoryId, requestData) {
		const response = await http.put(`/equipment-category/${equipmentCategoryId}`, requestData);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/equipment-category/${id}`)
		return response.data;
	},
}

export default EquipmentCategoryService;