import http from '../http-common';

const WellStateService = {
	async getList() {
		const response = await http.get('/well-state');
		return response.data;
	},

	async get(wellStateId) {
		const response = await http.get(`/well-state/${wellStateId}`);
		return response.data;
	},

	async create(requestData) {
		const response = await http.post('/well-state', requestData);
		return response.data;
	},

	async update(wellStateId, requestData) {
		const response = await http.put(`/well-state/${wellStateId}`, requestData);
		return response.data;
	},

	async delete(wellStateId) {
		const response = await http.delete(`/well-state/${wellStateId}`)
		return response.data;
	},
};

export default WellStateService;