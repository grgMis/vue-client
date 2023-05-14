import http from '../http-common';

const DeptTypeService = {
	async getList() {
		const response = await http.get('/dept-type');
		return response.data;
	},

	async get(deptTypeId) {
		const response = await http.get(`/dept-type/${deptTypeId}`);
		return response.data;
	},

	async create(requestData) {
		const response = await http.post('/dept-type', requestData);
		return response.data;
	},

	async update(deptTypeId, requestData) {
		const response = await http.put(`/dept-type/${deptTypeId}`, requestData);
		return response.data;
	},

	async delete(deptTypeId) {
		const response = await http.delete(`/dept-type/${deptTypeId}`)
		return response.data;
	},
};

export default DeptTypeService;