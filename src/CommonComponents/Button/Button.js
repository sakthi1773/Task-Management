import { Button as ADButton } from "antd";

const Button = ({
  type,
  icon,
  iconPosition,
  text,
  onClick,
  className,
  block = false,
  color,
  shape = "default",
  variant = "solid",
  style,
}) => {
  return (
    <ADButton
      style={style}
      variant={variant}
      shape={shape}
      color={color}
      type={type}
      icon={icon}
      iconPosition={iconPosition}
      onClick={onClick}
      className={className}
      block={block}
    >
      {text}
    </ADButton>
  );
};
export default Button;
