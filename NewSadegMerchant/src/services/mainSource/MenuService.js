import axios from 'axios'
import { getUser } from '@/helpers'

const services = {
	getList () {
		return axios.get(`/restaurants/${getUser().id}/menus`)
	},
	create(formData) {
		return axios.post('/menus', formData)
	}
}

export default services