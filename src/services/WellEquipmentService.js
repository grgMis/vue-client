import http from '../http-common';

const WellEquipmentService = {
	async getList() {
		const response = await http.get('/well-equipment');
		return response.data;
	},

	async getListByWell(wellId) {
		const response = await http.get(`/well-equipment?well_id=${wellId}`);
		return response.data;
	},

	async getListByWellAndEquipmentCategory(wellId, equipmentCategoryId) {
		const response = await http.get(`/current-equipment?well_id=${wellId}&equipment_category_id=${equipmentCategoryId}`);
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

	async deleteByEquipment(wellEquipmentId, equipmentId) {
		const response = await http.delete(`/well-equipment/${wellEquipmentId}?equipment_id=${equipmentId}`)
		return response.data;
	},
};

export default WellEquipmentService;