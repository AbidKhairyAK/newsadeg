import axios from 'axios'
import { getRestaurant } from '@/helpers'

const services = {
	getList () {
		return axios.get(`/restaurants/${getRestaurant().id}/menu-categories`)
	},
	create (name) {
		return axios.post('/menu-categories', {
			restaurant_id: getRestaurant().id,
			name
		})
	},
	update (id, name) {
		return axios.post('/menu-categories/' + id, { name })
	},
	delete (id) {
		return axios.delete('/menu-categories/' + id)
	}
}

export default services