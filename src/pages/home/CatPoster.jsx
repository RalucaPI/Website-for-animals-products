import React from 'react'
import './HomePage.css'
import pawblack from './images/pawblack.png'
import pawwhite from './images/pawwhite.png'
import pawcolor from './images/pawcolor.png'
import paw1 from './images/paw1.png'
import paw2 from './images/paw2.png'
import paw3 from './images/paw3.png'
import paw4 from './images/paw4.png'
import Cat from './images/Cat.webp'
import {CatContainer} from './containers/CatContainer'
export const CatPoster = () => {
    return (
        <>
            <div className='image-container' id='image-cat-container'>
                <img
                    src={Cat}
                    className='image-cat'
                    id='cat-image'
                />
                <div className='text-cat' id='text-cat-container'>
                    <div className='text-1' id='text-1'> Cats Cats Cats Cats</div>
                    <div className='text-2' id='text-2'> Cats Cats Cats Cats</div>
                    <div className='text-3' id='text-3'> Cats Cats Cats Cats</div>
                </div>
                <div className='paw-cat' id='paw-container'>
                    <img src={pawblack} className='paw-image paw-image-bottom-right' alt='Paw Black' id='paw-black-bottom-right' />
                    <img src={pawcolor} className='paw-image paw-image-top-right' alt='Paw Color' id='paw-color-top-right' />
                    <img src={pawwhite} className='paw-image paw-image-bottom-left' alt='Paw White' id='paw-white-bottom-left' />
                    <img src={pawwhite} className='paw-image paw-image4' alt='Paw White' id='paw-white-4' />
                    <img src={pawcolor} className='paw-image paw-image5' alt='Paw Color' id='paw-color-5' />
                    <img src={pawblack} className='paw-image paw-image6' alt='Paw Black' id='paw-black-6' />
                    <img src={paw1} className='paw-image paw-image7' alt='Paw 1' id='paw-1' />
                    <img src={paw2} className='paw-image paw-image8' alt='Paw 2' id='paw-2' />
                    <img src={paw3} className='paw-image paw-image9' alt='Paw 3' id='paw-3' />
                    <img src={paw4} className='paw-image paw-image10' alt='Paw 4' id='paw-4' />
                </div>         
                <div className='container-cat' id='cat-container'>
                    <CatContainer />
                </div> 
                
            </div>
        </>
    )
}
