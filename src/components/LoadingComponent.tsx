import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import animationData from "../assets/lottie/loading-02.json"; // Adjust the path as necessary

export default function LoadingComponent() {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData, // Use imported animation data directly
      });

      return () => anim.destroy(); // Optional clean up for unmounting
    }
  }, []);

  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-center">
      <div ref={animationContainer} className="w-1/2 h-1/2"></div>
    </div>
  );
}
