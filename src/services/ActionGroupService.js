import http from '../http-common';

const ActionGroupService = {
	async getList() {
		const response = await http.get('/action-group');
		return response.data;
	},

	async get(actionGroupId) {
		const response = await http.get(`/action-group/${actionGroupId}`);
		return response.data;
	},

	async create(requestData) {
		const response = await http.post('/action-group', requestData);
		return response.data;
	},

	async update(actionGroupId, requestData) {
		const response = await http.put(`/action-group/${actionGroupId}`, requestData);
		return response.data;
	},

	async delete(actionGroupId) {
		const response = await http.delete(`/action-group/${actionGroupId}`)
		return response.data;
	},
};

export default ActionGroupService;