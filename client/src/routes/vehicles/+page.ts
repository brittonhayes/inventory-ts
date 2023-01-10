import { Configuration, VehiclesApi } from '$lib/api';
import type { VehicleResponse } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
    const config = new Configuration({
        fetchApi: fetch,
    });
    const client = new VehiclesApi(config);
    let vehicles: VehicleResponse[] = [];
    try {
        vehicles = await client.vehiclesControllerListVehicles();
    } catch (error) {
        console.log(error);
    }
    
    return {
      vehicles: vehicles,
    };
  }) satisfies PageLoad;