import React from 'react'
import { RodentsContainer } from './containers/RodentsContainer'
export const RodentsPoster = () => {
    return (
        <>
    <div className='image-container-rodents'>
        <div className='image-rodents'>
            <img src='http://i.imgur.com/b6XJX61.jpg' alt='rodents' className='image-rodents'/>
        </div>
          <div className='container-rodents'>
            <RodentsContainer/>
      </div>
    </div>
    </>
  )
}
