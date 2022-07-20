import { TypingContext } from "../../contexts/TypingContext";
import { Modal, handleOutsideClick } from "../Modal/Modal";
import { SettingsGear } from "../../icons/SettingsGear";
import React, { useState, useContext, useRef } from "react";
import s from "./styles.module.scss";

export const AppSettings = () => {
  const { setBlockingTypingEvent } = useContext(TypingContext);

  const [isModalCollapsed, setModalCollapsed] = useState<boolean>(true);

  const modalContentRef = useRef<HTMLDivElement>(null);

  const outsideClickCallback = () => {
    setModalCollapsed(true);
    setBlockingTypingEvent(false);
  };

  return (
    <div className={s["settings"]}>
      <SettingsGear onClick={(): void => setModalCollapsed(false)} />
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
        <div ref={modalContentRef}>Hey there!</div>
      </Modal>
    </div>
  );
};
