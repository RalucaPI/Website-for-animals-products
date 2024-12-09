import React from 'react'
import { Link} from 'react-router-dom';
export const FishPoster = () => {
    return (
      <>
            <div className='image-container-fish'>
                <img src='https://images.wallpaperscraft.com/image/single/fish_blue_water_209008_3840x2400.jpg' className='image-fish' alt='pesste'/>
                <div className='container-fish'>
                </div>  
                
              <div className='bubble'>
              <Link to="/fish">
                    <img src='https://img1.picmix.com/output/stamp/normal/3/8/7/9/859783_9a17e.gif' alt='bubble' className='bubble-two'/>
            </Link>
          </div>
        </div>
    </>
  )
}
