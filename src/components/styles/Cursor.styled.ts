import styled from "styled-components";

interface CursorProps {
  top: number;
  left: number;
}

export const CursorStyled = styled.div<CursorProps>`
  position: absolute;
  content: "";
  top: ${(props) => props.top};
  left: ${(props) => props.left};

  background-color: lightcoral;
  border-radius: 10px;

  width: 1px;
  height: 20px;
`;
