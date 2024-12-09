import { Float, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Euler, Group, Vector3 } from "three";
import { usePlay } from "../context/Play";
import { fadeOnBeforeCompile } from "../material/fadeMaterial";
import { Background } from "./Background";
import { TextSection } from "./TextSection";
import { WaveBird } from './WaveBird'; 
import { Cats } from '../animations/cats/Cats'; 
import { Birds } from '../animations/birds/Birds';
import { Rodents } from '../animations/rodents/Rodents';
import { Dog } from '../animations/dog/Dog';
import { Reptile } from '../animations/reptile/Reptile';
import { Fish } from '../animations/fish/Fish';


const LINE_NB_POINTS = 500;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_WaveBird = 0.02;
const WaveBird_MAX_ANGLE = 35;
const FRICTION_DISTANCE = 42;

export const Experience = () => {
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, -10, 0),
      new THREE.Vector3(0, 15, -CURVE_DISTANCE),
      new THREE.Vector3(20, -15, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-50, 15, -3 * CURVE_DISTANCE),
      new THREE.Vector3(50, -15, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 15, -6 * CURVE_DISTANCE),
      new THREE.Vector3(20, -15, -7 * CURVE_DISTANCE),
      new THREE.Vector3(0, 15, -8 * CURVE_DISTANCE),
    ],
    []
  );
  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef();
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  const textSections = useMemo(() => {
    return [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[1].x - 3,
          curvePoints[1].y,
          curvePoints[1].z
        ),
        subtitle: `Welcome to PawZone!`,
      },
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[2].x + 2,
          curvePoints[2].y,
          curvePoints[2].z
        ),
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[3].x - 1,
          curvePoints[3].y - 0.5,
          curvePoints[3].z - 5
        ),
      },
      {
        cameraRailDist: +1.5,
        position: new Vector3(
          curvePoints[4].x + 3.5,
          curvePoints[4].y + 2,
          curvePoints[4].z - 12
        ),
      },

      {
        cameraRailDist: 1,
        position: new Vector3(
          curvePoints[5].x + 2,
          curvePoints[5].y,
          curvePoints[5].z - 7
        ),
      },

      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[6].x + 1.2,
          curvePoints[6].y + 0.5,
          curvePoints[6].z
        ),
      },

      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[7].x - 1,
          curvePoints[7].y + 4,
          curvePoints[7].z - 12
        ),
      },
    ];
  }, []);

  const animationCats = useMemo(
    () => [
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[2].x - 6,
          curvePoints[2].y,
          curvePoints[2].z - 3
        ),
      },
    ],
    []
  );
  const animationBirds = useMemo(
    () => [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[3].x - 3,
          curvePoints[3].y,
          curvePoints[3].z
        ),
      },
    ],
    []
  );
  const animationDog = useMemo(
    () => [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[4].x + 3,
          curvePoints[4].y,
          curvePoints[4].z - 12
        ),
      },
    ],
    []
  );
  const animationRodents = useMemo(
    () => [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[5].x + 2,
          curvePoints[5].y,
          curvePoints[5].z - 7
        ),
      },
    ],
    []
  );
  const animationReptile = useMemo(
    () => [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[6].x + 1.5,
          curvePoints[6].y,
          curvePoints[6].z
        ),
      },
    ],
    []
  );
  const animationFish = useMemo(
    () => [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[7].x,
          curvePoints[7].y + 2,
          curvePoints[7].z - 3
        ),
      },
    ],
    []
  );
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const cameraRail = useRef();
  const camera = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0);

  const { play, setHasScroll } = usePlay();

  useFrame((_state, delta) => {
    if (window.innerWidth > window.innerHeight) {
      // LANDSCAPE
      camera.current.fov = 30;
      camera.current.position.z = 5;
    } else {
      // PORTRET
      camera.current.fov = 80;
      camera.current.position.z = 2;
    }

    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true);
    }

    if (play && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta * 0.1
      );
    }

    lineMaterialRef.current.opacity = sceneOpacity.current;

    const scrollOffset = Math.max(0, scroll.offset);

    let friction = 2;
    let resetCameraRail = true;
    // TEXT INCETINIRE
    textSections.forEach((textSection) => {
      const distance = textSection.position.distanceTo(
        cameraGroup.current.position
      );

      if (distance < FRICTION_DISTANCE) {
        friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
        const targetCameraRailPosition = new Vector3(
          (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
          0,
          0
        );
        cameraRail.current.position.lerp(targetCameraRailPosition, delta);
        resetCameraRail = false;
      }
    });
    if (resetCameraRail) {
      const targetCameraRailPosition = new Vector3(0, 0, 0);
      cameraRail.current.position.lerp(targetCameraRailPosition, delta);
    }

    // CALCULATE LERPED SCROLL OFFSET
    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current,
      scrollOffset,
      delta * friction
    );
    // PROTECT BELOW 0 AND ABOVE 1
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

    lastScroll.current = lerpedScrollOffset;
    tl.current.seek(lerpedScrollOffset * tl.current.duration());

    const curPoint = curve.getPoint(lerpedScrollOffset);

    // Follow the curve points
    cameraGroup.current.position.lerp(curPoint, delta * 24);

    // Make the group look ahead on the curve

    const lookAtPoint = curve.getPoint(
      Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1)
    );

    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );
    const targetLookAt = new THREE.Vector3()
      .subVectors(curPoint, lookAtPoint)
      .normalize();

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    );

    // rotatie

    const tangent = curve.getTangent(lerpedScrollOffset + CURVE_AHEAD_WaveBird);

    const nonLerpLookAt = new Group();
    nonLerpLookAt.position.copy(curPoint);
    nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));

    tangent.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -nonLerpLookAt.rotation.y
    );

    let angle = Math.atan2(-tangent.z, tangent.x);
    angle = -Math.PI / 2 + angle;

    let angleDegrees = (angle * 180) / Math.PI;
    angleDegrees *= 2.4;

    // LIMIT  ANGLE
    if (angleDegrees < 0) {
      angleDegrees = Math.max(angleDegrees, -WaveBird_MAX_ANGLE);
    }
    if (angleDegrees > 0) {
      angleDegrees = Math.min(angleDegrees, WaveBird_MAX_ANGLE);
    }

    // SET BACK ANGLE
    angle = (angleDegrees * Math.PI) / 180;

    const targetwavebirdQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        wavebird.current.rotation.x,
        wavebird.current.rotation.y,
        angle
      )
    );
    wavebird.current.quaternion.slerp(targetwavebirdQuaternion, delta * 2);
  });

  const wavebird = useRef();

  const tl = useRef();
  const backgroundColors = useRef({
    colorA: "#4dffff",
    colorB: "#ffff00",
  });

  const wavebirdInTl = useRef();

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(backgroundColors.current, {
      duration: 1.3,
      colorA: "#33d6ff",
      colorB: "#00e600",
    });
    tl.current.to(backgroundColors.current, {
      duration: 0.5,
      colorA: "#ffffff",
      colorB: "#00ffff",
    });
    tl.current.to(backgroundColors.current, {
      duration: 0.5,
      colorA: "#ffff00",
      colorB: "#ff66ff",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#ff6666",
      colorB: "#b30000",
    });

    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#660066",
      colorB: "#000066",
    });

    tl.current.pause();

    wavebirdInTl.current = gsap.timeline();
    wavebirdInTl.current.pause();
    wavebirdInTl.current.from(wavebird.current.position, {
      duration: 3,
      z: 5,
      y: -2,
    });
  }, []);

  useEffect(() => {
    if (play) {
      wavebirdInTl.current.play();
    }
  }, [play]);

  return useMemo(
    () => (
      <>
        <directionalLight position={[0, 3, 1]} intensity={0.1} />
        {/* <OrbitControls /> */}
        <group ref={cameraGroup}>
          <Background backgroundColors={backgroundColors} />
          <group ref={cameraRail}>
            <PerspectiveCamera
              ref={camera}
              position={[0, 0, 5]}
              fov={30}
              makeDefault
            />
          </group>
          <group ref={wavebird}>
            <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
              <WaveBird
                rotation-y={Math.PI / 2}
                scale={[0.2, 0.2, 0.2]}
                position-y={0.1}
              />
            </Float>

          </group>
        </group>
        {/* TEXT */}
        {textSections.map((textSection, index) => (
          <TextSection {...textSection} key={index} />
        ))}

        {/* LINE */}
        <group position-y={-1}>
          <mesh>
            <extrudeGeometry
              args={[
                shape,
                {
                  steps: LINE_NB_POINTS,
                  bevelEnabled: false,
                  extrudePath: curve,
                },
              ]}
            />
            <meshStandardMaterial
              color={"white"}
              ref={lineMaterialRef}
              transparent
              envMapIntensity={2}
              onBeforeCompile={fadeOnBeforeCompile}
            />
          </mesh>
        </group>

        {animationCats.map((catAnimation, index) => (
          <Cats {...catAnimation} key={index} />
        ))}
        {animationBirds.map((birdAnimation, index) => (
          <Birds {...birdAnimation} key={index} />
        ))}
        {animationDog.map((dogAnimation, index) => (
          <Dog {...dogAnimation} key={index} />
        ))}
        {animationRodents.map((rodentsAnimation, index) => (
          <Rodents {...rodentsAnimation} key={index} />
        ))}
        {animationReptile.map((reptileAnimation, index) => (
          <Reptile {...reptileAnimation} key={index} />
        ))}
        {animationFish.map((fishAnimation, index) => (
          <Fish {...fishAnimation} key={index} />
        ))}
      </>
    ),
    []
  );
};
