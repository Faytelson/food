import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@components/icons/ArrowLeftIcon";

type ButtonBackProps = {
  className?: string;
  fallbackPath?: string;
};

const ButtonBack: React.FC<ButtonBackProps> = ({ className, fallbackPath = "/" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className || "button-back"}
      aria-label="Go back"
    >
      <ArrowLeftIcon
        width={32}
        height={32}
        color="accent"
      ></ArrowLeftIcon>
    </button>
  );
};

export default ButtonBack;
