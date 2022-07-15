import s from "./styles.module.scss";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  isCollapsed: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Modal = ({ children, isCollapsed, onClick }: ModalProps) => {
  return (
    <div
      onClick={(e) => onClick(e)}
      className={isCollapsed ? s["modal--hide"] : s["modal"]}
    >
      {children}
    </div>
  );
};
