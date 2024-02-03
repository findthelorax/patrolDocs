import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Map from './Map';
import Patrollers from './Patrollers';
import IncidentLogs from './IncidentLogs';
import Areas from './Areas';
import Lifts from './Lifts';
import Trails from './Trails';
import Equipment from './Equipment';
import Lodges from './Lodges';
import Huts from './Huts';
import FirstAidRooms from './FirstAidRooms';
import Logs from './Logs';
import Settings from './Settings';

const routes = [
	{ path: '/dashboard', component: Dashboard },
	{ path: '/map', component: Map },
	{ path: '/incidentLogs', component: IncidentLogs },
	{ path: '/areas', component: Areas },
	{ path: '/firstAidRooms', component: FirstAidRooms },
	{ path: '/patrollers', component: Patrollers },
	{ path: '/huts', component: Huts },
	{ path: '/lifts', component: Lifts },
	{ path: '/trails', component: Trails },
	{ path: '/lodges', component: Lodges },
	{ path: '/equipment', component: Equipment },
	{ path: '/logs', component: Logs },
	{ path: '/settings', component: Settings },
	{ path: '*', component: Dashboard },
];

const AppRoutes = () => (
	<Routes>
		{routes.map(({ path, component: Component }) => (
			<Route
				key={path}
				path={path}
				element={<Component />}
			/>
		))}
	</Routes>
);

export default AppRoutes;