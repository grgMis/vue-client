import http from '../http-common'

const UserService = {
	async getList() {
		const response = await http.get('/user');
		return response.data;
	},

	async get(userId) {
		const response = await http.get(`/user/${userId}`);
		return response.data;
	},

	async create(userRoleId, requestData) {
		const response = await http.post(`/user?user_role_id=${userRoleId}`, requestData);
		return response.data;
	},

	async update(userId, userRoleId, requestData) {
		const response = await http.put(`/user/${userId}?user_role_id=${userRoleId}`, requestData);
		return response.data;
	},

	async delete(userId) {
		const response = await http.delete(`/user/${userId}`);
		return response.data;
	}
}

export default UserService;