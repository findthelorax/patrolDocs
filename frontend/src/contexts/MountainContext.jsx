import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { apis } from '../api';
import { DateContext } from './DateContext';
import { useApiData, useMountainData } from './useApiData';
import { locationTypes, getLocations } from '../helpers/constants';
export const MountainContext = createContext();

export const MountainProvider = ({ children }) => {
	const [selectedMountain, setSelectedMountain] = useState(null);
	const { selectedDate } = useContext(DateContext);
	const [currentDayPatrolDispatcher, setCurrentDayPatrolDispatcher] = useState(null);

	const [mountains, isMountainsLoading, fetchMountains] = useApiData(apis.mountainApi.getAllMountains);
	const [areas, isAreasLoading, fetchAreas] = useMountainData(apis.mountainApi, 'getAllAreas', selectedMountain?._id);
	const [huts, isHutsLoading, fetchHuts] = useMountainData(apis.hutApi, 'getAllHuts', selectedMountain?._id);
	const [lodges, isLodgesLoading, fetchLodges] = useMountainData(
		apis.lodgeApi,
		'getAllLodges',
		selectedMountain?._id
	);
	const [lifts, isLiftsLoading, fetchLifts] = useMountainData(apis.liftApi, 'getAllLifts', selectedMountain?._id);
	const [trails, isTrailsLoading, fetchTrails] = useMountainData(
		apis.trailApi,
		'getAllTrails',
		selectedMountain?._id
	);
	const [aidRooms, isAidRoomsLoading, fetchAidRooms] = useMountainData(
		apis.aidRoomApi,
		'getAllAidRooms',
		selectedMountain?._id
	);
	const [equipment, isEquipmentLoading, fetchEquipment] = useMountainData(
		apis.equipmentApi,
		'getAllEquipment',
		selectedMountain?._id
	);

	const [equipmentLogs, isEquipmentLogsLoading, fetchEquipmentLogs] = useMountainData(
		apis.equipmentApi,
		'getAllEquipmentLogs',
		selectedMountain?._id
	);
	const [hutLogs, isHutLogsLoading, fetchHutLogs] = useMountainData(
		apis.hutApi,
		'getAllHutLogs',
		selectedMountain?._id
	);
	const [liftLineChecks, isLiftLineChecksLoading, fetchLiftLineChecks] = useMountainData(
		apis.liftApi,
		'getAllLiftLineChecks',
		selectedMountain?._id
	);
	const [aidRoomLogs, isAidRoomLogsLoading, fetchAidRoomLogs] = useMountainData(
		apis.aidRoomApi,
		'getAllAidRoomLogs',
		selectedMountain?._id
	);
	const [trailLogs, isTrailLogsLoading, fetchTrailLogs] = useMountainData(
		apis.trailApi,
		'getAllTrailLogs',
		selectedMountain?._id,
		selectedDate
	);
	const [patrollers, isPatrollersLoading, fetchPatrollers] = useMountainData(
		apis.patrollerApi,
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

	function createEntityHandler(createFunction, fetchMethod) {
		return async function(newEntity, ...args) {
			try {
				await createFunction(...args, selectedMountain._id, newEntity);
				fetchMethod();
			} catch (error) {
				console.error(`Error creating new entity`, error);
			}
		}
	}

	const handleCreateTrail = createEntityHandler(apis.trailApi.createTrail, fetchTrails);
	const handleCreateLodge = createEntityHandler(apis.lodgeApi.createLodge, fetchLodges);
	const handleCreateHut = createEntityHandler(apis.hutApi.createHut, fetchHuts);
	const handleCreateLift = createEntityHandler(apis.liftApi.createLift, fetchLifts);
	const handleCreateAidRoom = createEntityHandler(apis.aidRoomApi.createAidRoom, fetchAidRooms);
	const handleCreateEquipment = createEntityHandler(apis.equipmentApi.createEquipment, fetchEquipment);
	const handleCreatePatroller = createEntityHandler(apis.patrollerApi.createPatroller, fetchPatrollers);
	const handleCreateHutLog = createEntityHandler(apis.hutApi.createHutLog, fetchHutLogs);
	const handleCreateAidRoomLog = createEntityHandler(apis.aidRoomApi.createAidRoomLog, fetchAidRoomLogs);
	const handleCreateTrailLog = createEntityHandler(apis.trailApi.createTrailLog, fetchTrailLogs);
	const handleCreateEquipmentLog = createEntityHandler(apis.equipmentApi.createEquipmentLog, fetchEquipmentLogs);
	const handleCreateLineCheck = createEntityHandler(apis.liftApi.createLiftLineCheck, fetchLiftLineChecks);

	async function handleUpdate(api, updateMethod, fetchMethod, id, updatedData) {
		try {
			await api[updateMethod](selectedMountain._id, id, updatedData);
			fetchMethod();
		} catch (error) {
			console.error(`Error updating entity with id ${id}`, error);
		}
	}

	async function handleToggleEntity(api, fetchMethod, entity, toggleField) {
		const updatedEntity = { ...entity, [toggleField]: !entity[toggleField] };
		handleUpdate(api, 'update', fetchMethod, entity._id, updatedEntity);
	}

	async function handleServiceToggle(item) {
		handleToggleEntity(apis.equipmentApi, fetchEquipment, item, 'inService');
	}

	async function handleLiftToggle(lift) {
		handleToggleEntity(apis.liftApi, fetchLifts, lift, 'isOpen');
	}

	async function handleTrailToggle(trail) {
		handleToggleEntity(apis.trailApi, fetchTrails, trail, 'isOpen');
	}

	// async function handleCreateEntity(createFunction, fetchMethod, newEntity, ...args) {
	// 	try {
	// 		await createFunction(...args, newEntity);
	// 		fetchMethod();
	// 	} catch (error) {
	// 		console.error(`Error creating new entity`, error);
	// 	}
	// }

	// async function handleCreateTrail(newTrail) {
	// 	handleCreateEntity(apis.trailApi.createTrail, fetchTrails, newTrail, selectedMountain._id);
	// }

	// async function handleCreateLodge(newLodge) {
	// 	handleCreateEntity(apis.lodgeApi.createLodge, fetchLodges, newLodge, selectedMountain._id);
	// }

	// async function handleCreateHut(newHut) {
	// 	handleCreateEntity(apis.hutApi.createHut, fetchHuts, newHut, selectedMountain._id);
	// }

	// async function handleCreateLift(newLift) {
	// 	handleCreateEntity(apis.liftApi.createLift, fetchLifts, newLift, selectedMountain._id);
	// }

	// async function handleCreateAidRoom(newAidRoom) {
	// 	handleCreateEntity(apis.aidRoomApi.createAidRoom, fetchAidRooms, newAidRoom, selectedMountain._id);
	// }

	// async function handleCreateEquipment(newEquipment) {
	// 	handleCreateEntity(apis.equipmentApi.createEquipment, fetchEquipment, newEquipment, selectedMountain._id);
	// }

	// async function handleCreatePatroller(newPatroller) {
	// 	handleCreateEntity(apis.patrollerApi.createPatroller, fetchPatrollers, newPatroller, selectedMountain._id);
	// }

	// async function handleCreateHutLog(hutId, newHutLog) {
	// 	handleCreateEntity(apis.hutApi.createHutLog, fetchHutLogs, hutId, newHutLog, selectedMountain._id);
	// }

	// async function handleCreateAidRoomLog(aidRoomId, newAidRoomLog) {
	// 	handleCreateEntity(
	// 		apis.aidRoomApi.createAidRoomLog,
	// 		fetchAidRoomLogs,
	// 		aidRoomId,
	// 		newAidRoomLog,
	// 		selectedMountain._id
	// 	);
	// }

	// async function handleCreateTrailLog(trailId, newTrailLog) {
	// 	handleCreateEntity(apis.trailApi.createTrailLog, fetchTrailLogs, trailId, newTrailLog, selectedMountain._id);
	// }

	// async function handleCreateEquipmentLog(equipmentId, newEquipmentLog) {
	// 	handleCreateEntity(
	// 		apis.equipmentApi.createEquipmentLog,
	// 		fetchEquipmentLogs,
	// 		equipmentId,
	// 		newEquipmentLog,
	// 		selectedMountain._id
	// 	);
	// }

	// async function handleCreateLineCheck(liftId, newLineCheck) {
	// 	handleCreateEntity(
	// 		apis.liftApi.createLiftLineCheck,
	// 		fetchLiftLineChecks,
	// 		liftId,
	// 		newLineCheck,
	// 		selectedMountain._id
	// 	);
	// }

	async function handleTrailLogCreateOrUpdate(trailId, logData) {
		const logDataWithDate = { ...logData, date: selectedDate };
		const existingTrailLog = trailLogs.find((log) => log.trailId === trailId);
		if (existingTrailLog) {
			handleUpdate(apis.trailApi, 'updateTrailLog', fetchTrailLogs, trailId, logDataWithDate);
		} else {
			// handleCreateEntity(
			// 	apis.trailApi.createTrailLog,
			// 	fetchTrailLogs,
			// 	logDataWithDate,
			// 	selectedMountain._id,
			// 	trailId
			// );
		}
	}

	const fetchPatrolDispatcherForDate = useCallback(
		async (date) => {
			if (date && selectedMountain) {
				const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
					date.getDate()
				).padStart(2, '0')}`;

				try {
					const response = await apis.patrollerApi.getPatrolDispatcherForDate(
						selectedMountain._id,
						formattedDate
					);
					console.log(
						'🚀 ~ file: MountainContext.jsx:223 ~ fetchPatrolDispatcherForDate response:',
						response
					);
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

				const response = await apis.patrollerApi.createPatrolDispatcherLog(
					selectedMountain._id,
					dispatcher._id,
					{
						date: date.toISOString(),
					}
				);
				console.log('🚀 ~ file: MountainContext.jsx:245 ~ setPatrolDispatcher ~ response:', response);
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
				apis,
			}}
		>
			{children}
		</MountainContext.Provider>
	);
};
