const Button = ({
  id,
  className,
  subClassName,
  onClick,
  onHover,
  children,
}) => {
  const classes = `relative inline-flex items-center justify-center text-center rounded-2xl
  ${className || ""}`;
  const spanClasses = `relative z-10 ${subClassName || ""}`;

  return (
    <button
      id={id}
      className={classes}
      onClick={onClick}
      onMouseEnter={onHover}
    >
      <span className={spanClasses}>{children}</span>
    </button>
  );
};

export default Button;
