import http from '../http-common';

const EquipmentService = {
	async getListByState(equipmnetStateId) {
		const response = await http.get(`/equipment?equipment_state_id=${equipmnetStateId}`);
		return response.data;
	},

	async getList() {
		const response = await http.get('/equipment');
		return response.data;
	},

	async get(equipmentId) {
		const response = await http.get(`/equipment/${equipmentId}`);
		return response.data;
	},

	async create(equipmentModelId, equipmentStateId, requestData) {
		const response = await http.post(`/equipment?equipment_model_id=${equipmentModelId}&equipment_state_id=${equipmentStateId}`, requestData);
		return response.data;
	},

	async updateState(equipmentId, equipmentStateId) {
		const response = await http.put(`/equipment/${equipmentId}?equipment_state_id=${equipmentStateId}`);
		return response.data;
	},

	async update(equipmentId, equipmentModelId, equipmentStateId, requestData) {
		const response = await http.put(`/equipment/${equipmentId}?equipment_model_id=${equipmentModelId}&equipment_state_id=${equipmentStateId}`, requestData);
		return response.data;
	},

	async delete(equipmentId) {
		const response = await http.delete(`/equipment/${equipmentId}`)
		return response.data;
	},
};

export default EquipmentService;