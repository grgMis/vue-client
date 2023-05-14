import http from '../http-common';

const EquipmentService = {
	async getList() {
		const response = await http.get('/equipment');
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/equipment/${id}`);
		return response.data;
	},

	async create(equipmentModelId, equipmentStateId, requestData) {
		const response = await http.post(`/equipment?equipment_model_id=${equipmentModelId}&equipment_state_id=${equipmentStateId}`, requestData);
		return response.data;
	},

	async update(equipmentId, equipmentModelId, equipmentStateId, requestData) {
		const response = await http.put(`/equipment/${equipmentId}?equipment_model_id=${equipmentModelId}&equipment_state_id=${equipmentStateId}`, requestData);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/equipment/${id}`)
		return response.data;
	},
};

export default EquipmentService;