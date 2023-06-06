import http from '../http-common'

const EmployeePostService = {
	async getList() {
		const response = await http.get('/employee-post');
		return response.data;
	},

	async get(employeePostId) {
		const response = await http.get(`/employee-post/${employeePostId}`);
		return response.data;
	},

	async create(requestData) {
		const response = await http.post('/employee-post', requestData);
		return response.data;
	},

	async update(employeePostId, requestData) {
		const response = await http.put(`/employee-post/${employeePostId}`, requestData);
		return response.data;
	},

	async delete(employeePostId) {
		const response = await http.delete(`/employee-post/${employeePostId}`);
		return response.data;
	}
}

export default EmployeePostService;