import React from 'react'
import AdminOrders from '../features/admin/components/AdminOrders'
import Navbar from '../features/navbar/Navbar'

const AdminOrderPage = () => {
  return (
    <div>
      <Navbar>
        <AdminOrders></AdminOrders>
      </Navbar>
    </div>
  )
}

export default AdminOrderPage;