export const isActionIncludes = params => action => params
	.map(param => param.type)
	.includes(action.type) 

export const getLoadingStatus = action => {
	const statusMap = {
		pending: true,
		rejected: false,
		fulfilled: false
	}

	return statusMap[action.type.split('/')[2]]
}