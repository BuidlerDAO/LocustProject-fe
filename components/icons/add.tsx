const Add = () => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1453_8962)">
        <path
          d="M5.92893 12.0711L20.0711 12.0711M13 5L13 19.1421"
          stroke="url(#paint0_linear_1453_8962)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1453_8962"
          x="0.428711"
          y="0.5"
          width="25.1426"
          height="25.1421"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.662745 0 0 0 0 1 0 0 0 0 0.960784 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1453_8962"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1453_8962"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1453_8962"
          x1="19.2802"
          y1="12.3409"
          x2="11.529"
          y2="5.92006"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFACF5" />
          <stop offset="0.415277" stopColor="white" />
          <stop offset="1" stopColor="#A8FFF4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Add;
