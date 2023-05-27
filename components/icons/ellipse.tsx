const Ellipse = () => {
  return (
    <svg
      width="352"
      height="328"
      viewBox="0 0 352 328"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_43_52)">
        <circle
          cx="281"
          cy="281"
          r="81"
          fill="url(#paint0_radial_43_52)"
          fillOpacity="0.4"
          rx="20"
          ry="20"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_43_52"
          x="0"
          y="0"
          width="562"
          height="562"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_43_52"
          />
        </filter>
        <radialGradient
          id="paint0_radial_43_52"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(260.725 168.268) rotate(57.982) scale(75.5964 190.163)"
        >
          <stop offset="0.052504" stopColor="#5143FB" />
          <stop offset="1" stopColor="#B562FE" stopOpacity="0.6" />
        </radialGradient>
      </defs>
    </svg>
  );
};
export default Ellipse;
