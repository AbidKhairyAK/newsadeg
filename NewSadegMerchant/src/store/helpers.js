export const isActionIncludes = params => action => params
	.map(param => param.type)
	.includes(action.type) 