import React from "react";
import clsx from "clsx";
import styles from "./Description.module.scss";

type DescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

const Description: React.FC<DescriptionProps> = ({ children, className }) => {
  return <article className={clsx(styles.description, className)}>{children}</article>;
};

export default Description;
