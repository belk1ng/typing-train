import { SettingsContext } from "../../contexts/SettingsContext";
import { SettingsGear } from "../../assets/icons/SettingsGear";
import { TypingContext } from "../../contexts/TypingContext";
import React, { useState, useContext, useRef } from "react";
import { Modal, handleOutsideClick } from "../Modal/Modal";
import { DropDown } from "../DropDown/DropDown";
import s from "./styles.module.scss";

export const AppSettings = () => {
  const { setBlockingTypingEvent } = useContext(TypingContext);
  const { fontSize, setFontSize } = useContext(SettingsContext);

  const [isModalCollapsed, setModalCollapsed] = useState<boolean>(true);

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
            values={[24, 32, 36, 40, 42]}
            value={fontSize}
            title="Font-size"
            name="font-size"
            postfix="px"
            settingSetter={setFontSize}
          />
        </div>
      </Modal>
    </div>
  );
};
