import { Button, ButtonsWrapper, SingleButton, StyledContent } from "./styles";

import { ContentProps } from "../../types/types";
import { NextPage } from "next";

interface ItemsProps {
  items: ContentProps[];
  touchScreen: boolean;
}

const Content: NextPage<ItemsProps> = ({ items, touchScreen }: ItemsProps) => {
  //   console.log(items);
  return (
    <>
      {items.map((item: ContentProps) => {
        const {
          id,
          originalTitle,
          title,
          releaseDate,
          productionCountries,
          languages,
          images,
          trailers,
          synopsis,
          authors,
          editOn,
        } = item;
        return (
          <>
            <StyledContent key={id}>
              {title && <p>{title}</p>}

              {originalTitle && <p>{originalTitle}</p>}

              {authors && <p>{authors}</p>}

              {productionCountries && <p>{productionCountries}</p>}

              {releaseDate && <p>{releaseDate}</p>}

              {languages && <p>{languages}</p>}

              {/* {images && <h1>{images}</h1>} */}

              {/* {trailers && <h1>{trailers}</h1>} */}

              {synopsis && <p>{synopsis}</p>}

              {/* {editOn && <p>{editOn}</p>} */}
            </StyledContent>
            <ButtonsWrapper>
              <SingleButton>
                <Button touchScreen={touchScreen}>No</Button>
              </SingleButton>
              <SingleButton>
                <Button touchScreen={touchScreen}>Yes</Button>
              </SingleButton>
            </ButtonsWrapper>
          </>
        );
      })}
    </>
  );
};

export default Content;
