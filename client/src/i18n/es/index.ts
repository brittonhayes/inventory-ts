import type { Translation } from '../i18n-types'

const es: Translation = {
	lastUpdated: 'Fecha actualización',
	home: {
		title: 'Dashboard',
		subtitle: 'Work in progress ...',
	},
	maintenance: {
		title: 'Mantenimiento',
		subtitle: 'Tareas de mantenimiento y guías.',
	},
	tasks: {
		title: 'Tareas de mantenimiento',
		subtitle: 'Lista de tareas de mantenimiento.',
		table: {
			columns: {
				name: 'Name',
				assignee: 'Assignee',
				dueDate: 'Due date',
			}
		}
	},
	vehicles: {
		title: 'Vehicles',
		subtitle: 'Your currently active vehicles.',
		table: {
			columns: {
				name: 'Nombre',
				make: 'Make',
				model: 'Model',
				hours: 'Hours',
				type: 'Type',
			}
		},
	},
	employees: {
		title: 'Trabajadores',
		subtitle: 'Lista de trabajadores.',
		button: {
			add: 'Agregar trabajadores',
		},
		table: {	
			columns: {
				name: 'Nombre'
			}
		}
	},
	log: `This log was called from '{fileName}'`,
}

export default es