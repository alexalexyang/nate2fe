import { StateProps } from "../../types/types";

export const yesFunc = async <T>(
  set: StateProps<T[]>["set"],
  setSet: StateProps<T[]>["setSet"]
) => {
  if (!set.data || !set.data.length) {
    return;
  }

  setTimeout(() => {
    const currentSet = set.data && set.data.pop();

    // currentSet &&
    //   fetch(
    //     // `/api/nomurica/likes?movie_id=${currentMovie.id}&movie_title=${currentMovie.title}`
    //     `/api/send-likes`
    //   );

    setSet({ ...set });
  }, 300);
};

export const noFunc = async <T>(
  set: StateProps<T[]>["set"],
  setSet: StateProps<T[]>["setSet"]
) => {
  if (!set.data || !set.data.length) {
    return;
  }

  setTimeout(() => {
    set.data && set.data.pop();
    setSet({ ...set });
  }, 250);
};
