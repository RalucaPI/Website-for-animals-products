import React from 'react'
import parrots from './images/parrots.jpg'
import {BirdContainer} from './containers/BirdContainer'
export const BirdPoster = () => {
    return (
        <>
            <div className='image-container-bird'>
                <img src={parrots} className='imag-bird' alt='bird'/>
                <div className='container-bird'>
                <div className='container-bird'>
                <BirdContainer/>
                </div>   
                </div>
            </div>
        </>
  )
}
