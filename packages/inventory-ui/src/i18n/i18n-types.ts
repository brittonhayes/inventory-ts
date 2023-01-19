// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString } from 'typesafe-i18n';

export type BaseTranslation = BaseTranslationType;
export type BaseLocale = 'en';

export type Locales = 'en' | 'es';

export type Translation = RootTranslation;

export type Translations = RootTranslation;

type RootTranslation = {
	/**
	 * L​a​s​t​ ​u​p​d​a​t​e​d
	 */
	lastUpdated: string;
	/**
	 * C​r​e​a​t​e
	 */
	create: string;
	home: {
		/**
		 * H​o​m​e
		 */
		title: string;
		/**
		 * W​o​r​k​ ​i​n​ ​p​r​o​g​r​e​s​s​ ​.​.​.
		 */
		subtitle: string;
	};
	maintenance: {
		/**
		 * M​a​i​n​t​e​n​a​n​c​e
		 */
		title: string;
		/**
		 * M​a​i​n​t​e​n​a​n​c​e​ ​t​a​s​k​s​ ​a​n​d​ ​g​u​i​d​e​s​.
		 */
		subtitle: string;
	};
	guides: {
		/**
		 * G​u​i​d​e​s
		 */
		title: string;
		/**
		 * Y​o​u​r​ ​a​v​a​i​l​a​b​l​e​ ​v​e​h​i​c​l​e​ ​m​a​i​n​t​e​n​a​n​c​e​ ​g​u​i​d​e​s​.
		 */
		subtitle: string;
		button: {
			/**
			 * A​d​d​ ​g​u​i​d​e
			 */
			add: string;
		};
		create: {
			/**
			 * C​r​e​a​t​e​ ​g​u​i​d​e
			 */
			title: string;
			/**
			 * C​r​e​a​t​e​ ​a​ ​n​e​w​ ​m​a​i​n​t​e​n​a​n​c​e​ ​g​u​i​d​e​.
			 */
			subtitle: string;
			form: {
				/**
				 * N​a​m​e
				 */
				name: string;
				/**
				 * V​e​h​i​c​l​e
				 */
				vehicle: string;
				/**
				 * S​e​l​e​c​t​ ​v​e​h​i​c​l​e
				 */
				selectVehicle: string;
			};
		};
		table: {
			columns: {
				/**
				 * N​a​m​e
				 */
				name: string;
				/**
				 * V​e​h​i​c​l​e
				 */
				vehicle: string;
			};
		};
	};
	tasks: {
		/**
		 * M​a​i​n​t​e​n​a​n​c​e​ ​T​a​s​k​s
		 */
		title: string;
		/**
		 * L​i​s​t​ ​o​f​ ​m​a​i​n​t​e​n​a​n​c​e​ ​t​a​s​k​s​.
		 */
		subtitle: string;
		button: {
			/**
			 * A​d​d​ ​t​a​s​k
			 */
			add: string;
		};
		create: {
			/**
			 * C​r​e​a​t​e​ ​t​a​s​k
			 */
			title: string;
			/**
			 * C​r​e​a​t​e​ ​a​ ​n​e​w​ ​m​a​i​n​t​e​n​a​n​c​e​ ​t​a​s​k​.
			 */
			subtitle: string;
			form: {
				/**
				 * N​a​m​e
				 */
				name: string;
				/**
				 * A​s​s​i​g​n​e​e
				 */
				assignee: string;
				/**
				 * D​u​e​ ​d​a​t​e
				 */
				dueDate: string;
				/**
				 * S​t​a​t​u​s
				 */
				status: string;
				/**
				 * S​e​l​e​c​t​ ​s​t​a​t​u​s
				 */
				selectStatus: string;
				/**
				 * P​e​n​d​i​n​g
				 */
				pending: string;
				/**
				 * C​o​m​p​l​e​t​e​d
				 */
				completed: string;
				/**
				 * C​a​n​c​e​l​l​e​d
				 */
				cancelled: string;
			};
		};
		table: {
			columns: {
				/**
				 * N​a​m​e
				 */
				name: string;
				/**
				 * A​s​s​i​g​n​e​e
				 */
				assignee: string;
				/**
				 * D​u​e​ ​d​a​t​e
				 */
				dueDate: string;
			};
		};
	};
	vehicles: {
		/**
		 * V​e​h​i​c​l​e​s
		 */
		title: string;
		/**
		 * Y​o​u​r​ ​c​u​r​r​e​n​t​l​y​ ​a​c​t​i​v​e​ ​v​e​h​i​c​l​e​s​.
		 */
		subtitle: string;
		button: {
			/**
			 * A​d​d​ ​v​e​h​i​c​l​e
			 */
			add: string;
		};
		table: {
			columns: {
				/**
				 * N​a​m​e
				 */
				name: string;
				/**
				 * M​a​k​e
				 */
				make: string;
				/**
				 * M​o​d​e​l
				 */
				model: string;
				/**
				 * H​o​u​r​s
				 */
				hours: string;
				/**
				 * T​y​p​e
				 */
				type: string;
			};
		};
	};
	employees: {
		/**
		 * E​m​p​l​o​y​e​e​s
		 */
		title: string;
		/**
		 * L​i​s​t​ ​o​f​ ​e​m​p​l​o​y​e​e​s​.
		 */
		subtitle: string;
		button: {
			/**
			 * A​d​d​ ​e​m​p​l​o​y​e​e
			 */
			add: string;
		};
		table: {
			columns: {
				/**
				 * N​a​m​e
				 */
				name: string;
			};
		};
	};
};

