"use client";

interface Properties {
  name: string;
  duration: string;
  timingFunction: string;
  delay: string;
  iterationCount: string;
  direction: string;
  fillMode: string;
  state: string;
}

const setAnimation = (elementId: string, properties: Properties): void => {
  const element = document.getElementById(elementId);
  if (!element) return; // Exit if element not found

  const {
    name,
    duration,
    timingFunction,
    delay,
    iterationCount,
    direction,
    fillMode,
    state,
  } = properties;

  if (name) element.style.animationName = name;
  if (duration) element.style.animationDuration = duration;
  if (timingFunction) element.style.animationTimingFunction = timingFunction;
  if (delay) element.style.animationDelay = delay;
  if (iterationCount) element.style.animationIterationCount = iterationCount;
  if (direction) element.style.animationDirection = direction;
  if (fillMode) element.style.animationFillMode = fillMode;
  if (state) element.style.animationPlayState = state;
};

function clearAnimation(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return; // Exit if element not found

  // Reset animation-related styles
  element.style.animationName = "";
  element.style.animationDuration = "";
  element.style.animationTimingFunction = "";
  element.style.animationDelay = "";
  element.style.animationIterationCount = "";
  element.style.animationDirection = "";
  element.style.animationFillMode = "";
  element.style.animationPlayState = "";
}

export default function AnimationDemoPage() {
  function initialAnimation() {
    const element = document.getElementById("animation-test");
    if (!element) return; // Exit if element not found
    element?.addEventListener("animationstart", function () {
      console.log("Animation started");
    });

    element?.addEventListener("animationiteration", function () {
      console.log("Animation iteration");
    });

    element?.addEventListener("animationend", function () {
      clearAnimation("animation-test");
      console.log("Animation end");
    });

    setAnimation("animation-test", {
      name: "colorChange",
      duration: "2s",
      timingFunction: "ease-in-out",
      delay: "0s",
      iterationCount: "2",
      direction: "alternate",
      fillMode: "both",
      state: "paused",
    });
  }

  function toggleAnimation() {
    const element = document.getElementById("animation-test");
    if (!element) return; // Exit if element not found
    let state = element.style.animationPlayState;
    console.log("Current State of Animation: ", state);
    if (state === "paused") {
      element.style.animationPlayState = "running";
    } else if (state === "running") {
      element.style.animationPlayState = "paused";
    }
  }

  return (
    <>
      <div
        className="flex flex-col h-[100vh] w-[100vw] justify-center items-center"
        id="animation-test"
      >
        <button onClick={() => initialAnimation()} className="text-2xl">
          Initial Animation
        </button>
        <button onClick={() => toggleAnimation()} className="text-2xl">
          Toggle Animation
        </button>
      </div>
    </>
  );
}
