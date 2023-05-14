import http from '../http-common';

const EquipmentStateService = {
	async getList() {
		const response = await http.get("/equipment-state");
		return response.data;
	},

	async get(equipmentStateId) {
		const response = await http.get(`/equipment-state/${equipmentStateId}`);
		return response.data;
	},

	async create(requestData) {
		const response = await http.post("/equipment-state", requestData);
		return response.data;
	},

	async update(equipmentStateId, requestData) {
		const response = await http.put(`/equipment-state/${equipmentStateId}`, requestData);
		return response.data;
	},

	async delete(equipmentStateId) {
		const response = await http.delete(`/equipment-state/${equipmentStateId}`)
		return response.data;
	},
};

export default EquipmentStateService;