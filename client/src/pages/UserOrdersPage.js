import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/user/components/userOrders'
import Footer from '../features/common/Footer';

const UserOrdersPage = () => {
  return (
    <>
      <Navbar>
        <UserOrders></UserOrders>
      </Navbar>
      <Footer>

      </Footer>
    </>
  )
}

export default UserOrdersPage;