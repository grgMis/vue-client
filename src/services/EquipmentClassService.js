import http from '../http-common';

const EquipmentClassService = {
	async getList() {
		const response = await http.get('/equipment-class');
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/equipment-class/${id}`);
		return response.data;
	},

	async create(equipmentCategoryId, requestData) {
		const response = await http.post(`/equipment-class?equipment_category_id=${equipmentCategoryId}`, requestData);
		return response.data;
	},

	async update(equipmentClassId, equipmentCategoryId, requestData) {
		const response = await http.put(`/equipment-class/${equipmentClassId}?equipment_category_id=${equipmentCategoryId}`, requestData);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/equipment-class/${id}`)
		return response.data;
	},
};

export default EquipmentClassService;