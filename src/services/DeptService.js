import http from '../http-common';

const DeptService = {
	async getList() {
		const response = await http.get('/dept');
		return response.data;
	},

	async get(deptId) {
		const response = await http.get(`/dept/${deptId}`);
		return response.data;
	},

	async create(deptTypeId, fieldId, requestData) {
		const response = await http.post(`/dept?dept_type_id=${deptTypeId}&field_id=${fieldId}`, requestData);
		return response.data;
	},

	async update(deptId, deptTypeId, fieldId, requestData) {
		const response = await http.put(`/dept/${deptId}?dept_type_id=${deptTypeId}&field_id=${fieldId}`, requestData);
		return response.data;
	},

	async delete(deptId) {
		const response = await http.delete(`/dept/${deptId}`)
		return response.data;
	},
};

export default DeptService;