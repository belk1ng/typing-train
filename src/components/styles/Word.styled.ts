import styled from "styled-components";

interface WordStyledProps {
    isActive: boolean | number;
}

export const WordStyled = styled.p<WordStyledProps>`
    font-size: 32px;
    font-weight: 500;
    font-family: "Courier New", Courier, monospace;

    color: #f9f7f3;
    letter-spacing: 1px;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    position: relative;

    ${({ isActive }) =>
        typeof isActive === "number" &&
        `
        &:after {
            position: absolute;
            content: "";
            bottom: 0;
            left: ${isActive}ch;

            width: 2px;
            height: 100%;

            background-color: lightcoral;

            transition: all .15s;
        }
    `}
`;
