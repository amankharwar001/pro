import Layout from '@/components/Admin/common/Layout'
import CategoryList from '@/components/CategoryList'
import React from 'react'

const index = () => {
  return (
    <Layout>
        <div>
            <CategoryList/>
        </div>
    </Layout>
  )
}

export default index