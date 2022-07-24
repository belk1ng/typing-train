import { SettingsContext } from "../../contexts/SettingsContext";
import { SettingsGear } from "../../assets/icons/SettingsGear";
import { TypingContext } from "../../contexts/TypingContext";
import { Modal, handleOutsideClick } from "../Modal/Modal";
import { FontSize } from "../../assets/icons/FontSize";
import React, { useContext, useRef } from "react";
import { DropDown } from "../DropDown/DropDown";
import s from "./styles.module.scss";

interface Props {
  isModalCollapsed: boolean;
  setModalCollapsed: (value: boolean) => void;
}

export const AppSettings = ({ isModalCollapsed, setModalCollapsed }: Props) => {
  const { setBlockingTypingEvent } = useContext(TypingContext);
  const { fontSize, setFontSize } = useContext(SettingsContext);

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
        {/* TODO: Refactoring settingsSetter and its type */}
        <div ref={modalContentRef} className={s["settings__wrapper"]}>
          <DropDown
            values={[24, 32, 36, 40, 42]}
            value={fontSize}
            title="Font-size"
            name="font-size"
            postfix="px"
            settingSetter={(value) =>
              setFontSize(typeof value === "number" ? value : 32)
            }
            icon={<FontSize />}
          />
        </div>
      </Modal>
    </div>
  );
};
