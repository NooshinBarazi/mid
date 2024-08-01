import React from 'react';

interface BackIconProps {
    className?: string;
}

const BackIcon: React.FC<BackIconProps> = ({ className }) => {
    return (
        <svg
            className={`inline-block ${className}`}
            viewBox="0 0 53 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M44.1666 30.0527H17.2838L29.621 15.0344L26.4999 11.235L8.83325 32.741L26.4999 54.2469L29.621 50.4475L17.2838 35.4292H44.1666V30.0527Z"
                fill="black"
            />
        </svg>
    );
};

export default BackIcon;
