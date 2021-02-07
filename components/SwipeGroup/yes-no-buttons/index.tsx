import { StateProps, SwipeFuncProps } from "../../../types/types";

import YesNoButton from "../yes-no-button";

const YesNoButtons = <T extends object>({
  set,
  setSet,
  noFunc,
  yesFunc,
}: StateProps<T> & SwipeFuncProps) => (
  <>
    <YesNoButton func={() => noFunc(set, setSet)} text="No" />{" "}
    <YesNoButton func={() => yesFunc(set, setSet)} text="Yes" />
  </>
);

export default YesNoButtons;
