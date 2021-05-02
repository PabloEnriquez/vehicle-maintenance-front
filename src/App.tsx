import React, { useState, useEffect, useCallback } from 'react'
import Spinner from './components/Spinner/Spinner'
import Modal from './components/Modal/Modal'
import AttendantForm from './components/AttendantForm/AttendantForm'
import Vehicle from './components/Vehicle/Vehicle'
import VehicleType from './interfaces/vehicle.type'
import { getVehicles } from './services/vehicle.service'
import './App.css'

const App: React.FC = () => {
  const [vehicles, setVehicles] = useState<Array<VehicleType>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<number | null>(null)

  /**
   * fetch data process
   */
  const fetchVehicles = useCallback(() => {
    setIsLoading(true)
    getVehicles()
      .then(res => {
        setVehicles(res)
      })
      .catch(error => {
        setError(error.message)
        setErrorModalOpen(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  /**
   * Handle select vehicle actions
   * If item has no id open error modal with message
   * If is valid id set selection
   * @param {Number} vehicleId Vehicle's id to select
   */
  const handleSelectVehicle = useCallback((vehicleId?: number): void => {
    if (!vehicleId) {
      setError('You cannot make operations without an id')
      setErrorModalOpen(true)
      return
    }
    setSelected(vehicleId)
  }, [])

  /**
   * handle close set maintenance form modal
   * set selection to null
   * fetch vehicles data
   */
  const handleCloseSetMaintenance = useCallback(() => {
    setSelected(null)
    fetchVehicles()
  }, [fetchVehicles])

  return (
    <div className="App">
      {
        isLoading ? <Spinner /> : null
      }
      <h1>Vehicles</h1>
      {
        vehicles.map((vehicle, idx) =>
        <Vehicle
          key={vehicle.id || idx}
          {...vehicle}
          handleClick={handleSelectVehicle}
        />
        )
      }
      <Modal
        show={errorModalOpen}
        handleClose={() => setErrorModalOpen(false)}
        >
          <div className="errorMsg">
            {error || 'Error retrieving vehicles'}
          </div>
      </Modal>
      <Modal
        show={!!selected}
        handleClose={handleCloseSetMaintenance}
      >
        {
          selected ? <AttendantForm vehicleId={selected} /> : null
        }
      </Modal>
    </div>
  );
}

export default App;
