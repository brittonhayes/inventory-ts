import type { Translation } from '../i18n-types';

const es: Translation = {
	lastUpdated: 'Fecha actualización',
	create: 'Crear',
	home: {
		title: 'Tablero',
		subtitle: 'Inconclusa...'
	},
	maintenance: {
		title: 'Mantenimiento',
		subtitle: 'Tareas de mantenimiento y guías.'
	},
	guides: {
		title: 'Guías de mantenimiento',
		subtitle: 'Lista de guías de mantenimiento.',
		button: {
			add: 'Agregar guía'
		},
		create: {
			title: 'Crear guía',
			subtitle: 'Crear una nueva guía de mantenimiento.',
			form: {
				name: 'Nombre',
				vehicle: 'Vehículo',
				selectVehicle: 'Seleccionar vehículo'
			}
		},
		table: {
			columns: {
				name: 'Nombre',
				vehicle: 'Vehículo'
			}
		}
	},
	tasks: {
		title: 'Tareas de mantenimiento',
		subtitle: 'Lista de tareas de mantenimiento.',
		button: {
			add: 'Agregar tarea'
		},
		create: {
			title: 'Crear tarea',
			subtitle: 'Crear una nueva tarea de mantenimiento.',
			form: {
				name: 'Nombre',
				assignee: 'Cesionario',
				dueDate: 'Fecha de vencimiento',
				status: 'Estado',
				selectStatus: 'Seleccionar estado',
				pending: 'Pendiente',
				completed: 'Completado',
				cancelled: 'Cancelado'
			}
		},
		table: {
			columns: {
				name: 'Nombre',
				assignee: 'Cesionario',
				dueDate: 'Fecha de vencimiento'
			}
		}
	},
	vehicles: {
		title: 'Vehículos',
		subtitle: 'Sus vehículos de trabajo.',
		button: {
			add: 'Agregar vehículo'
		},
		table: {
			columns: {
				name: 'Nombre',
				make: 'Marca',
				model: 'Modelo',
				hours: 'Hora',
				type: 'Categoría'
			}
		}
	},
	employees: {
		title: 'Trabajadores',
		subtitle: 'Lista de trabajadores.',
		button: {
			add: 'Agregar trabajadores'
		},
		table: {
			columns: {
				name: 'Nombre'
			}
		}
	}
};

export default es;
