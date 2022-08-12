import {
  TQuoteDifficulty,
  TTypingTimeout,
  TTypingMode,
  TWordsCount,
} from "../../types";
import { ValuesRow } from "./ValuesRow";
import s from "./styles.module.scss";
import React from "react";

interface Props<T> {
  values: T[];
  value: T;
  setValue: (value: T) => void;
}

export const AbstractTypingSetting = ({
  values,
  value,
  setValue,
}: Props<TTypingMode | TTypingTimeout | TQuoteDifficulty | TWordsCount>) => {
  // TODO: Read about abstact callbacks

  const valueNodes = () => {
    return values.map((item) => (
      <p
        key={item}
        className={
          item === value
            ? s["typing-settings__param-value--active"]
            : s["typing-settings__param-value"]
        }
        onClick={() => setValue(item)}
      >
        {item}
      </p>
    ));
  };

  return <ValuesRow>{valueNodes()}</ValuesRow>;
};
