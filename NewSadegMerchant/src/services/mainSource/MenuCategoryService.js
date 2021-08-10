import axios from 'axios'
import { getUser } from '@/helpers'

const services = {
	getList () {
		return axios.get(`/restaurants/${getUser().id}/menu-categories`)
	},
	create (name) {
		return axios.post('/menu-categories', {
			restaurant_id: getUser().id,
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