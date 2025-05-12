import React from 'react'
import ShipDetail from '../components/Ships/ShipDetail'
import ShipList from '../components/Ships/ShipList'
import ShipForm from '../components/Ships/ShipForm'

const ShipsPage = () => {
  return (
    <div>
        <ShipDetail/>
        <ShipList/>
        <ShipForm/>
    </div>
  )
}

export default ShipsPage