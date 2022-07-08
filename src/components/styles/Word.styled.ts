import styled from "styled-components";

interface WordStyledProps {
  isActive: boolean | number;
}

export const WordStyled = styled.p<WordStyledProps>`
  font-size: 32px;
  font-weight: 500;
  font-family: "Courier New", Courier, monospace;

  letter-spacing: 1px;
  transition: all 0.15s ease;

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
            bottom: 15%;
            left: ${20.2 * isActive}px;

            width: 2px;
            height: 65%;

            background-color: lightcoral;
            border-radius: 10px;

            transition: all .15s;
        }
    `}
`;
