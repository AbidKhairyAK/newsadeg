import axios from 'axios'
import { getRestaurant } from '@/helpers'

const services = {
	getList () {
		return axios.get(`/restaurants/${getRestaurant().id}/drivers`)
	},
	detail (id) {
		return axios.get('/drivers-restaurant/' + id)
	},
	create(formData) {
		return axios.post('/drivers-restaurant', formData)
	},
	update(id, formData) {
		return axios.post('/drivers-restaurant/' + id, formData)
	},
	delete(id) {
		return axios.delete('/drivers-restaurant/' + id)
	},
}

export default services