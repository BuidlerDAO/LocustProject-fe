export const ThumbsupIcon = ({ ...props }) => {
  return (
    <svg
      width="78"
      height="79"
      viewBox="0 0 78 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_0_1)">
        <rect
          x="14"
          y="9"
          width="50"
          height="50"
          rx="25"
          fill="url(#paint0_linear_0_1)"
          shapeRendering="crispEdges"
        />
        <rect
          x="14.51"
          y="9.51"
          width="48.98"
          height="48.98"
          rx="24.49"
          stroke="url(#paint1_radial_0_1)"
          strokeWidth="1.02"
          shapeRendering="crispEdges"
        />
        <rect
          x="14.51"
          y="9.51"
          width="48.98"
          height="48.98"
          rx="24.49"
          stroke="url(#paint2_radial_0_1)"
          strokeWidth="1.02"
          shapeRendering="crispEdges"
        />
      </g>
      <path
        d="M41.2302 28.1246V23.6246C41.2302 22.7294 40.8746 21.871 40.2416 21.238C40.0049 21.0013 39.7365 20.8033 39.4465 20.6483C38.5579 20.1731 37.5914 20.843 37.1821 21.7639L33.3551 30.3747V42.7498H46.0452C46.5879 42.756 47.1144 42.5658 47.5279 42.2143C47.9414 41.8629 48.2139 41.3738 48.2953 40.8373L49.8478 30.7122C49.8967 30.3897 49.875 30.0604 49.7841 29.7472C49.6931 29.4339 49.5352 29.1442 49.3211 28.8981C49.1071 28.652 48.8421 28.4553 48.5446 28.3217C48.247 28.1882 47.9239 28.1209 47.5978 28.1246H41.2302ZM33.3551 42.7498H29.98C29.3833 42.7498 28.811 42.5128 28.389 42.0908C27.967 41.6689 27.73 41.0965 27.73 40.4998V32.6247C27.73 32.0279 27.967 31.4556 28.389 31.0337C28.811 30.6117 29.3833 30.3747 29.98 30.3747H33.3551"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d_0_1"
          x="0.0371962"
          y="0.622317"
          width="77.9256"
          height="77.9256"
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
          <feOffset dy="5.58512" />
          <feGaussianBlur stdDeviation="6.9814" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_0_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_0_1"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_0_1"
          x1="18.375"
          y1="6.5"
          x2="41.9659"
          y2="62.8467"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.4" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_0_1"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(64.2074 57.1701) rotate(-140.546) scale(65.9239 45.2287)"
        >
          <stop stopColor="#353C46" />
          <stop offset="1" stopColor="#151515" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_0_1"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-9.05556 -2.04166) rotate(26.5462) scale(62.9308 53.8817)"
        >
          <stop stopColor="white" stopOpacity="0.24" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
