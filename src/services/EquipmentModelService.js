import http from '../http-common';

const EquipmentModelService = {
	async getListByEquipClass(equipmentClassId) {
		const response = await http.get(`/equipment-model?equipment_class_id=${equipmentClassId}`);
		return response.data;
	},

	async getList() {
		const response = await http.get("/equipment-model");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/equipment-model/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/equipment-model", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/equipment-model/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/equipment-model/${id}`)
		return response.data;
	},
};

export default EquipmentModelService;