import { colorModes } from '../colorModes';
import { control } from './categories/control';
import { events } from './categories/events';
import { functions } from './categories/functions';
import { misc } from './categories/misc';
import { objects } from './categories/objects';
import { operators } from './categories/operators';
import { values } from './categories/values';
import { variables } from './categories/variables';

const categories = [
	values,
	operators,
	events,
	control,
	variables,
	functions,
	objects,
	misc,
]

export const toolboxContents = categories.map(category => {
	return {
		kind: 'category',
		name: category.name,
		colour: colorModes.default[category.colorId]?.colourPrimary,
		contents: category.blocks.map(block=>{
			return {
				kind: 'block',
				type: block.type,
				...block.data
			}
		})
	}
})

export const blocks = categories.flatMap(category => {
	return category.blocks.map(b => {
		return {
			...b,
			extensions: [...(b.extensions ?? []), `colours_${category.colorId}`]
		}
	})
})
