import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { api } from '../api/MountainAPI';
import { api as equipmentApi } from '../api/EquipmentAPI';
import { api as hutApi } from '../api/HutAPI';
import { api as liftApi } from '../api/LiftAPI';
import { api as lodgeApi } from '../api/LodgeAPI';
import { api as aidRoomApi } from '../api/AidRoomAPI';
// import { api as paperworkApi } from '../api/PaperworkAPI';
import { api as patrollerApi } from '../api/PatrollerAPI';
import { api as trailApi } from '../api/TrailAPI';
import { DateContext } from './DateContext';

export const MountainContext = createContext();

const useFetch = (apiFunc, id) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await apiFunc(id);
			setData(response || []);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}, [apiFunc, id]);

	return [data, isLoading, fetchData, error];
};

export const MountainProvider = ({ children }) => {
	const [selectedMountain, setSelectedMountain] = useState(null);

	const [mountains, isMountainsLoading, fetchMountains] = useFetch(api.getAllMountains);
	const [areas, isAreasLoading, fetchAreas] = useFetch(api.getAllAreas, selectedMountain?._id);
	const [huts, isHutsLoading, fetchHuts] = useFetch(hutApi.getAllHuts, selectedMountain?._id);
	const [lodges, isLodgesLoading, fetchLodges] = useFetch(lodgeApi.getAllLodges, selectedMountain?._id);
	const [aidRooms, isAidRoomsLoading, fetchAidRooms] = useFetch(aidRoomApi.getAllAidRooms, selectedMountain?._id);
	const [lifts, isLiftsLoading, fetchLifts] = useFetch(liftApi.getAllLifts, selectedMountain?._id);
	const [trails, isTrailsLoading, fetchTrails] = useFetch(trailApi.getAllTrails, selectedMountain?._id);
	const [equipment, isEquipmentLoading, fetchEquipment] = useFetch(
		equipmentApi.getAllEquipment,
		selectedMountain?._id
	);

	const [trailLogs, isTrailLogsLoading, fetchTrailLogs] = useFetch(trailApi.getAllTrailLogs, selectedMountain?._id);
	const [equipmentLogs, isEquipmentLogsLoading, fetchEquipmentLogs] = useFetch(
		equipmentApi.getAllEquipmentLogs,
		selectedMountain?._id
	);
	const [hutLogs, isHutLogsLoading, fetchHutLogs] = useFetch(hutApi.getAllHutLogs, selectedMountain?._id);
	const [liftLineChecks, isLiftLineChecksLoading, fetchLiftLineChecks] = useFetch(
		liftApi.getAllLiftLineChecks,
		selectedMountain?._id
	);
	const [aidRoomLogs, isAidRoomLogsLoading, fetchAidRoomLogs] = useFetch(
		aidRoomApi.getAllAidRoomLogs,
		selectedMountain?._id
	);

	// const [paperwork, isPaperworkLoading, fetchPaperwork] = useFetch(paperworkApi.getAllPaperwork, selectedMountain?._id);
	const [patrollers, isPatrollersLoading, fetchPatrollers] = useFetch(
		patrollerApi.getAllPatrollers,
		selectedMountain?._id
	);
	const [currentDayPatrolDispatcher, setCurrentDayPatrolDispatcher] = useState(null);
	const [patrolDispatcher] = useState({});
	const { selectedDate } = useContext(DateContext);

	const locationTypes = ['Trails', 'Huts', 'First Aid Rooms', 'Other'];

	const locations = {
		Trails: trails,
		Huts: huts,
		'First Aid Rooms': aidRooms,
		Other: [],
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
				const response = await patrollerApi.createPatrolDispatcherLog(selectedMountain._id, dispatcherWithFormattedDate._id, dispatcherWithFormattedDate);
				setCurrentDayPatrolDispatcher(response);
			} else {
				console.error('No mountain selected');
			}
		} catch (error) {
			console.error(`Error saving patrol dispatcher with id ${dispatcher._id}`, error);
		}
	};

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
		if (selectedDate && selectedMountain) {
			fetchPatrolDispatcherForDate(selectedDate);
		}
	}, [selectedDate, selectedMountain, fetchPatrolDispatcherForDate]);

	useEffect(() => {
		fetchMountains();
	}, [fetchMountains]);

	useEffect(() => {
		if (selectedMountain) {
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
			fetchPatrolDispatcherForDate(new Date());
			// fetchPaperwork();
		}
	}, [
		selectedMountain,
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
				liftLineChecks,
				fetchLiftLineChecks,
				trails,
				fetchTrails,
				trailLogs,
				fetchTrailLogs,
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
				// paperwork,
				// fetchPaperwork,
				api,
			}}
		>
			{children}
		</MountainContext.Provider>
	);
};
