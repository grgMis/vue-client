import http from '../http-common'

const ActionCompositionStateService = {
	async getList() {
		const response = await http.get('/action-composition-state');
		return response.data;
	},

	async get(actionCompositionStateId) {
		const response = await http.get(`/action-composition-state/${actionCompositionStateId}`);
		return response.data;
	},

	async create(requestData) {
		const response = await http.post('/action-composition-state', requestData);
		return response.data;
	},

	async update(actionCompositionStateId, requestData) {
		const response = await http.put(`/action-composition-state/${actionCompositionStateId}`, requestData);
		return response.data;
	},

	async delete(actionCompositionStateId) {
		const response = await http.delete(`/action-composition-state/${actionCompositionStateId}`);
		return response.data;
	}
}

export default ActionCompositionStateService;