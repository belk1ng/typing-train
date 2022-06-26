import styled from "styled-components";

interface LetterStyledProps {
    status: "unset" | "correct" | "incorrect";
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
