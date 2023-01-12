import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	lastUpdated: 'Last updated',
	home: {
		title: 'Dashboard',
		subtitle: 'Work in progress ...',
	},
	maintenance: {
		title: 'Maintenance',
		subtitle: 'Maintenance tasks and guides.',
	},
	tasks: {
		title: 'Maintenance Tasks',
		subtitle: 'List of maintenance tasks.',
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
				name: 'Name',
				make: 'Make',
				model: 'Model',
				hours: 'Hours',
				type: 'Type',
			}
		},
	},
	employees: {
		title: 'Employees',
		subtitle: 'List of employees.',
		button: {
			add: 'Add employee',
		},
		table: {
			columns: {
				name: 'Name'
			}
		}
	},
	log: `This log was called from '{fileName:string}'`,
}

export default en
