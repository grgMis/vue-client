import http from '../http-common'

const UserService = {
	async getList() {
		const response = await http.get('/user');
		return response.data;
	},

	async getListByPost(employeePostId) {
		const response = await http.get(`/user?employee_post_id=${employeePostId}`);
		return response.data;
	},

	async getByLogin(userLogin) {
		const response = await http.get(`/user/auth?user_login=${userLogin}`);
		return response.data;
	},

	async get(userId) {
		const response = await http.get(`/user/${userId}`);
		return response.data;
	},

	async create(userRoleId, employeeId, requestData) {
		const response = await http.post(`/user?user_role_id=${userRoleId}&employee_id=${employeeId}`, requestData);
		return response.data;
	},

	async update(userId, userRoleId, employeeId, requestData) {
		const response = await http.put(`/user/${userId}?user_role_id=${userRoleId}&employee_id=${employeeId}`, requestData);
		return response.data;
	},

	async delete(userId) {
		const response = await http.delete(`/user/${userId}`);
		return response.data;
	}
}

export default UserService;