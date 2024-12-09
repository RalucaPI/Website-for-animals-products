import { Road } from "./Road";
import { PlayProvider } from "../context/Play";
import "./Road.css";
export function Start() {
  return (
    <PlayProvider>
      <Road />
    </PlayProvider>
  );
}
