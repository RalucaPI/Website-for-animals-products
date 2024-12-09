import { useProgress } from "@react-three/drei";
import { usePlay } from "../context/Play";
import { Link } from "react-router-dom";
export const StartPage = () => {
  const { progress } = useProgress();
  const { play, setPlay, hasScroll } = usePlay();
  const handleLogoClick = () => {
    closeMobileMenu();
    if (location.pathname !== "/home") {
      window.location.href = "/home";
    }
  };

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">PawZone</h1>
          <p className="intro__scroll">Scroll to begin</p>
          <button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}
          >
            Start the animations
          </button>
          <Link to='/home' onClick={handleLogoClick} >
            <button className="home"  onClick={handleLogoClick}> Skip to home page
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
