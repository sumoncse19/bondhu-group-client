import Image from "next/image";

import logo from "../../../public/assets/svgs/logo.svg";

type IconProps = {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
};

export const ImageIcon = ({
  name,
  width = 24,
  height = 24,
  className,
  alt = `hello alvie ${name} icon`,
}: IconProps) => {
  const getIcon = () => {
    switch (name) {
      case "logo":
        return logo;
      case "search_icon":
      default:
        return null;
    }
  };

  const iconSrc = getIcon();

  if (!iconSrc) {
    return null;
  }

  return (
    <Image
      src={iconSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  );
};
