import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loading({ cityName }) {
  return (
    <div className="loading-container">
      <DotLottieReact
        src="/animations/citytrip-loading.lottie"
        loop
        autoplay
        className="loading-animation"
      />

      <p>{cityName
          ? `Planning your trip to ${cityName}...`
          : "Searching for destinations..."}</p>
    </div>
  );
}

export default Loading;