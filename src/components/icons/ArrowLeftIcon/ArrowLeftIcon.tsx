import * as React from "react";
import Icon, { type IconProps } from "../Icon";

const ArrowLeftIcon: React.FC<IconProps> = (props) => (
  <Icon
    {...props}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default ArrowLeftIcon;
