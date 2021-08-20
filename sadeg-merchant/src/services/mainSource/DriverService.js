import axios from 'axios'

const services = {
	getList () {
		return axios.get('/drivers')
	},
	detail (id) {
		return axios.get('/drivers/' + id)
	},
	create(formData) {
		return axios.post('/drivers', formData)
	},
	update(id, formData) {
		return axios.post('/drivers/' + id, formData)
	},
	delete(id) {
		return axios.delete('/drivers/' + id)
	},
}

export default services