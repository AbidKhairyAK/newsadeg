import axios from 'axios'
import { getUser } from '@/helpers'

const services = {
	getList () {
		return axios.get(`/restaurants/${getUser().id}/menus`)
	},
}

export default services