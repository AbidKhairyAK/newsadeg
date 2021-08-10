import { configureStore } from '@reduxjs/toolkit'

import auth from './auth'
import master from './master'

const store = configureStore({
	reducer: {
		auth,
		master,
	}
})

export default store