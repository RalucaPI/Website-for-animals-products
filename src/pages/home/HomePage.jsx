import React from 'react'
import { CatPoster } from './CatPoster'
import  HeroSection  from '../../components/carousel/HeroSection'
import { DogPoster } from './DogPoster'
import { BirdPoster } from './BirdPoster'
import { FishPoster } from './FishPoster'
import { ReptilePoster } from './ReptilePoster'
import { RodentsPoster } from './RodentsPoster'
export const HomePage = () => {
  return (
    <>
      <HeroSection/>
      <CatPoster />
      <DogPoster />
      <BirdPoster />
      <FishPoster />
      <ReptilePoster />
      <RodentsPoster/>
    </>
  )
}
