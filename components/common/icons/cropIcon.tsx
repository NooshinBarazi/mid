interface CropIconProps {
  className?: string;
}

const CropIcon: React.FC<CropIconProps> = ({ className }) => {
  return (
    <svg
    className={`inline-block ${className}`}
      viewBox="0 0 47 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_596_13)">
        <path
          d="M12.3889 2.28174L12.1428 30.4067C12.1428 31.4013 12.5417 32.3551 13.2516 33.0584C13.9616 33.7616 14.9245 34.1567 15.9285 34.1567H44.3214"
          stroke="black"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.67847 11.9005L31.0713 11.6567C32.0754 11.6567 33.0383 12.0518 33.7482 12.7551C34.4582 13.4583 34.857 14.4122 34.857 15.4067V43.5317"
          stroke="black"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_596_13">
          <rect
            width="45.4286"
            height="45"
            fill="white"
            transform="translate(0.785645 0.406738)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CropIcon;
