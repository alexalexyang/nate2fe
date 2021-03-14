import { ContentLayer } from "./styles";
import { ContentProps } from "../../types/types";
import { NextPage } from "next";

interface ItemProps {
  item: ContentProps;
}

const Content: NextPage<ItemProps> = ({ item }: ItemProps) => {
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
    <ContentLayer key={id}>
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
    </ContentLayer>
  );
};

export default Content;
