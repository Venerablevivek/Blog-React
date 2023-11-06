import React from 'react'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import Blogs from '../components/Blogs'

const Home = () => {
  return (
    <div className="w-full  h-full flex flex-col gap-y-1 justify-center items-center" >
        <Header/>
        {/* <div className='flex flex-col' > */}
            <Blogs/>
            <Pagination/>
        {/* </div> */}
    </div>
  )
}

export default Home