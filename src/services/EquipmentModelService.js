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

	async create(equipmentClassId, requestData) {
		const response = await http.post(`/equipment-model?equipment_class_id=${equipmentClassId}`, requestData);
		return response.data;
	},

	async update(equipmentModelId, equipmentClassId, requestData) {
		const response = await http.put(`/equipment-model/${equipmentModelId}?equipment_class_id=${equipmentClassId}`, requestData);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/equipment-model/${id}`)
		return response.data;
	},
};

export default EquipmentModelService;