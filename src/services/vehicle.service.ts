import axios from 'axios'
import Vehicle from '../interfaces/vehicle.type'
import Maintenance from '../interfaces/maintenance.type'

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL })

/**
 * Service API to get vehicles list
 * @returns {Promise<Array<Vehicle>>} list of vehicles
 */
export const getVehicles = async (): Promise<Array<Vehicle>> => {
  try {
    const { data } = await axiosInstance.get('/')
    return data
  } catch (error) {
    console.log('error fetching vehicles: ', error)
    throw error
  }
}

/**
 * Service API to update vehicle data to reflect maintenance was activated
 * @param vehicleId Vehicle's id to update
 * @param maintenanceData attendant and date data
 * @returns 
 */
export const setMaintenance = async (vehicleId: number, maintenanceData: Maintenance): Promise<Vehicle> => {
  try {
    const { data } = await axiosInstance.patch(`/${vehicleId}`, maintenanceData)
    return data
  } catch (error) {
    console.log('error setting maintenance: ', error)
    throw error
  }
}