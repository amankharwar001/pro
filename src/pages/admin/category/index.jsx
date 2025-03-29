
import ProductAlignLists from '@/components/Admin/product/AlignLists'
import CategoryList from '@/components/CategoryList'
import React from 'react'

const index = () => {
  return (
    <>
        <div className='grid grid-cols-2 gap-10'>
          <div>
            <CategoryList/>
          </div>
            <div>
              <ProductAlignLists/>
            </div>
        </div>
    </>
  )
}

export default index