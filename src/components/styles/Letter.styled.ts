import { LetterStatus } from "../../constants";
import styled from "styled-components";

interface LetterStyledProps {
  status: LetterStatus;
}

export const LetterStyled = styled.span<LetterStyledProps>`
  position: relative;

  color: ${(props) => {
    switch (props.status) {
      case "unset":
      case "skiped":
        return "#596172";
      case "correct":
        return "#ABFAA9";
      case "incorrect":
        return "lightcoral";
    }
  }};

  ${({ status }) =>
    status === "skiped" &&
    `
        &:after {
            position: absolute;
            content: "";
            bottom: -1px;
            left: 0;
    
            height: 2px;
            width: 100%;

            background-color: lightcoral;
        }
    `}
`;
