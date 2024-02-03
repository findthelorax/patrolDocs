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

	async function handleServiceToggle(item) {
		const updatedEquipment = { ...item, inService: !item.inService };
		try {
			await equipmentApi.updateEquipment(selectedMountain._id, item._id, updatedEquipment);
			fetchEquipment();
		} catch (error) {
			console.error(`Error toggling service status for equipment with id ${item._id}`, error);
		}
	}

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

	async function handleLiftToggle(lift) {
		const updatedLift = { ...lift, isOpen: !lift.isOpen };
		try {
			await liftApi.updateLift(selectedMountain._id, lift._id, updatedLift);
			fetchLifts();
		} catch (error) {
			console.error(`Error toggling status for lift with id ${lift._id}`, error);
		}
	}

	async function handleTrailToggle(trail) {
		const updatedTrail = { ...trail, isOpen: !trail.isOpen };
		try {
			await trailApi.updateTrail(selectedMountain._id, trail._id, updatedTrail);
			fetchTrails();
		} catch (error) {
			console.error(`Error toggling status for trail with id ${trail._id}`, error);
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

	async function handleTrailLogCreateOrUpdate(trailId, logData) {
		console.log('🚀 ~ file: MountainContext.jsx:176 ~ handleTrailLogCreateOrUpdate ~ logData:', logData);
		console.log('🚀 ~ file: MountainContext.jsx:176 ~ handleTrailLogCreateOrUpdate ~ trailId:', trailId);
		const logDataWithDate = { ...logData, date: selectedDate };
		try {
			// Check if a trail log for the given trailId already exists
			const existingTrailLog = trailLogs.find((log) => log.trailId === trailId);
			if (existingTrailLog) {
				// If it exists, update it
				await trailApi.updateTrailLog(selectedMountain._id, trailId, logDataWithDate);
			} else {
				// If it doesn't exist, create a new one
				await trailApi.createTrailLog(selectedMountain._id, trailId, logDataWithDate);
			}
			fetchTrailLogs();
		} catch (error) {
			console.error(`Error creating or updating trail log for trail with id ${trailId}`, error);
		}
	}

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
