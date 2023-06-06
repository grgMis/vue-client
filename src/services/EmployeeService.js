import http from '../http-common'

const EmployeeService = {
	async getList() {
		const response = await http.get('/employee');
		return response.data;
	},

	async get(employeeId) {
		const response = await http.get(`/employee/${employeeId}`);
		return response.data;
	},

	async create(employeePostId, requestData) {
		const response = await http.post(`/employee?employee_post_id=${employeePostId}`, requestData);
		return response.data;
	},

	async update(employeeId, employeePostId, requestData) {
		const response = await http.put(`/employee/${employeeId}?employee_post_id=${employeePostId}`, requestData);
		return response.data;
	},

	async delete(employeeId) {
		const response = await http.delete(`/employee/${employeeId}`);
		return response.data;
	}
}

export default EmployeeService;