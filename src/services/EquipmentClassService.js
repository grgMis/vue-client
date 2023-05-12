import http from '../http-common';

const EquipmentClassService = {
	async getList() {
		const response = await http.get("/equipment-class");
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/equipment-class/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post("/equipment-class", data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/equipment-class/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/equipment-class/${id}`)
		return response.data;
	},
};

export default EquipmentClassService;