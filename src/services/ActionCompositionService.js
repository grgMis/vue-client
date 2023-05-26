import http from '../http-common'

const ActionCompositionService = {
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