import React, { useState, useCallback, useEffect } from 'react'
import VehicleType from '../../interfaces/vehicle.type'
import defaultCar from '../../assets/default-car.png'
import './Vehicle.css'

type VehicleComponent = VehicleType & {
  /** Execute selection of vehicle card */
  handleClick: (vehicleId?: number) => void
}

const Vehicle: React.FC<VehicleComponent> = ({
  description = '-',
  make = '-',
  model = '-',
  estimatedate = '-',
  id,
  km = 0,
  image = defaultCar,
  attendant = '',
  handleClick
}) => {
const [imgSrc, setImgSrc] = useState(defaultCar)
const [loadedImg, setLoadedImg] = useState(false)
const [imgError, setImgError] = useState(false)

  /**
   * handle selected car
   * If is valid id execute method
   * If not valid return
   */
  const handleSelected = useCallback((): void => {
    handleClick(id)
    if (!id) {
      return
    }
  }, [handleClick, id])

  /**
   * Set default img src and imgError flag to true
   */
  const onImgError = useCallback(() => {
    setImgSrc(defaultCar)
    setImgError(true)
  }, [])

  /**
   * Set img src from Vehicle image prop
   * As did mount
   */
  useEffect(() => {
    setImgSrc(image)
  }, [image])

  return (
    <div
      className={['cardContainer', attendant && 'inMaintenance'].join(' ')}
      onClick={handleSelected}
    >
      {
        loadedImg ? null : (
          <img
            className="vehicleImage"
            src={defaultCar}
            alt="default fallback img"
          />
        )
      }
      <img
        className={loadedImg ? 'vehicleImage' : ''}
        src={loadedImg ? (imgError ? imgSrc : image) : imgSrc}
        alt={`vehicle-${make}-${model}-${id}`}
        onError={onImgError}
        onLoad={setLoadedImg.bind(this, true)}
      />
      <div className="vehicleDetails">
        <div className="vehData">id: <span> {id}</span></div>
        <div className="vehData">Description: <span> {description}</span></div>
        <div className="vehData">Make: <span> {make}</span></div>
        <div className="vehData">Model: <span> {model}</span></div>
        <div className="vehData">Estimate date: <span> {estimatedate}</span></div>
        <div className="vehData">KM: <span> {km}</span></div>
        {
          attendant && (
            <div>Attendant: <span> {attendant}</span></div>
          )
        }
      </div>
    </div>
  )
}

export default Vehicle