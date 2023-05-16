import http from '../http-common';

const WellEquipmentService = {
	async getListByWell(wellId) {
		const response = await http.get(`/well-equipment?well_id=${wellId}`);
		return response.data;
	},

	async getListByEquip(equipmentId) {
		const response = await http.get(`/well-equipment?equipment_id=${equipmentId}`);
		return response.data;
	},
	
	async getList() {
		const response = await http.get('/well-equipment');
		return response.data;
	},

	async get(wellEquipmentId) {
		const response = await http.get(`/well-equipment/${wellEquipmentId}`);
		return response.data;
	},

	async create(wellId, equipmentId) {
		const response = await http.post(
			`/well-equipment
			?well_id=${wellId}
			&equipment_id=${equipmentId}`
			);
		return response.data;
	},

	async update(wellEquipmentId) {
		const response = await http.put(`/well-equipment/${wellEquipmentId}`);
		return response.data;
	},

	async delete(wellEquipmentId) {
		const response = await http.delete(`/well-equipment/${wellEquipmentId}`)
		return response.data;
	},
};

export default WellEquipmentService;