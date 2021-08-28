import axios from 'axios'

const services = {
	getSaudiCities () {
		return axios.get('/sa-city')
	},
}

export default services