import UseAllCarsContext from '@/src/constants/UseAllCars';
import MoshinaDetails from '@/src/features/profile/page/ownerRole/MoshinaDetails';
import React from 'react'

export default function page() {
    
  return (
    <div>
        <UseAllCarsContext>
            <MoshinaDetails/>
        </UseAllCarsContext>
    </div>
  )
}
