import debounce from "./debounce";

export default function fixViewportUnits() {
  fixViewportUnitsHelper();
  window.addEventListener("resize", debounce(fixViewportUnitsHelper));
}

function fixViewportUnitsHelper() {
  const viewportHeightUnit = window.innerHeight * 0.01;
  const viewportWidthUnit = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vh", `${viewportHeightUnit}px`);
  document.documentElement.style.setProperty("--vw", `${viewportWidthUnit}px`);
}
