import http from '../http-common';

const ActionService = {
	async getList() {
		const response = await http.get('/action');
		return response.data;
	},

	async get(actionId) {
		const response = await http.get(`/action/${actionId}`);
		return response.data;
	},

	async create(wellId, userId, actionTypeId, actionStateId, requestData) {
		const response = await http.post(
			`/action
			?well_id=${wellId}
			&user_id=${userId}
			&action_type_id=${actionTypeId}
			&action_state_id=${actionStateId}`,
			 requestData
			);
		return response.data;
	},

	async updateCurrentAction(actionId, actionStateId, requestData) {
		const response = await http.put(
			`/action/${actionId}
			?action_state_id=${actionStateId}`,
			 requestData
			);
		return response.data;
	},

	async update(actionId, wellId, userId, actionTypeId, actionStateId, requestData) {
		const response = await http.put(
			`/action/${actionId}
			?well_id=${wellId}
			&user_id=${userId}
			&action_type_id=${actionTypeId}
			&action_state_id=${actionStateId}`,
			 requestData
			);
		return response.data;
	},

	async closeAction(actionId, actionStateId) {
		const response = await http.put(
			`/action/${actionId}
			?action_state_id=${actionStateId}`
			);
		return response.data;
	},

	async updateState(actionId, actionStateId, requestData) {
		const response = await http.put(
			`/action/${actionId}
			?action_state_id=${actionStateId}`,
			 requestData
			);
		return response.data;
	},

	async delete(actionId) {
		const response = await http.delete(`/action/${actionId}`)
		return response.data;
	},
};

export default ActionService;