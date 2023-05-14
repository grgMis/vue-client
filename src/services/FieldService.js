import http from '../http-common';

const FieldService = {
	async getList() {
		const response = await http.get('/field');
		return response.data;
	},

	async get(fieldId) {
		const response = await http.get(`/field/${fieldId}`);
		return response.data;
	},

	async create(requestData) {
		const response = await http.post('/field', requestData);
		return response.data;
	},

	async update(fieldId, requestData) {
		const response = await http.put(`/field/${fieldId}`, requestData);
		return response.data;
	},

	async delete(fieldId) {
		const response = await http.delete(`/field/${fieldId}`)
		return response.data;
	},
};

export default FieldService;