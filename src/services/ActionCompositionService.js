import http from '../http-common'

const ActionCompositionService = {
	async getListByAction(actionId) {
		const response = await http.get(`/action-composition?action_id=${actionId}`);
		return response.data;
	},

	async getListByWellAndEquipmentState(wellId, equipmentStateId) {
		const response = await http.get(
			`/action-composition?well_id=${wellId}&equipment_state_id=${equipmentStateId}`
			);
			return response.data;
	},

	async getListByWellAndEquipmentCategory(wellId, equipmentCategoryId) {
		const response = await http.get(
			`/action-composition?well_id=${wellId}&equipment_category_id=${equipmentCategoryId}`
			);
			return response.data;
	},

	async getList() {
		const response = await http.get('/action-composition');
		return response.data;
	},

	async get(actionCompositionId) {
		const response = await http.get(`/action-composition/${actionCompositionId}`);
		return response.data;
	},

	async create(actionId, equipmentId, actionCompositionStateId, requestData) {
		const response = await http.post(
			`/action-composition
			?action_id=${actionId}
			&equipment_id=${equipmentId}
			&action_composition_state_id=${actionCompositionStateId}`,
			requestData
		);
		return response.data;
	},

	async updateState(actionCompositionId, actionCompositionStateId, requestData) {
		const response = await http.put(
			`/action-composition/${actionCompositionId}
			?action_composition_state_id=${actionCompositionStateId}`,
			requestData
		);
		return response.data;
	},

	async update(actionCompositionId, actionId, equipmentId, actionCompositionStateId, requestData) {
		const response = await http.put(
			`/action-composition/${actionCompositionId}
			?action_id=${actionId}
			&equipment_id=${equipmentId}
			&action_composition_state_id=${actionCompositionStateId}`,
			requestData
		);
		return response.data;
	},

	async delete(actionCompositionId) {
		const response = await http.delete(`/action-composition/${actionCompositionId}`);
		return response.data;
	}
}

export default ActionCompositionService;