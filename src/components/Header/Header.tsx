import s from "./styles.module.scss";
import React from "react";

interface Props {
  children: React.ReactNode;
  isVisible: boolean;
}

export const Header = ({ children, isVisible }: Props) => {
  return (
    <header className={isVisible ? s["header"] : s["header--hide"]}>
      {children}
    </header>
  );
};
