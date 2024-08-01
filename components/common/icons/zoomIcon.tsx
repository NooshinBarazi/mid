interface ZoomIconProps {
  className?: string;
}

const ZoomIcon: React.FC<ZoomIconProps> = ({ className }) => {
  return (
    <svg
    className={`inline-block ${className}`}
      viewBox="0 0 41 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="20.4429"
        cy="3.97033"
        rx="3.02857"
        ry="3.97033"
        fill="#1A1010"
      />
      <line
        x1="15.8999"
        y1="4.47034"
        x2="-9.72748e-05"
        y2="4.47034"
        stroke="black"
      />
      <line
        x1="40.8857"
        y1="4.47034"
        x2="24.9857"
        y2="4.47034"
        stroke="black"
      />
    </svg>
  );
};

export default ZoomIcon;
