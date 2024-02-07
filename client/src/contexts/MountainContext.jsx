import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { apis } from '../api';
import { DateContext } from './DateContext';
import { useApiData, useMountainData } from './useApiData';
import { locationTypes, getLocations } from '../helpers/constants';

export const MountainContext = createContext();

export const MountainProvider = ({ children }) => {
	const [selectedMountain, setSelectedMountain] = useState(null);
	const { selectedDate } = useContext(DateContext);
	const [currentDayDispatcher, setCurrentDayDispatcher] = useState(null);

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
	const [dispatchers, isDispatchersLoading, fetchDispatchers] = useMountainData(
		apis.dispatcherApi,
		'getAllDispatcherLogs',
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
		isDispatchersLoading ||
		isEquipmentLoading ||
		isEquipmentLogsLoading;

	function createToggleHandler(api, fetchMethod, toggleField) {
		return async function (entity) {
			const updatedEntity = { ...entity, [toggleField]: !entity[toggleField] };
			handleUpdate(api, 'update', fetchMethod, entity._id, updatedEntity);
		};
	}

	async function handleUpdate(api, updateMethod, fetchMethod, id, updatedData) {
		try {
			await api[updateMethod](selectedMountain._id, id, updatedData);
			fetchMethod();
		} catch (error) {
			console.error(`Error updating entity with id ${id}`, error);
		}
	}

	function createEntityHandler(createFunction, fetchMethod) {
		return async function (newEntity, ...args) {
			try {
				await createFunction(...args, selectedMountain._id, newEntity);
				fetchMethod();
			} catch (error) {
				console.error(`Error creating new entity`, error);
			}
		};
	}

	const handleServiceToggle = createToggleHandler(apis.equipmentApi, fetchEquipment, 'inService');
	const handleLiftToggle = createToggleHandler(apis.liftApi, fetchLifts, 'isOpen');
	const handleTrailToggle = createToggleHandler(apis.trailApi, fetchTrails, 'isOpen');

	const handleCreateTrail = createEntityHandler(apis.trailApi.createTrail, fetchTrails);
	const handleCreateLodge = createEntityHandler(apis.lodgeApi.createLodge, fetchLodges);
	const handleCreateHut = createEntityHandler(apis.hutApi.createHut, fetchHuts);
	const handleCreateLift = createEntityHandler(apis.liftApi.createLift, fetchLifts);
	const handleCreateAidRoom = createEntityHandler(apis.aidRoomApi.createAidRoom, fetchAidRooms);
	const handleCreateEquipment = createEntityHandler(apis.equipmentApi.createEquipment, fetchEquipment);
	const handleCreatePatroller = createEntityHandler(apis.patrollerApi.createPatroller, fetchPatrollers);
	const handleCreateDispatcher = createEntityHandler(apis.dispatcherApi.createDispatcherLog, fetchDispatchers);
	const handleCreateHutLog = createEntityHandler(apis.hutApi.createHutLog, fetchHutLogs);
	const handleCreateAidRoomLog = createEntityHandler(apis.aidRoomApi.createAidRoomLog, fetchAidRoomLogs);
	const handleCreateTrailLog = createEntityHandler(apis.trailApi.createTrailLog, fetchTrailLogs);
	const handleCreateEquipmentLog = createEntityHandler(apis.equipmentApi.createEquipmentLog, fetchEquipmentLogs);
	const handleCreateLineCheck = createEntityHandler(apis.liftApi.createLiftLineCheck, fetchLiftLineChecks);

	async function handleTrailLogCreateOrUpdate(trailId, logData) {
		const logDataWithDate = { ...logData, date: selectedDate };
		const existingTrailLog = trailLogs.find(
			(log) =>
				log.trailId === trailId && new Date(log.date).toDateString() === new Date(selectedDate).toDateString()
		);
		if (existingTrailLog) {
			handleUpdate(apis.trailApi, 'updateTrailLog', fetchTrailLogs, trailId, logDataWithDate);
		} else {
			handleCreateTrailLog(logDataWithDate, trailId);
		}
	}

	const fetchDispatcherForDate = useCallback(
		async (date) => {
			if (date && selectedMountain) {
				const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
					date.getDate()
				).padStart(2, '0')}`;

				try {
					const response = await apis.dispatcherApi.getDispatcherForDate(selectedMountain._id, formattedDate);
					console.log('🚀 ~ file: MountainContext.jsx:223 ~ fetchDispatcherForDate response:', response);
					if (response.patroller) {
						response.date = new Date(response.date);
						return response.patroller;
					} else {
						return null;
					}
				} catch (error) {
					if (error.response) {
						const { message, date } = error.response.data.error;
						const errorMessage = `${message} for ${new Date(date)}.`;
						console.log(errorMessage);
					} else {
						console.error(
							`Error fetching patrol dispatcher for date ${formattedDate} for mountain with id ${selectedMountain._id}`,
							error
						);
					}
				}
			}
		},
		[selectedMountain]
	);

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
		const fetchAndSetCurrentDayDispatcher = async () => {
			const today = new Date();
			const dispatcher = await fetchDispatcherForDate(today);
			if (dispatcher) {
				setCurrentDayDispatcher(dispatcher);
			}
		};

		fetchAndSetCurrentDayDispatcher();
	}, [fetchDispatcherForDate, setCurrentDayDispatcher]);

	useEffect(() => {
		if (selectedMountain && selectedDate) {
			const fetchFunctions = [
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
			];

			Promise.all(fetchFunctions.map((fetchFunction) => fetchFunction()))
				.then(() => console.log('All data fetched'))
				.catch((error) => console.error('Error fetching data', error));
		}
	}, [selectedMountain, selectedDate]);

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
				currentDayDispatcher,
				setCurrentDayDispatcher,
				dispatchers,
				fetchDispatchers,
				fetchDispatcherForDate,
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
