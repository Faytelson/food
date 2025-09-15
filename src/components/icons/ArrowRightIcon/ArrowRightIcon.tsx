import * as React from "react";
import Icon, { type IconProps } from "../Icon";

const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <Icon
    {...props}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      d="M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default ArrowRightIcon;
