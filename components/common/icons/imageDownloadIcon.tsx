interface ImageDownloadIconProps {
  className?: string;
}


const ImageDownloadIcon: React.FC<ImageDownloadIconProps> = ({ className }) => {
  return (
    <svg
      className={`inline-block ${className}`}
      viewBox="0 0 37 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.841 0H0.782351C0.350493 0 0 0.304471 0 0.679623V20.7856C0 21.1607 0.350493 21.4652 0.782351 21.4652H3.66297C4.09482 21.4652 4.44532 21.1607 4.44532 20.7856V3.86128H32.1777V20.7856C32.1777 21.1607 32.5282 21.4652 32.96 21.4652H35.8406C36.2725 21.4652 36.623 21.1607 36.623 20.7856V0.679623C36.6234 0.304471 36.2729 0 35.841 0Z"
        fill="black"
      />
      <path
        d="M26.8964 20.4631C26.5909 20.1977 26.0957 20.1977 25.7902 20.4631L21.0327 24.5952V6.70684C21.0327 6.33169 20.6822 6.02722 20.2504 6.02722H16.373C15.9412 6.02722 15.5907 6.33169 15.5907 6.70684V24.5955L10.8332 20.4634C10.5277 20.198 10.0325 20.198 9.72698 20.4634L7.22776 22.6338C7.08107 22.7612 6.99854 22.9342 6.99854 23.1143C6.99854 23.2944 7.08107 23.4674 7.22776 23.5948L17.7586 32.7429C17.9115 32.8757 18.1114 32.942 18.3117 32.942C18.512 32.942 18.7119 32.8757 18.8648 32.7429L29.3957 23.5948C29.5424 23.4674 29.6249 23.2944 29.6249 23.1143C29.6249 22.9342 29.5424 22.7612 29.3957 22.6338L26.8964 20.4631Z"
        fill="black"
      />
    </svg>
  );
};

export default ImageDownloadIcon;