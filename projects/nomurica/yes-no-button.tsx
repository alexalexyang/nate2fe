import { NextPage } from "next";
import styled from "styled-components";

interface ButtonProps {
  func: any;
  text: string;
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  height: 5rem;
  width: 5rem;
  border: 0;

  background-image: linear-gradient(45deg, #ff9100, yellow);
  box-shadow: 1px 1px 5px #c46934;

  font-size: 2rem;

  :hover {
    background-image: linear-gradient(45deg, gold, #ceb675);
  }

  :active {
    background-image: linear-gradient(45deg, #ff6600, #ffd000);
  }

  :focus {
    outline: none;
  }
`;

const YesNoButton: NextPage<ButtonProps> = ({ func, text }: ButtonProps) => {
  return <Button onClick={func}>{text}</Button>;
};

export default YesNoButton;