export type TranslationFunctions = {
	/**
	 * Last updated
	 */
	lastUpdated: () => LocalizedString;
	/**
	 * Create
	 */
	create: () => LocalizedString;
	home: {
		/**
		 * Home
		 */
		title: () => LocalizedString;
		/**
		 * Work in progress ...
		 */
		subtitle: () => LocalizedString;
	};
	maintenance: {
		/**
		 * Maintenance
		 */
		title: () => LocalizedString;
		/**
		 * Maintenance tasks and guides.
		 */
		subtitle: () => LocalizedString;
	};
	guides: {
		/**
		 * Guides
		 */
		title: () => LocalizedString;
		/**
		 * Your available vehicle maintenance guides.
		 */
		subtitle: () => LocalizedString;
		button: {
			/**
			 * Add guide
			 */
			add: () => LocalizedString;
		};
		create: {
			/**
			 * Create guide
			 */
			title: () => LocalizedString;
			/**
			 * Create a new maintenance guide.
			 */
			subtitle: () => LocalizedString;
			form: {
				/**
				 * Name
				 */
				name: () => LocalizedString;
				/**
				 * Vehicle
				 */
				vehicle: () => LocalizedString;
				/**
				 * Select vehicle
				 */
				selectVehicle: () => LocalizedString;
			};
		};
		table: {
			columns: {
				/**
				 * Name
				 */
				name: () => LocalizedString;
				/**
				 * Vehicle
				 */
				vehicle: () => LocalizedString;
			};
		};
	};
	tasks: {
		/**
		 * Maintenance Tasks
		 */
		title: () => LocalizedString;
		/**
		 * List of maintenance tasks.
		 */
		subtitle: () => LocalizedString;
		button: {
			/**
			 * Add task
			 */
			add: () => LocalizedString;
		};
		create: {
			/**
			 * Create task
			 */
			title: () => LocalizedString;
			/**
			 * Create a new maintenance task.
			 */
			subtitle: () => LocalizedString;
			form: {
				/**
				 * Name
				 */
				name: () => LocalizedString;
				/**
				 * Assignee
				 */
				assignee: () => LocalizedString;
				/**
				 * Due date
				 */
				dueDate: () => LocalizedString;
				/**
				 * Status
				 */
				status: () => LocalizedString;
				/**
				 * Select status
				 */
				selectStatus: () => LocalizedString;
				/**
				 * Pending
				 */
				pending: () => LocalizedString;
				/**
				 * Completed
				 */
				completed: () => LocalizedString;
				/**
				 * Cancelled
				 */
				cancelled: () => LocalizedString;
			};
		};
		table: {
			columns: {
				/**
				 * Name
				 */
				name: () => LocalizedString;
				/**
				 * Assignee
				 */
				assignee: () => LocalizedString;
				/**
				 * Due date
				 */
				dueDate: () => LocalizedString;
			};
		};
	};
	vehicles: {
		/**
		 * Vehicles
		 */
		title: () => LocalizedString;
		/**
		 * Your currently active vehicles.
		 */
		subtitle: () => LocalizedString;
		button: {
			/**
			 * Add vehicle
			 */
			add: () => LocalizedString;
		};
		table: {
			columns: {
				/**
				 * Name
				 */
				name: () => LocalizedString;
				/**
				 * Make
				 */
				make: () => LocalizedString;
				/**
				 * Model
				 */
				model: () => LocalizedString;
				/**
				 * Hours
				 */
				hours: () => LocalizedString;
				/**
				 * Type
				 */
				type: () => LocalizedString;
			};
		};
	};
	employees: {
		/**
		 * Employees
		 */
		title: () => LocalizedString;
		/**
		 * List of employees.
		 */
		subtitle: () => LocalizedString;
		button: {
			/**
			 * Add employee
			 */
			add: () => LocalizedString;
		};
		table: {
			columns: {
				/**
				 * Name
				 */
				name: () => LocalizedString;
			};
		};
	};
};

export type Formatters = {};
