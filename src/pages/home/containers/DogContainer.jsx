import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { interpolate } from "@popmotion/popcorn";
import { Link, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  border-radius: 8px;
  transform-style: preserve-3d;
  transform: perspective(550px);
  position: relative;
  margin: 5rem;
  margin-left: auto;
  @media screen and (max-width: 500px) {
    width: 300px; /* Width when screen is under 500px */
    height: 200px; /* Height when screen is under 500px */
  }

  @media screen and (min-width: 501px) and (max-width: 1000px) {
    width: 450px; /* Width when screen is between 501px and 1000px */
    height: 350px; /* Height when screen is between 501px and 1000px */
  }
`;

const Content = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  transform-style: preserve-3d;
  perspective: 550px;
  backface-visibility: hidden;
  
`;

const Shadow = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  width:90%;
  border-radius: 1rem;
  height: 90%;
  transition: all 0.2s ease-out 0s;
  box-shadow: rgba(0, 0, 0, 03) 0px 30px 90px -30px;
`;

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 500px;
  backface-visibility: hidden;
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: translateZ(0);
  bottom: 0;
  background-size: cover;
  border-radius: 1rem;
  background-image: url('https://m.media-amazon.com/images/I/913CvabhHRL._AC_UF1000,1000_QL80_.jpg');
`;

const Gradient = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.5s ease;
`;
const Text = styled.span`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.9rem;
  color: black;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 2s ease-in-out;
  white-space: nowrap;
`;

export function DogContainer({ height = 200, width = 350 }) {
    
  const ref = useRef();
  const [hover, setHover] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const navigate = useNavigate();
   const location = useLocation();
  const centerPoint = [width / 2, height / 2];
  const xy = useMotionValue(centerPoint);

  const tx = 0.03;

  // get rotateY
  const transformX = interpolate([0, width], [width * tx, width * tx * -0.3]);
  const rotateY = useTransform(xy, ([x]) => transformX(x));

  // get rotateX
  const transformY = interpolate(
    [0, height],
    [height * tx * -0.3, height * tx * 0.3]
  );
  const rotateX = useTransform(xy, ([, y]) => transformY(y));

  const config = {
    stiffness: 100,
    damping: 10
  };

  const springX = useSpring(rotateX, config);
  const springY = useSpring(rotateY, config);

  const gradientOpacity = useTransform(xy, ([, y]) => {
    return interpolate([0, height], [0, 0.5])(y);
  });

  const gradientOpacitySpring = useSpring(gradientOpacity, config);

  const gradient = useTransform(gradientOpacitySpring, opacity => {
    let [x, y] = xy.get();
    
    if (y === centerPoint[1]) {
      y = centerPoint[1] + 1;
    }

    const angle = Math.atan2(y - centerPoint[1], x - centerPoint[0]);
    const degree =
      ((angle > 0 ? angle : 2 * Math.PI + angle) * 360) / (2 * Math.PI) - 90;
    return `linear-gradient(${degree}deg, rgba(255,255,255,${opacity}), rgba(255,255,255,0) 80%)`;
  });

  function onMouseOver(e) {
    if (tapped) return;
    const rect = e.target.getBoundingClientRect();
    xy.set([e.clientX - rect.left, e.clientY - rect.top]);
  }

  function hoverStart() {
    setHover(true);
  }

  function hoverEnd() {
    setHover(false);
  }

  useEffect(() => {
    
    if (!hover) {
      xy.set(centerPoint);
    }
  }, [hover, xy, centerPoint]);
  useEffect(() => {
    setTextVisible(true);
  }, []);
////////////////////////////////
  useEffect(() => {
    gsap.utils.toArray(".revealUp").forEach(function (elem) {
      ScrollTrigger.create({
        trigger: elem,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: function () {
          gsap.fromTo(
            elem,
            { y: 100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: "back",
              overwrite: "auto"
            }
          );
        },
        onLeave: function () {
          gsap.fromTo(
            elem,
            { autoAlpha: 1 },
            { autoAlpha: 0, overwrite: "auto" }
          );
        },
        onEnterBack: function () {
          gsap.fromTo(
            elem,
            { y: -100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: "back",
              overwrite: "auto"
            }
          );
        },
        onLeaveBack: function () {
          gsap.fromTo(
            elem,
            { autoAlpha: 1 },
            { autoAlpha: 0, overwrite: "auto" }
          );
        }
      });
    });
  }, []);



////////////////////////////////
  const isRedirectedPage = location.pathname === "/dogs";
  return (
    <>
     <div className="revealUp">
      <Container  ref={ref} style={{ height: `${height}px`, width: `${width}px` }}
      >  {isRedirectedPage ? null : (
        <Link to="/dogs">
      <Content
        style={{
          scale: 1,
          rotateX: springX,
          rotateY: springY
        }}
        whileHover={{
          scale: 1.0
        }}
        whileTap={{
          scale: 0.97
        }}
        onTapCancel={e => {
          setTapped(false);
          onMouseOver(e);
        }}
        onTapStart={() => {
          setTapped(true);
        }}
        onTap={e => {
          setTapped(false);
        }}
        onHoverStart={hoverStart}
        onHoverEnd={hoverEnd}
        onMouseMove={onMouseOver}
      >
        <Shadow hover={hover} />
        <RelativeContainer>
                  <Image />
                  <Text visible={textVisible}>
                    
            </Text>
        </RelativeContainer>
        <Gradient
          style={{
            background: gradient
          }}
        />
      </Content>  </Link>)}
          </Container>
      </div>
         
      </>
  );
}
