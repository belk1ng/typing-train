import { WordsContainerWidth } from "../../assets/icons/WordsContainerWidth";
import { SettingsContext } from "../../contexts/SettingsContext";
import { SettingsGear } from "../../assets/icons/SettingsGear";
import { TypingContext } from "../../contexts/TypingContext";
import { Modal, handleOutsideClick } from "../Modal/Modal";
import { Backspace } from "../../assets/icons/Backspace";
import { FontSize } from "../../assets/icons/FontSize";
import React, { useContext, useRef } from "react";
import { DropDown } from "../DropDown/DropDown";
import s from "./styles.module.scss";
import {
  TFontSize,
  fontSizeValues,
  TWordsContainerPercentageWidth,
  wordsContainerPercentageWidthValues,
  TConfidenceMode,
  confidenceModeValues,
} from "../../types";

interface Props {
  isModalCollapsed: boolean;
  setModalCollapsed: (value: boolean) => void;
}

export const AppSettings = ({ isModalCollapsed, setModalCollapsed }: Props) => {
  const { setBlockingTypingEvent } = useContext(TypingContext);
  const {
    fontSize,
    setFontSize,
    wordsContainerWidth,
    setWordsContainerWidth,
    confidenceMode,
    setConfidenceMode,
  } = useContext(SettingsContext);

  const modalContentRef = useRef<HTMLDivElement>(null);

  const outsideClickCallback = (): void => {
    setModalCollapsed(true);
    setBlockingTypingEvent(false);
  };

  return (
    <div className={s["settings"]}>
      <SettingsGear
        onClick={(): void => {
          setModalCollapsed(false);
          setBlockingTypingEvent(true);
        }}
      />
      <Modal
        isCollapsed={isModalCollapsed}
        onClick={(event) =>
          handleOutsideClick(
            event,
            isModalCollapsed,
            modalContentRef.current,
            outsideClickCallback
          )
        }
      >
        <div ref={modalContentRef} className={s["settings__wrapper"]}>
          <DropDown
            values={[...fontSizeValues]}
            value={fontSize}
            title="Font-size"
            name="font-size"
            postfix="px"
            settingSetter={(value) => setFontSize(value as TFontSize)}
            icon={<FontSize />}
          />
          <DropDown
            values={wordsContainerPercentageWidthValues}
            value={wordsContainerWidth}
            title="Words container width"
            name="words-container-width"
            postfix="%"
            settingSetter={(value) =>
              setWordsContainerWidth(value as TWordsContainerPercentageWidth)
            }
            icon={<WordsContainerWidth />}
          />
          <DropDown
            values={confidenceModeValues}
            value={confidenceMode}
            title="Confidence mode"
            name="confidence-mode"
            settingSetter={(value) =>
              setConfidenceMode(value as TConfidenceMode)
            }
            icon={<Backspace />}
          />
        </div>
      </Modal>
    </div>
  );
};
