import http from '../http-common';

const ActionGroupService = {
	async getList() {
		const response = await http.get('/action-group');
		return response.data;
	},

	async get(id) {
		const response = await http.get(`/action-group/${id}`);
		return response.data;
	},

	async create(data) {
		const response = await http.post('/eaction-group', data);
		return response.data;
	},

	async update(id, data) {
		const response = await http.put(`/action-group/${id}`, data);
		return response.data;
	},

	async delete(id) {
		const response = await http.delete(`/action-group/${id}`)
		return response.data;
	},
};

export default ActionGroupService;