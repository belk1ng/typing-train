import React, { useState, useMemo } from "react";
import { Radio } from "../Radio/Radio";
import s from "./styles.module.scss";

interface Props {
  title: string;
  value: string | number;
  values?: string[] | number[];
  postfix?: string;
  icon?: React.ReactElement;
  name: string;
  settingSetter: <T>(value: T) => void;
}

export const DropDown = ({
  title,
  value,
  values,
  postfix,
  icon,
  name,
  settingSetter,
}: Props) => {
  const [isListCollapsed, setListCollapsed] = useState<boolean>(true);

  const dropdownListElements = useMemo(() => {
    if (values) {
      return values.map((item) => (
        <li className={s["dropdown__item"]} key={item}>
          {/* TODO: fix +event.target.value (its value might be boolean) */}
          <Radio
            name={name}
            value={item}
            defaultChecked={item === value ? true : false}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              settingSetter(+event.target.value)
            }
          />
          <span className={s["dropdown__item-text"]}>
            {postfix ? item + postfix : value}
          </span>
        </li>
      ));
    }
  }, [values, name, value]);

  return (
    <div className={s["dropdown"]}>
      <div
        className={
          isListCollapsed
            ? s["dropdown__header"]
            : `${s["dropdown__header"]} ${s["dropdown__header--open"]}`
        }
        onClick={() => setListCollapsed((prev: boolean) => !prev)}
      >
        <div className={s["dropdown__title-container"]}>
          {icon && icon}
          <p className={s["dropdown__title"]}>{title}</p>
        </div>
      </div>
      <ul
        className={
          isListCollapsed ? s["dropdown__list--hidden"] : s["dropdown__list"]
        }
      >
        {dropdownListElements}
      </ul>
    </div>
  );
};
