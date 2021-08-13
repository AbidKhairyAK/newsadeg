import axios from 'axios'
import { getUser } from '@/helpers'

const services = {
	getList () {
		return axios.get(`/restaurants/${getUser().id}/menus`)
	},
	create(formData) {
		return axios.post('/menus', formData)
	},
	update(id, formData) {
		return axios.post('/menus/' + id, formData)
	},
	delete(id) {
		return axios.delete('/menus/' + id)
	},
}

export default services