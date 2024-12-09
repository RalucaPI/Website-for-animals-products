import { Carousel } from '@sefailyasoz/react-carousel';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import discount from './images/discount.png';
import firstorder from './images/firstorder.png';
import informations from './images/informations.png';
import sterilized from './images/sterilized.png';
import topproducts from './images/topproducts.png';
import transport from './images/transport.png';
import './style.css';

const HeroSection = () => {
  const CarouselData = [
    { image: firstorder },
    { image: discount },
    { image: informations },
    { image: sterilized },
    { image: topproducts },
    { image: transport },
  ];

  return (
    <Carousel
      data={CarouselData}
      autoPlay={true}
      rightItem={<FaArrowRight />}
      leftItem={<FaArrowLeft />}
      animationDuration={3000}
      size="normal"
      renderItem={({ item }) => (
        <img
          src={item.image}
          alt="carousel item"
          className="carousel-image"
        />
      )}
    />
  );
};

export default HeroSection;
