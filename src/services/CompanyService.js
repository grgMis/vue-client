import http from '../http-common';

const CompanyService = {

	async getList() {
		const response = await http.get('/company');
		return response.data;
	},

	async get(companyId) {
		const response = await http.get(`/company/${companyId}`);
		return response.data;
	},

	async create(fieldId, requestData) {
		const response = await http.post(`/company?field_id=${fieldId}`, requestData);
		return response.data;
	},

	async update(companyId, fieldId, requestData) {
		const response = await http.put(`/company/${companyId}?field_id=${fieldId}`, requestData);
		return response.data;
	},

	async delete(companyId) {
		const response = await http.delete(`/company/${companyId}`)
		return response.data;
	},
};

export default CompanyService;