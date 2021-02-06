import { StateProps, SwipeFuncProps } from "../../../types/types";

import { ButtonsWrapper } from "../swipe-mode-styles";
import YesNoButton from "../yes-no-button";

const YesNoButtons = <T extends object>({
  set,
  setSet,
  noFunc,
  yesFunc,
}: StateProps<T> & SwipeFuncProps) => (
  <ButtonsWrapper>
    <YesNoButton func={() => noFunc(set, setSet)} text="No" />{" "}
    <YesNoButton func={() => yesFunc(set, setSet)} text="Yes" />
  </ButtonsWrapper>
);

export default YesNoButtons;
