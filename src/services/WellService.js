import http from '../http-common';

const WellService = {
	async getList() {
		const response = await http.get('/well');
		return response.data;
	},

	async get(wellId) {
		const response = await http.get(`/well/${wellId}`);
		return response.data;
	},

	async create(deptId, wellStateId, requestData) {
		const response = await http.post(`/well?dept_id=${deptId}&well_state_id=${wellStateId}`, requestData);
		return response.data;
	},

	async updateState(wellId, wellStateId) {
		const response = await http.put(`/well/${wellId}?well_state_id=${wellStateId}`);
		return response.data;
	},

	async update(wellId, deptId, wellStateId, requestData) {
		const response = await http.put(`/well/${wellId}?dept_id=${deptId}&well_state=${wellStateId}`, requestData);
		return response.data;
	},

	async delete(wellId) {
		const response = await http.delete(`/well/${wellId}`)
		return response.data;
	},
};

export default WellService;