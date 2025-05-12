// import React from 'react';
// import styled from 'styled-components';

// const Loader = () => {
//   return (
//     <StyledWrapper>
//       <div className="loader-container">
//         <div className="loader" />
//       </div>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .loader-container {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   .loader {
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     animation: spin 1s linear infinite;
//   }

// //   @keyframes spin {
// //     0% {
// //       transform: rotate(0deg);
// //       box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.4);
// //     }

// //     50% {
// //       transform: rotate(180deg);
// //       box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.4);
// //     }

// //     100% {
// //       transform: rotate(360deg);
// //       box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.4);
// //     }
// //   }

// @keyframes spin {
//   0% {
//     transform: rotate(0deg);
//     box-shadow: 0 -1px 0 rgba(128, 128, 128, 0.6); /* gray */
//   }

//   50% {
//     transform: rotate(180deg);
//     box-shadow: 0 -1px 0 rgba(128, 128, 128, 0.6); /* gray */
//   }

//   100% {
//     transform: rotate(360deg);
//     box-shadow: 0 -1px 0 rgba(128, 128, 128, 0.6); /* gray */
//   }
// }

    
//   `;

// export default Loader;

import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
        <div className="loader-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" className="loader">
                <circle r={176} cy={192} cx={192} strokeWidth={32} fill="transparent" pathLength={360} className="active" />
                <circle r={176} cy={192} cx={192} strokeWidth={32} fill="transparent" pathLength={360} className="track" />
            </svg>
        </div>
      
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Inspired by: m3.material.io/components/progress-indicators/overview */
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader {
    
    width: 32px;
    /* Subpixels get cut off */
    overflow: visible;
    transform: rotate(-90deg);
    transform-origin: center;

    --active: #a6abad;
    --track: #ededed;

    --duration: 8s;

    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      rotate: 0deg;
    }

    100% {
      rotate: 360deg;
    }
  }

  .active {
    stroke: var(--active);
    stroke-linecap: round;
    stroke-dashoffset: 360;
    animation: active-animation var(--duration) ease-in-out infinite;
  }

  @keyframes active-animation {
    0% {
      stroke-dasharray: 0 0 0 360 0 360;
    }
    12.5% {
      stroke-dasharray: 0 0 270 90 270 90;
    }
    25% {
      stroke-dasharray: 0 270 0 360 0 360;
    }
    37.5% {
      stroke-dasharray: 0 270 270 90 270 90;
    }
    50% {
      stroke-dasharray: 0 540 0 360 0 360;
    }
    50.001% {
      stroke-dasharray: 0 180 0 360 0 360;
    }
    62.5% {
      stroke-dasharray: 0 180 270 90 270 90;
    }
    75% {
      stroke-dasharray: 0 450 0 360 0 360;
    }
    87.5% {
      stroke-dasharray: 0 450 270 90 270 90;
    }
    87.501% {
      stroke-dasharray: 0 90 270 90 270 90;
    }
    100% {
      stroke-dasharray: 0 360 1 360 0 360;
    }
  }

  .track {
    stroke: var(--track);
    stroke-linecap: round;
    stroke-dashoffset: 360;
    animation: track-animation var(--duration) ease-in-out infinite;
  }

  @keyframes track-animation {
    0% {
      stroke-dasharray: 0 20 320 40 320 40;
    }
    12.5% {
      stroke-dasharray: 0 290 50 310 50 310;
    }
    25% {
      stroke-dasharray: 0 290 320 40 320 40;
    }
    37.5% {
      stroke-dasharray: 0 560 50 310 50 310;
    }
    37.501% {
      stroke-dasharray: 0 200 50 310 50 310;
    }
    50% {
      stroke-dasharray: 0 200 320 40 320 40;
    }
    62.5% {
      stroke-dasharray: 0 470 50 310 50 310;
    }
    62.501% {
      stroke-dasharray: 0 110 50 310 50 310;
    }
    75% {
      stroke-dasharray: 0 110 320 40 320 40;
    }
    87.5% {
      stroke-dasharray: 0 380 50 310 50 310;
    }
    100% {
      stroke-dasharray: 0 380 320 40 320 40;
    }
  }`;

export default Loader;


// import React from 'react';
// import styled from 'styled-components';

// const Loader = () => {
//   return (
//     <StyledWrapper>
//       <div className="loader-container">
//         <div className="loader" />
//       </div>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   .loader-container {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 16px;
//   }

//   .loader {
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     border: 4px solid #ccc;
//     border-top: 4px solid #555; /* darker for spinning effect */
//     animation: spin 1s linear infinite;
//   }

//   @keyframes spin {
//     0% {
//       transform: rotate(0deg);
//     }

//     100% {
//       transform: rotate(360deg);
//     }
//   }
// `;

// export default Loader;



// import React from 'react';
// import styled from 'styled-components';

// const Loader = () => {
//   return (
//     <StyledWrapper>
//       <div className="loader">
//         <label>Redirecting...</label>
//         <div className="loading" />
//       </div>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .loader {
//     width: 350px;
//     height: 180px;
//     border-radius: 10px;
//     background: #fff;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-evenly;
//     padding: 30px;
//     box-shadow: 2px 2px 10px -5px lightgrey;
//   }
//   .loading {
//     width: 100%;
//     height: 10px;
//     background: lightgrey;
//     border-radius: 10px;
//     position: relative;
//   }
//   .loading::after {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 50%;
//     height: 10px;
//     background: #002;
//     border-radius: 10px;
//     z-index: 1;
//     animation: loading 0.6s alternate infinite;
//   }
//   label {
//     color: #002;
//     font-size: 18px;
//     animation: bit 0.6s alternate infinite;
//   }

//   @keyframes bit {
//     from {
//       opacity: 0.3;
//     }
//     to {
//       opacity: 1;
//     }
//   }

//   @keyframes loading {
//     0% {
//       left: 25%;
//     }
//     100% {
//       left: 50%;
//     }
//     0% {
//       left: 0%;
//     }
//   }`;

// export default Loader;
