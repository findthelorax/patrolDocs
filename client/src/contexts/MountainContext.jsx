import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { api as mountainApi } from '../api/MountainAPI';
import { api as equipmentApi } from '../api/EquipmentAPI';
import { api as hutApi } from '../api/HutAPI';
import { api as liftApi } from '../api/LiftAPI';
import { api as lodgeApi } from '../api/LodgeAPI';
import { api as aidRoomApi } from '../api/AidRoomAPI';
// import { api as paperworkApi } from '../api/PaperworkAPI';
import { api as patrollerApi } from '../api/PatrollerAPI';
import { api as trailApi } from '../api/TrailAPI';
import { api as incidentLogApi } from '../api/IncidentLogAPI';
import { DateContext } from './DateContext';
import { useApiData } from './useApiData';
import { locationTypes, getLocations } from '../helpers/constants';
export const MountainContext = createContext();

export const MountainProvider = ({ children }) => {
	const [selectedMountain, setSelectedMountain] = useState(null);
	const { selectedDate } = useContext(DateContext);
	const [currentDayPatrolDispatcher, setCurrentDayPatrolDispatcher] = useState(null);

	const api = {
		mountainApi,
		equipmentApi,
		hutApi,
		liftApi,
		lodgeApi,
		aidRoomApi,
		patrollerApi,
		trailApi,
		incidentLogApi,
	};

	const useMountainData = (api, method, id, date) => {
		const [data, isLoading, fetchData, setData] = useApiData(api[method], id, date);
		return [data, isLoading, fetchData, setData];
	};

	const [mountains, isMountainsLoading, fetchMountains] = useMountainData(mountainApi, 'getAllMountains');
	const [areas, isAreasLoading, fetchAreas] = useMountainData(mountainApi, 'getAllAreas', selectedMountain?._id);
	const [huts, isHutsLoading, fetchHuts] = useMountainData(hutApi, 'getAllHuts', selectedMountain?._id);
	const [lodges, isLodgesLoading, fetchLodges] = useMountainData(lodgeApi, 'getAllLodges', selectedMountain?._id);
	const [lifts, isLiftsLoading, fetchLifts] = useMountainData(liftApi, 'getAllLifts', selectedMountain?._id);
	const [trails, isTrailsLoading, fetchTrails] = useMountainData(trailApi, 'getAllTrails', selectedMountain?._id);
	const [aidRooms, isAidRoomsLoading, fetchAidRooms] = useMountainData(
		aidRoomApi,
		'getAllAidRooms',
		selectedMountain?._id
	);
	const [equipment, isEquipmentLoading, fetchEquipment] = useMountainData(
		equipmentApi,
		'getAllEquipment',
		selectedMountain?._id
	);

	const [equipmentLogs, isEquipmentLogsLoading, fetchEquipmentLogs] = useMountainData(
		equipmentApi,
		'getAllEquipmentLogs',
		selectedMountain?._id
	);
	const [hutLogs, isHutLogsLoading, fetchHutLogs] = useMountainData(hutApi, 'getAllHutLogs', selectedMountain?._id);
	const [liftLineChecks, isLiftLineChecksLoading, fetchLiftLineChecks] = useMountainData(
		liftApi,
		'getAllLiftLineChecks',
		selectedMountain?._id
	);
	const [aidRoomLogs, isAidRoomLogsLoading, fetchAidRoomLogs] = useMountainData(
		aidRoomApi,
		'getAllAidRoomLogs',
		selectedMountain?._id
	);
	const [trailLogs, isTrailLogsLoading, fetchTrailLogs] = useMountainData(
		trailApi,
		'getAllTrailLogs',
		selectedMountain?._id,
		selectedDate
	);
	const [patrollers, isPatrollersLoading, fetchPatrollers] = useMountainData(
		patrollerApi,
		'getAllPatrollers',
		selectedMountain?._id
	);

	const locations = getLocations(trails, aidRooms, lodges, lifts, huts, []);

	const isLoading =
		isMountainsLoading ||
		isAreasLoading ||
		isHutsLoading ||
		isHutLogsLoading ||
		isAidRoomsLoading ||
		isAidRoomLogsLoading ||
		isLodgesLoading ||
		isLiftsLoading ||
		isLiftLineChecksLoading ||
		isTrailsLoading ||
		isTrailLogsLoading ||
		isPatrollersLoading ||
		isEquipmentLoading ||
		isEquipmentLogsLoading;

	async function handleUpdate(api, updateMethod, fetchMethod, id, updatedData) {
		try {
			await api[updateMethod](selectedMountain._id, id, updatedData);
			fetchMethod();
		} catch (error) {
			console.error(`Error updating entity with id ${id}`, error);
		}
	}

	async function handleCreateEntity(createFunction, fetchMethod, newEntity, ...args) {
		try {
			await createFunction(...args, newEntity);
			fetchMethod();
		} catch (error) {
			console.error(`Error creating new entity`, error);
		}
	}

	async function handleToggleEntity(api, fetchMethod, entity, toggleField) {
		const updatedEntity = { ...entity, [toggleField]: !entity[toggleField] };
		handleUpdate(api, 'update', fetchMethod, entity._id, updatedEntity);
	}

	async function handleServiceToggle(item) {
		handleToggleEntity(equipmentApi, fetchEquipment, item, 'inService');
	}

	async function handleLiftToggle(lift) {
		handleToggleEntity(liftApi, fetchLifts, lift, 'isOpen');
	}

	async function handleTrailToggle(trail) {
		handleToggleEntity(trailApi, fetchTrails, trail, 'isOpen');
	}

	async function handleCreateTrail(newTrail) {
		handleCreateEntity(trailApi.createTrail, fetchTrails, newTrail, selectedMountain._id);
	}

	async function handleCreateLodge(newLodge) {
		handleCreateEntity(lodgeApi.createLodge, fetchLodges, newLodge, selectedMountain._id);
	}

	async function handleCreateHut(newHut) {
		handleCreateEntity(hutApi.createHut, fetchHuts, newHut, selectedMountain._id);
	}

	async function handleCreateLift(newLift) {
		handleCreateEntity(liftApi.createLift, fetchLifts, newLift, selectedMountain._id);
	}

	async function handleCreateAidRoom(newAidRoom) {
		handleCreateEntity(aidRoomApi.createAidRoom, fetchAidRooms, newAidRoom, selectedMountain._id);
	}

	async function handleCreateEquipment(newEquipment) {
		handleCreateEntity(equipmentApi.createEquipment, fetchEquipment, newEquipment, selectedMountain._id);
	}

	async function handleCreatePatroller(newPatroller) {
		handleCreateEntity(patrollerApi.createPatroller, fetchPatrollers, newPatroller, selectedMountain._id);
	}

	async function handleCreateHutLog(hutId, newHutLog) {
		handleCreateEntity(hutApi.createHutLog, fetchHutLogs, hutId, newHutLog, selectedMountain._id);
	}

	async function handleCreateAidRoomLog(aidRoomId, newAidRoomLog) {
		handleCreateEntity(
			aidRoomApi.createAidRoomLog,
			fetchAidRoomLogs,
			aidRoomId,
			newAidRoomLog,
			selectedMountain._id
		);
	}

	async function handleCreateTrailLog(trailId, newTrailLog) {
		handleCreateEntity(trailApi.createTrailLog, fetchTrailLogs, trailId, newTrailLog, selectedMountain._id);
	}

	async function handleCreateEquipmentLog(equipmentId, newEquipmentLog) {
		handleCreateEntity(
			equipmentApi.createEquipmentLog,
			fetchEquipmentLogs,
			equipmentId,
			newEquipmentLog,
			selectedMountain._id
		);
	}

	async function handleCreateLineCheck(liftId, newLineCheck) {
		handleCreateEntity(
			liftApi.createLiftLineCheck,
			fetchLiftLineChecks,
			liftId,
			newLineCheck,
			selectedMountain._id
		);
	}

	async function handleTrailLogCreateOrUpdate(trailId, logData) {
		const logDataWithDate = { ...logData, date: selectedDate };
		const existingTrailLog = trailLogs.find((log) => log.trailId === trailId);
		if (existingTrailLog) {
			handleUpdate(trailApi, 'updateTrailLog', fetchTrailLogs, trailId, logDataWithDate);
		} else {
			handleCreateEntity(trailApi.createTrailLog, fetchTrailLogs, logDataWithDate, selectedMountain._id, trailId);
		}
	}

	const fetchPatrolDispatcherForDate = useCallback(
		async (date) => {
			if (date && selectedMountain) {
				const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
					date.getDate()
				).padStart(2, '0')}`;

				try {
					const response = await patrollerApi.getPatrolDispatcherForDate(selectedMountain._id, formattedDate);
					console.log("🚀 ~ file: MountainContext.jsx:223 ~ fetchPatrolDispatcherForDate response:", response)
					if (response.patroller) {
						setCurrentDayPatrolDispatcher(response);
					} else {
						setCurrentDayPatrolDispatcher('');
					}
				} catch (error) {
					if (error.response && error.response.status === 404) {
						console.log(error.response.data.message);
						setCurrentDayPatrolDispatcher(null);
					} else {
						console.error(
							`Error fetching patrol dispatcher for date ${formattedDate} for mountain with id ${selectedMountain._id}`,
							error
						);
					}
				}
			}
		},
		[selectedMountain, setCurrentDayPatrolDispatcher]
	);

	const setPatrolDispatcher = async (dispatcher) => {
		try {
			if (selectedMountain) {
				let date = new Date(dispatcher.date);
				date.setHours(0, 0, 0, 0);

				const response = await patrollerApi.createPatrolDispatcherLog(selectedMountain._id, dispatcher._id, {
					date: date.toISOString(),
				});
				console.log("🚀 ~ file: MountainContext.jsx:245 ~ setPatrolDispatcher ~ response:", response)
				setCurrentDayPatrolDispatcher(response);
			} else {
				console.error('No mountain selected');
			}
		} catch (error) {
			console.error(`Error saving patrol dispatcher with id ${dispatcher._id}`, error);
		}
	};
	
	useEffect(() => {
		const storedMountainId = localStorage.getItem('selectedMountainId');
		if (storedMountainId) {
			const storedMountain = mountains.find((mountain) => mountain._id === storedMountainId);
			setSelectedMountain(storedMountain);
		}
	}, [mountains]);

	useEffect(() => {
		fetchMountains();
	}, [fetchMountains]);

	useEffect(() => {
		if (selectedMountain && selectedDate) {
			fetchAreas();
			fetchHuts();
			fetchHutLogs();
			fetchAidRooms();
			fetchAidRoomLogs();
			fetchLodges();
			fetchLifts();
			fetchLiftLineChecks();
			fetchTrails();
			fetchTrailLogs();
			fetchPatrollers();
			fetchEquipment();
			fetchEquipmentLogs();
			fetchPatrolDispatcherForDate(selectedDate);
		}
	}, [
		selectedMountain,
		selectedDate,
		fetchAreas,
		fetchHuts,
		fetchHutLogs,
		fetchAidRooms,
		fetchAidRoomLogs,
		fetchLodges,
		fetchLifts,
		fetchLiftLineChecks,
		fetchTrails,
		fetchTrailLogs,
		fetchPatrollers,
		fetchEquipment,
		fetchEquipmentLogs,
		fetchPatrolDispatcherForDate,
	]);

	return (
		<MountainContext.Provider
			value={{
				isLoading,
				mountains,
				fetchMountains,
				selectedMountain,
				setSelectedMountain,
				areas,
				fetchAreas,
				huts,
				fetchHuts,
				hutLogs,
				fetchHutLogs,
				aidRooms,
				fetchAidRooms,
				aidRoomLogs,
				fetchAidRoomLogs,
				lodges,
				fetchLodges,
				lifts,
				fetchLifts,
				handleLiftToggle,
				liftLineChecks,
				fetchLiftLineChecks,
				trails,
				fetchTrails,
				handleCreateTrail,
				handleCreateTrailLog,
				handleCreateLodge,
				handleCreateHut,
				handleCreateHutLog,
				handleCreateLift,
				handleCreateLineCheck,
				handleCreateAidRoom,
				handleCreateAidRoomLog,
				handleCreateEquipment,
				handleCreateEquipmentLog,
				handleCreatePatroller,
				handleTrailToggle,
				trailLogs,
				fetchTrailLogs,
				handleTrailLogCreateOrUpdate,
				patrollers,
				fetchPatrollers,
				currentDayPatrolDispatcher,
				fetchPatrolDispatcherForDate,
				setPatrolDispatcher,
				equipment,
				fetchEquipment,
				equipmentLogs,
				fetchEquipmentLogs,
				handleServiceToggle,
				locationTypes,
				locations,
				api,
			}}
		>
			{children}
		</MountainContext.Provider>
	);
};
