import styled from "styled-components";

interface WordCountValueProps {
  active: boolean;
}

export const WordsCountStyled = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 8px;

  h6 {
    color: #596172;
    margin: 0;
  }
`;

export const WordCountValue = styled.p<WordCountValueProps>`
  font-size: 14px;

  cursor: pointer;
  color: ${({ active }) => (active ? "lightcoral" : "#596172")};

  transition: color 0.4s ease;

  &:hover {
    color: lightcoral;
  }
`;
