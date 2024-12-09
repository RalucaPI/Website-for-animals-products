import React from 'react'
import claws from './images/claws.png'
import { ReptileContainer } from './containers/ReptileContainer'

export const ReptilePoster = () => {
    return (
      <>
            <div className='image-container-reptile'>
                <div className='image-reptile'>
                    <img src='https://wallpapercave.com/wp/qNqmdfC.jpg' alt='soparla' className='img-soparla'/>
                 <div className='img-overlay'></div>
                </div>
                <div className='text-reptile'>Reptile</div>
                <div className='container-reptile'>
                    <ReptileContainer/>
                </div>
                <div className='claws'>
                    <img src={claws} alt='claw'/>
                </div>
                <div className='reptile-claws'>
                    <img src={claws} alt='claws'/>
                </div>
            </div>
      </>
  )
}
