import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/components/userProfile'

const UserProfilePage = () => {
  return (
    <Navbar>
      <UserProfile></UserProfile>
    </Navbar>
  )
}

export default UserProfilePage;