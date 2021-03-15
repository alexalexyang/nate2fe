import { Button, SingleButton } from "../styles";
import { StateProps, SwipeFuncProps } from "../../../types/types";
import { cross, heart } from "../../../styles/style-constants";

import Cross from "../../../public/fa-times-solid.svg";
import Heart from "../../../public/fa-heart-solid.svg";

const YesNoButtons = <T extends object>({
  set,
  setSet,
  noFunc,
  yesFunc,
}: StateProps<T> & SwipeFuncProps) => {
  const isTouchScreen = navigator.maxTouchPoints > 0;
  return (
    <>
      <SingleButton>
        <Button
          onClick={() => noFunc(set, setSet)}
          isTouchScreen={isTouchScreen}
        >
          <Cross fill={cross} alt="No" />
        </Button>
      </SingleButton>
      <SingleButton>
        <Button
          onClick={() => yesFunc(set, setSet)}
          isTouchScreen={isTouchScreen}
        >
          <Heart fill={heart} alt="Yes" />
        </Button>
      </SingleButton>
    </>
  );
};

export default YesNoButtons;
