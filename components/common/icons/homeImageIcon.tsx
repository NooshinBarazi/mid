interface HomeImageIconProps {
  className?: string;
}

const HomeImageIcon: React.FC<HomeImageIconProps> = ({ className }) => {
  return (
    <svg
      className={`inline-block ${className}`}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4 36V23.2941H21.6V36H30.6V19.0588H36L18 0L0 19.0588H5.4V36H14.4Z"
        fill="#0D0D0D"
      />
    </svg>
  );
};

export default HomeImageIcon;
