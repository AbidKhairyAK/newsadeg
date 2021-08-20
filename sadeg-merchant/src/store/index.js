import { configureStore } from '@reduxjs/toolkit'

import auth from './auth'
import event from './event'
import master from './master'
import orders from './orders'
import restaurant from './restaurant'

const store = configureStore({
	reducer: {
		auth,
		event,
		master,
		orders,
		restaurant,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware({
		serializableCheck: false
	})
})

export default store