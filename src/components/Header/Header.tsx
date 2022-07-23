import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Header = ({ children }: Props) => {
  return <header>{children}</header>;
};
