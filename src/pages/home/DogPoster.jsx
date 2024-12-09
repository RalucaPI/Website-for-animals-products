import React from 'react'
import sleepingcorgi from './images/sleepingcorgi.jpeg'
import { DogContainer } from './containers/DogContainer'
export const DogPoster = () => {
  return (
      <>
        <div className='image-container-dog'>
        <img
          src={sleepingcorgi}
          alt='dog'
          className='image-dog'
        />
        <div className='dog-zzz'>        
        <img
          src='https://media1.giphy.com/media/EuxI296dwYZ3SIH8cG/giphy.gif?cid=6c09b952ozeu7levtizj5s8gbl38i1g8px1hllqccqsfiema&ep=v1_stickers_related&rid=giphy.gif&ct=s'
          alt='zzz'
            className='zzz'
        /></div>  
        <div className='dog-bubble'>        
            <img
            src='https://i.gifer.com/ZcsV.gif'
            alt='zzz-bubble'
            className='bubble-zzz'
            />
        </div> 
        <div className='container-dog'>
          <DogContainer />
        </div>
             
      </div>
    </>
  )
}
