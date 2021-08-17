import axios from 'axios'
import { getRestaurant } from '@/helpers'

const services = {
	getList () {
		return axios.get(`/restaurants/${getRestaurant().id}/menus`)
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