interface IProps {
  variant: "primary" | "secondary" | "danger" | "light";
  type: "submit" | "button";
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({
  variant,
  type,
  label,
  onClick,
  loading,
  disabled,
}: IProps) => {
  const primaryClasses =
    " text-white bg-blue-600 border-[#000] hover:shadow-[0_0_5px_5px_#FFFFFF]";

  const secondaryClasses =
    " text-black bg-white border-black hover:shadow-[0_0_5px_5px_#FFFFFF]";

  const dangerClasses =
    " text-white bg-[#AE899A] border-[#AE899A] hover:shadow-[0_0_5px_5px_#ae899a70]";

  const lightClasses =
    " text-[#FFFFFF] bg-[#2E3944]  border-[#2E3944] hover:shadow-[0_0_5px_5px_#FFFFFF]";

  const classNameCreator = (): string => {
    let finalClassName =
      "flex justify-center items-center outline-none duration-300 h-10 text-lg font-semibold px-6 rounded-2xl border-2";
    if (variant === "primary") {
      finalClassName += primaryClasses;
    } else if (variant === "secondary") {
      finalClassName += secondaryClasses;
    } else if (variant === "danger") {
      finalClassName += dangerClasses;
    } else if (variant === "light") {
      finalClassName += lightClasses;
    }
    finalClassName +=
      " disabled:shadow-none disabled:bg-gray-300 disabled:border-gray-300";
    return finalClassName;
  };

  const loadingIconCreator = () => {
    return (
      <div className="w-6 h-6 rounded-full animate-spin border-2 border-gray-400 border-t-gray-800"></div>
    );
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNameCreator()}
      disabled={disabled}
    >
      {loading ? loadingIconCreator() : label}
    </button>
  );
};

export default Button;
