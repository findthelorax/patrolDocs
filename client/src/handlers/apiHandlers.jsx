import { api as mountainApi } from '../api/MountainAPI';
import { api as equipmentApi } from '../api/EquipmentAPI';
import { api as hutApi } from '../api/HutAPI';
import { api as liftApi } from '../api/LiftAPI';
import { api as lodgeApi } from '../api/LodgeAPI';
import { api as aidRoomApi } from '../api/AidRoomAPI';
import { api as patrollerApi } from '../api/PatrollerAPI';
import { api as trailApi } from '../api/TrailAPI';
import { useApiData } from '../contexts/useApiData';

export const useMountainData = (api, method, id, date) => {
    const [data, isLoading, fetchData, setData] = useApiData(api[method], id, date);
    return [data, isLoading, fetchData, setData];
};

export const api = {
    mountainApi,
    equipmentApi,
    hutApi,
    liftApi,
    lodgeApi,
    aidRoomApi,
    patrollerApi,
    trailApi,
};