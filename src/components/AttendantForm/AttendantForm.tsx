import React, { useState, useCallback } from 'react'
import { setMaintenance } from '../../services/vehicle.service'
import Maintenance from '../../interfaces/maintenance.type'
import Spinner from '../Spinner/Spinner'
import './AttendantForm.css'

type AttendantFormType = {
  vehicleId: number
}

const AttendantForm: React.FC<AttendantFormType> = ({ vehicleId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [attendant, setAttendant] = useState('')
  const [estimatedate, setEstimateDate] = useState('')

  /**
   * set attendant form validation
   */
  const validateForm = useCallback((): void => {
    setError('')
    if (!attendant) {
      setError('Invalid attendant name')
    }
    if (!estimatedate) {
      setError('Invalid maintenance date')
    }
  }, [attendant, estimatedate])

  /**
   * handle form submit
   */
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    validateForm()
    if (error) {
      return
    }
    setIsLoading(true)
    const maintenanceData: Maintenance = {
      attendant,
      estimatedate: new Date(estimatedate).toISOString().split('T')[0]
    }
    setMaintenance(vehicleId, maintenanceData)
      .then(() => {
        setAttendant('')
        setEstimateDate('')
      })
      .catch(err => {
        setError(`Error setting maintenance: ${err.message}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [attendant, error, estimatedate, validateForm, vehicleId])

  return (
    <form
      className="formContainer"
      onSubmit={handleSubmit}
    >
      <h1>Set Maintenance</h1>
      <input
        type="text"
        id="attendant"
        name="attendant"
        value={attendant}
        onChange={({ target: { value } }) => setAttendant(value)}
        required
      />
      <input
        type="date"
        id="estimatedate"
        name="estimatedate"
        value={estimatedate}
        onChange={({ target: { value } }) => setEstimateDate(value)}
        required
      />
      <button
        type="submit"
        disabled={isLoading}
      >
        Submit vehicle maintenance
      </button>
      {
        isLoading ? <Spinner /> : null
      }
      {
        error ? <div className="errorMsg">{error}</div> : null
      }
    </form>
  )
}

export default AttendantForm
