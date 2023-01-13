import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	lastUpdated: 'Last updated',
	create: 'Create',
	home: {
		title: 'Home',
		subtitle: 'Work in progress ...',
	},
	maintenance: {
		title: 'Maintenance',
		subtitle: 'Maintenance tasks and guides.',
	},
	guides: {
		title: 'Guides',
		subtitle: 'Your available vehicle maintenance guides.',
		button: {
			add: 'Add guide',
		},
		create: {
			title: 'Create guide',
			subtitle: 'Create a new maintenance guide.',
			form: {
				name: 'Name',
				vehicle: 'Vehicle',
				selectVehicle: 'Select vehicle',
			},
		},
		table: {
			columns: {
				name: 'Name',
				vehicle: 'Vehicle',	
			}
		}
	},
	tasks: {
		title: 'Maintenance Tasks',
		subtitle: 'List of maintenance tasks.',
		button: {
			add: 'Add task',
		},
		create: {
			title: 'Create task',
			subtitle: 'Create a new maintenance task.',
			form: {
				name: 'Name',
				assignee: 'Assignee',
				dueDate: 'Due date',
				status: 'Status',
				selectStatus: 'Select status',
				pending: 'Pending',
				completed: 'Completed',
				cancelled: 'Cancelled',
			},
		},
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
		button: {
			add: 'Add vehicle',
		},
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
}

export default en
