import VehicleData from '../config/vehicles';
import CustomerData from '../config/customers';

export const CRS_DB_KEY = 'CRS_DB';
export const defaultData = {
  vehicles: [],
  customers: [],
};

export const initializeCRSData = () => {
  const crsData = { ...defaultData };
  const existingCache = localStorage.getItem(CRS_DB_KEY);

  if (existingCache == null) {
    // Load vehicles data
    Object.keys(VehicleData).forEach((vehicleType) => {
      Object.entries(VehicleData[vehicleType]).forEach(
        ([vehicleSubtype, vObj]) => {
          for (
            let vehicleCount = 0;
            vehicleCount < vObj.totalAvailable;
            vehicleCount += 1
          ) {
            crsData.vehicles.push({
              id: `${vehicleType}_${vehicleSubtype}_${vehicleCount}`,
              type: vehicleType,
              subType: vehicleSubtype,
              desc: vObj.description,
              isAvailable: true,
              assignedTo: null,
              assignedAt: null,
              rentDuration: null,
            });
          }
        },
      );
    });

    // Load customers data
    crsData.customers = CustomerData;

    // Persist to localStorage
    localStorage.setItem(CRS_DB_KEY, JSON.stringify(crsData));
  }
};
