import { WordsContainerWidth } from "../../assets/icons/WordsContainerWidth";
import { SettingsContext } from "../../contexts/SettingsContext";
import { SettingsGear } from "../../assets/icons/SettingsGear";
import { TypingContext } from "../../contexts/TypingContext";
import { Modal, handleOutsideClick } from "../Modal/Modal";
import { Backspace } from "../../assets/icons/Backspace";
import { FontSize } from "../../assets/icons/FontSize";
import React, { useContext, useRef } from "react";
import { Space } from "../../assets/icons/Space";
import { DropDown } from "../DropDown/DropDown";
import s from "./styles.module.scss";
import {
  TFontSize,
  fontSizeValues,
  TWordsContainerPercentageWidth,
  wordsContainerPercentageWidthValues,
  TConfidenceMode,
  confidenceModeValues,
  TStrictSpace,
  strictSpaceValues,
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
    strictSpace,
    setStrictSpace,
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
            values={fontSizeValues}
            value={fontSize}
            title="Font-size"
            name="font-size"
            postfix="px"
            settingSetter={(value) => setFontSize(value as TFontSize)}
            icon={<FontSize />}
            description="Change the font size of the test words."
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
            description="Typing container's percentage width relative to your screen"
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
            description={
              "When enabled, you will not be able to go back to previous words to fix mistakes. When turned up to the max, you won't be able to backspace at all."
            }
          />
          <DropDown
            values={strictSpaceValues}
            value={strictSpace}
            title="Strict space"
            name="strict-space"
            settingSetter={(value) => setStrictSpace(value as TStrictSpace)}
            icon={<Space />}
            description="Pressing space will insert a space character when this mode is enabled."
          />
        </div>
      </Modal>
    </div>
  );
};
