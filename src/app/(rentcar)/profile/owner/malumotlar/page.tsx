import UseMeContext from '@/src/constants/UseMeContext'
import Malumotlar from '@/src/features/profile/page/ownerRole/Malumotlar'
import React from 'react'

export default function page() {
  return (
    <div>
      <UseMeContext>
        <Malumotlar/>
      </UseMeContext>
    </div>
  )
}
