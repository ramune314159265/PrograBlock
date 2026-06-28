const getByPath = (obj, path) => {
	return path.reduce((cur, key) => {
		return cur[key];
	}, obj);
}

const setByPath = (obj, path, value) => {
	if (path.length === 0) return;
	const last = path[path.length - 1];
	const parent = path.slice(0, -1).reduce((cur, key) => {
		if (cur[key] == null) cur[key] = {};
		return cur[key];
	}, obj);
	parent[last] = value;
}

const deleteByPath = (obj, path) => {
	if (path.length === 0) return;
	const last = path[path.length - 1];
	const parent = getByPath(obj, path.slice(0, -1));
	if (Array.isArray(parent)) {
		parent.splice(Number(last), 1);
	} else {
		delete parent[last];
	}
}

export const moveByPath = (obj, fromPath, toPath) => {
	const value = getByPath(obj, fromPath);
	setByPath(obj, toPath, value);
	deleteByPath(obj, fromPath);
	return obj;
}
