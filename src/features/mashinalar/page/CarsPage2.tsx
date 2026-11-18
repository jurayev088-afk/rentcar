import UseAllCarsContext from '@/src/constants/UseAllCars'
import React from 'react'
import CarsPage from './CarsPage'

export default function CarsPage2() {
  return (
    <div>
        <UseAllCarsContext>
            <CarsPage/>
        </UseAllCarsContext>
    </div>
  )
}
