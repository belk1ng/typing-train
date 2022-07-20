import React, { useState, useMemo } from "react";
import s from "./styles.module.scss";

interface Props {
  title: string;
  value: string | number;
  values?: string[] | number[];
  postfix?: string;
  icon?: React.ReactElement;
  name: string;
  settingSetter: Function;
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
          <input
            type="radio"
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
        className={s["dropdown__header"]}
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
