import {
  ContentRequest,
  RenderComponent,
  StateProps,
  SwipeFuncProps,
} from "../../../types/types";
import { Dispatch, SetStateAction } from "react";

import YesNoButtons from "./yes-no-buttons";

const CardGroup = <T extends object, Extra extends object>({
  set,
  Render,
  ...extra
}: StateProps<T[]> & {
  Render: RenderComponent;
} & SwipeFuncProps) => (
  <>
    {set &&
      set.data &&
      set.data
        .slice(set.data.length - 1, set.data.length)
        .map((item: T, idx: number) => (
          <Render key={idx} item={item} {...(extra as Extra)} />
        ))}
  </>
);

interface SwitchProps<T> {
  displaySet: string;
  set1: ContentRequest<T[]>;
  setSet1: Dispatch<SetStateAction<ContentRequest<T[]>>>;
  set2: ContentRequest<T[]>;
  setSet2: Dispatch<SetStateAction<ContentRequest<T[]>>>;
}

export const CardGroupSwitch = <T extends object, Extra extends object>({
  displaySet,
  set1,
  setSet1,
  set2,
  setSet2,
  Render,
  yesFunc,
  noFunc,
  ...extra
}: SwitchProps<T> & {
  Render: RenderComponent;
} & SwipeFuncProps) => {
  if (displaySet === "set1" && set1 && set1.data && set1.data.length) {
    return (
      <CardGroup<T, Extra>
        set={set1}
        setSet={setSet1}
        Render={Render}
        {...(extra as Extra)}
        yesFunc={yesFunc}
        noFunc={noFunc}
      />
    );
  }
  if (displaySet == "set2" && set2 && set2.data && set2.data.length) {
    return (
      <CardGroup<T, Extra>
        set={set2}
        setSet={setSet2}
        Render={Render}
        {...(extra as Extra)}
        yesFunc={yesFunc}
        noFunc={noFunc}
      />
    );
  }
  return null;
};

export const ButtonGroupSwitch = <T extends object>({
  displaySet,
  set1,
  setSet1,
  set2,
  setSet2,
  yesFunc,
  noFunc,
}: SwitchProps<T> & SwipeFuncProps) => {
  if (displaySet === "set1" && set1 && set1.data && set1.data.length) {
    return (
      <YesNoButtons
        set={set1}
        setSet={setSet1}
        noFunc={noFunc}
        yesFunc={yesFunc}
      />
    );
  }
  if (displaySet == "set2" && set2 && set2.data && set2.data.length) {
    return (
      <YesNoButtons
        set={set2}
        setSet={setSet2}
        noFunc={noFunc}
        yesFunc={yesFunc}
      />
    );
  }
  return null;
};
