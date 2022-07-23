import s from "./styles.module.scss";
import React from "react";

interface Props {
  children: React.ReactNode;
  isCollapsed: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const handleOutsideClick = (
  event: React.MouseEvent<HTMLElement>,
  modalCollapsed: boolean,
  el: HTMLElement | null,
  callback: () => void
): void => {
  if (el && !el.contains(event.target as Node) && !modalCollapsed) {
    callback();
  }
};

export const Modal = ({ children, isCollapsed, onClick }: Props) => {
  return (
    <div
      onClick={(e) => onClick(e)}
      className={isCollapsed ? s["modal--hide"] : s["modal"]}
    >
      {children}
    </div>
  );
};
