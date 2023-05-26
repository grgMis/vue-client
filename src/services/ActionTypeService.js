import http from '../http-common';

const ActionTypeService = {

	async getList() {
		const response = await http.get('/action-type');
		return response.data;
	},

	async get(actionTypeId) {
		const response = await http.get(`/action-type/${actionTypeId}`);
		return response.data;
	},

	async create(requestData) {
		const response = await http.post('/action-type', requestData);
		return response.data;
	},

	async update(actionTypeId, requestData) {
		const response = await http.put(`/action-type/${actionTypeId}`, requestData);
		return response.data;
	},

	async delete(actionTypeId) {
		const response = await http.delete(`/action-type/${actionTypeId}`)
		return response.data;
	},
};

export default ActionTypeService;