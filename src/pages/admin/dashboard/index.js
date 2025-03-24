

import DashboardBlogList from '@/components/Admin/dashboard/bloglist'
import DashboardContactFormList from '@/components/Admin/dashboard/contactList'
import DashboardPartnerContactList from '@/components/Admin/dashboard/partner'
import React from 'react'

const index = () => {
  return (
    <div>
      <div>
        <DashboardBlogList />
        <div>
          <DashboardPartnerContactList />
          <br/>
          <DashboardContactFormList />
        </div>
      </div>
    </div>
  )
}

export default index