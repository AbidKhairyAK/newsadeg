import { configureStore } from '@reduxjs/toolkit'

import auth from './auth'
import master from './master'
import orders from './orders'
import restaurant from './restaurant'

const store = configureStore({
	reducer: {
		auth,
		master,
		orders,
		restaurant,
	}
})

export default store