import s from "./styles.module.scss";
import React, { useId } from "react";

interface Props {
  name: string;
  value: string | number;
  defaultChecked: boolean;
  title?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Radio = ({ name, value, defaultChecked, onChange }: Props) => {
  const id = useId();

  return (
    <div className={s["custom-radio"]}>
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <label className={s["custom-radio__label"]} htmlFor={id}></label>
    </div>
  );
};
