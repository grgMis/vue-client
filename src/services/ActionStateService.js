import http from '../http-common';

const ActionStateService = {
	async getList() {
		const response = await http.get('/action-state');
		return response.data;
	},

	async get(actionStateId) {
		const response = await http.get(`/action-state/${actionStateId}`);
		return response.data;
	},

	async create(requestData) {
		const response = await http.post('/action-state', requestData);
		return response.data;
	},

	async update(actionStateId, requestData) {
		const response = await http.put(`/action-state/${actionStateId}`, requestData);
		return response.data;
	},

	async delete(actionStateId) {
		const response = await http.delete(`/action-state/${actionStateId}`)
		return response.data;
	},
};

export default ActionStateService;