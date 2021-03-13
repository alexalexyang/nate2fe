import {
  ContentRequest,
  RenderComponent,
  StateProps,
  SwipeFuncProps,
} from "../../../types/types";
import { Dispatch, SetStateAction } from "react";

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
      set.data.map((item: T, idx: number) => (
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
