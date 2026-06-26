export const getFromPath = (object, path) => {
	return path.reduce((o, p) => {
		return o?.[p]
	}, object)
}
