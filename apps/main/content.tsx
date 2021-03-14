import { ContentLayer, Footer, ImageWrapper, TrailersWrapper } from "./styles";

import Carousel from "react-material-ui-carousel";
import { ContentProps } from "../../types/types";
import FullScreen from "./full-screen";
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
      <section>
        <header>
          {title && <h1>{title}</h1>}
          {originalTitle && <p>Original title: {originalTitle}</p>}
          {authors && authors.length ? (
            <p>
              Authors:{" "}
              {authors.map((author, idx) => (
                <span key={author}>
                  {author}
                  {!(authors.length === idx + 1) && ", "}
                </span>
              ))}
            </p>
          ) : null}
          {productionCountries && productionCountries.length ? (
            <p>
              Countries:{" "}
              {productionCountries.map((country, idx) => (
                <span key={country}>
                  {country}
                  {!(productionCountries.length === idx + 1) && ", "}
                </span>
              ))}
            </p>
          ) : null}
          {releaseDate && <p>Released: {releaseDate}</p>}
          {languages && languages.length ? (
            <p>
              Languages:{" "}
              {languages.map((lang, idx) => (
                <span key={lang}>
                  {lang}
                  {!(languages.length === idx + 1) && ", "}
                </span>
              ))}
            </p>
          ) : null}
        </header>

        {images && images.length ? (
          <Carousel
            interval={10000}
            swipe={true}
            autoPlay={false}
            navButtonsProps={{
              className: "required-classname-for-some-reason",
              style: {
                backgroundColor: "blueviolet",
              },
            }}
          >
            {images.map((imageUrl) => (
              <ImageWrapper key={imageUrl}>
                <img src={imageUrl} alt={title} />
              </ImageWrapper>
            ))}
          </Carousel>
        ) : null}

        {trailers && trailers.length ? (
          <TrailersWrapper>
            {trailers.map((trailer, idx) => (
              <FullScreen key={trailer.url} trailer={trailer} num={idx + 1} />
            ))}
          </TrailersWrapper>
        ) : null}

        {synopsis && <article>{synopsis}</article>}

        {editOn && editOn.length ? (
          <Footer>
            <span>Edit on:</span>{" "}
            {editOn.map((org, idx) => (
              <span key={org.url}>
                <a href={org.url} target="__blank">
                  {org.org}
                </a>
                {!(editOn.length === idx + 1) && ", "}
              </span>
            ))}
          </Footer>
        ) : null}
      </section>
    </ContentLayer>
  );
};

export default Content;
