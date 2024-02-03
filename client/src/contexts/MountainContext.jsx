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
import { DateContext } from './DateContext';
import { useApiData } from './useApiData';
import { locationTypes, getLocations } from '../helpers/constants';
export const MountainContext = createContext();

export const MountainProvider = ({ children }) => {
	const [selectedMountain, setSelectedMountain] = useState(null);
	const { selectedDate } = useContext(DateContext);
	const [currentDayPatrolDispatcher, setCurrentDayPatrolDispatcher] = useState(null);
	const [patrolDispatcher] = useState({});

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

	const locations = getLocations(trails, huts, aidRooms);

	const api = {
		mountainApi,
		equipmentApi,
		hutApi,
		liftApi,
		lodgeApi,
		aidRoomApi,
		patrollerApi,
		trailApi,
	};

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

	const setPatrolDispatcher = async (dispatcher) => {
		try {
			if (selectedMountain) {
				// Convert the date to a string in the ISO 8601 format
				const dispatcherWithFormattedDate = {
					...dispatcher,
					date: dispatcher.date.toISOString(),
				};
				const response = await patrollerApi.createPatrolDispatcherLog(
					selectedMountain._id,
					dispatcherWithFormattedDate._id,
					dispatcherWithFormattedDate
				);
				setCurrentDayPatrolDispatcher(response);
			} else {
				console.error('No mountain selected');
			}
		} catch (error) {
			console.error(`Error saving patrol dispatcher with id ${dispatcher._id}`, error);
		}
	};

	async function handleUpdate(api, updateMethod, fetchMethod, id, updatedData) {
		try {
			await api[updateMethod](selectedMountain._id, id, updatedData);
			fetchMethod();
		} catch (error) {
			console.error(`Error updating entity with id ${id}`, error);
		}
	}

	async function handleToggle(api, updateMethod, fetchMethod, item, toggleField) {
		const updatedItem = { ...item, [toggleField]: !item[toggleField] };
		handleUpdate(api, updateMethod, fetchMethod, item._id, updatedItem);
	}
	
	async function handleServiceToggle(item) {
		handleToggle(equipmentApi, 'updateEquipment', fetchEquipment, item, 'inService');
	}

	async function handleLiftToggle(lift) {
		handleToggle(liftApi, 'updateLift', fetchLifts, lift, 'isOpen');
	}

	async function handleTrailToggle(trail) {
		handleToggle(trailApi, 'updateTrail', fetchTrails, trail, 'isOpen');
	}

	async function handleTrailLogCreateOrUpdate(trailId, logData) {
		const logDataWithDate = { ...logData, date: selectedDate };
		const existingTrailLog = trailLogs.find((log) => log.trailId === trailId);
		if (existingTrailLog) {
			handleUpdate(trailApi, 'updateTrailLog', fetchTrailLogs, trailId, logDataWithDate);
		} else {
			handleUpdate(trailApi, 'createTrailLog', fetchTrailLogs, trailId, logDataWithDate);
		}
	}

	const fetchPatrolDispatcherForDate = useCallback(
		async (date) => {
			if (date) {
				const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
					date.getDate()
				).padStart(2, '0')}`;

				try {
					const response = await patrollerApi.getPatrolDispatcherForDate(selectedMountain._id, formattedDate);
					setCurrentDayPatrolDispatcher(response);
				} catch (error) {
					console.error(
						`Error fetching patrol dispatcher for date ${formattedDate} for mountain with id ${selectedMountain._id}`,
						error
					);
				}
			}
		},
		[selectedMountain, setCurrentDayPatrolDispatcher]
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
				handleTrailToggle,
				trailLogs,
				fetchTrailLogs,
				handleTrailLogCreateOrUpdate,
				patrollers,
				fetchPatrollers,
				currentDayPatrolDispatcher,
				fetchPatrolDispatcherForDate,
				patrolDispatcher,
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
