import { LetterStatus } from "../../constants";
import styled from "styled-components";

interface LetterStyledProps {
    status: LetterStatus;
}

export const LetterStyled = styled.span<LetterStyledProps>`
    && {
        color: ${(props) =>
            props.status === "unset"
                ? "#fff"
                : props.status === "correct"
                ? "lightgreen"
                : "lightcoral"};
    }
`;
