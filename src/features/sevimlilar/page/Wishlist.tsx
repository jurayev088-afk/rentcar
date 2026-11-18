import UseWishlistContext from '@/src/constants/UseWishlist'
import React from 'react'
import WishlistCard from '../components/WishlistCard'

export default function Wishlist() {
  return (
    <div>
      <UseWishlistContext>
        <WishlistCard/>
      </UseWishlistContext>
    </div>
  )
}
