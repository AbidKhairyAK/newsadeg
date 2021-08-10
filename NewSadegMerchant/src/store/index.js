import { configureStore } from '@reduxjs/toolkit'

import auth from './auth'
import master from './master'
import restaurant from './restaurant'

const store = configureStore({
	reducer: {
		auth,
		master,
		restaurant,
	}
})

export default store