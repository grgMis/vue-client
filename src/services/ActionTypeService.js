import http from '../http-common';

const ActionTypeService = {
	async getListByGroup(actionGroupId) {
		const response = await http.get(`/action-type?action_group_id=${actionGroupId}`);
		return response.data;
	},

	async getList() {
		const response = await http.get('/action-type');
		return response.data;
	},

	async get(actionTypeId) {
		const response = await http.get(`/action-type/${actionTypeId}`);
		return response.data;
	},

	async create(actionGroupId, requestData) {
		const response = await http.post(`/action-type?action_group_id=${actionGroupId}`, requestData);
		return response.data;
	},

	async update(actionTypeId, actionGroupId, requestData) {
		const response = await http.put(`/action-type/${actionTypeId}?action_group_id=${actionGroupId}`, requestData);
		return response.data;
	},

	async delete(actionGroupId) {
		const response = await http.delete(`/action-type/${actionGroupId}`)
		return response.data;
	},
};

export default ActionTypeService;