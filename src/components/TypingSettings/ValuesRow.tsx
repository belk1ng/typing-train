import React, { ReactNode } from "react";
import s from "./styles.module.scss";

interface Props {
  children: ReactNode;
}

export const ValuesRow = ({ children }: Props) => {
  return <div className={s["typing-settings__params"]}>{children}</div>;
};
