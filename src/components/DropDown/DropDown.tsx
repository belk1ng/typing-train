import React, { useState, useMemo, useContext, useEffect } from "react";
import { DropDownArrow } from "../../assets/icons/DropDownArrow";
import { TypingContext } from "../../contexts/TypingContext";
import { Radio } from "../Radio/Radio";
import s from "./styles.module.scss";
import {
  TWordsContainerPercentageWidth,
  TConfidenceMode,
  TFontSize,
} from "../../types";

interface Props<T> {
  title: string;
  value: T;
  values: T[];
  name: string;
  settingSetter: (value: T) => void;

  icon?: React.ReactElement;
  postfix?: string;
  description?: string;
}

export const DropDown = ({
  title,
  value,
  values,
  name,
  settingSetter,
  icon,
  postfix,
  description,
}: Props<TFontSize | TWordsContainerPercentageWidth | TConfidenceMode>) => {
  const { blockingTypingEvent } = useContext(TypingContext);

  const [isListCollapsed, setListCollapsed] = useState<boolean>(true);

  useEffect(() => {
    if (!blockingTypingEvent && !isListCollapsed) {
      setListCollapsed(true);
    }
  }, [blockingTypingEvent]);

  // TODO: Fix dropdown list bug with z-index
  const dropdownListElements = useMemo(() => {
    if (values) {
      return values.map((item) => (
        <li className={s["dropdown__item"]} key={item}>
          <Radio
            name={name}
            value={item}
            defaultChecked={item === value ? true : false}
            onChange={() => settingSetter(item)}
          />
          <span
            className={
              item === value
                ? s["dropdown__item-text--choosen"]
                : s["dropdown__item-text"]
            }
          >
            {postfix ? item + postfix : item}
          </span>
        </li>
      ));
    }
  }, [values, value, name]);

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
        <DropDownArrow isCollapsed={isListCollapsed} />
      </div>
      <ul
        className={
          isListCollapsed ? s["dropdown__list--hidden"] : s["dropdown__list"]
        }
      >
        {description && (
          <p className={s["dropdown__description"]}>{description}</p>
        )}
        {dropdownListElements}
      </ul>
    </div>
  );
};
