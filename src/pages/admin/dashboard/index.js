

import DashboardBlogList from '@/components/Admin/dashboard/bloglist'
import DashboardContactFormList from '@/components/Admin/dashboard/contactList'
import DashboardNumberCardSection from '@/components/Admin/dashboard/NumberCard'
import DashboardPartnerContactList from '@/components/Admin/dashboard/partner'
import React from 'react'


const index = () => {
  return (
    <div>
      <div>
        <DashboardNumberCardSection />
        <hr/>
        <DashboardBlogList />
          <hr/>
        <div className='mt-5'>
          <DashboardPartnerContactList />
          <br/>
          <DashboardContactFormList />
        </div>
      </div>
    </div>
  )
}

export default index