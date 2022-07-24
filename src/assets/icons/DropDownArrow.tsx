import s from "../../components/DropDown/styles.module.scss";
import React from "react";

interface Props {
  isCollapsed: boolean;
}

export const DropDownArrow = ({ isCollapsed }: Props) => {
  return (
    <svg
      className={
        isCollapsed ? s["dropdown__arrow--hide"] : s["dropdown__arrow"]
      }
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};
