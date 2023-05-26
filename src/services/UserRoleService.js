import http from '../http-common'

const UserRoleService = {
	async getList() {
		const response = await http.get('/user-role');
		return response.data;
	},

	async get(userRoleId) {
		const response = await http.get(`/user-role/${userRoleId}`);
		return response.data;
	},

	async create(requestData) {
		const response = await http.post('/user-role', requestData);
		return response.data;
	},

	async update(userRoleId, requestData) {
		const response = await http.put(`/user-role/${userRoleId}`, requestData);
		return response.data;
	},

	async delete(userRoleId) {
		const response = await http.delete(`/user-role/${userRoleId}`);
		return response.data;
	}
}

export default UserRoleService;