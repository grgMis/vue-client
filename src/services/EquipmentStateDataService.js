import http from '../http-common';

const EquipmentStateDataService = {
	async getList() {
		const response = await http.get("/equipment-state");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/equipment-state/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/equipment-state", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/equipment-state/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/equipment-state/${id}`)
		return response.data;
	},
};

export default EquipmentStateDataService;