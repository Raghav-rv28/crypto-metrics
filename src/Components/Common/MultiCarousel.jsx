import "react-multi-carousel/lib/styles.css";
import "./index.scss";
import UAParser from "ua-parser-js";
import React, { Fragment } from "react";
import Carousel from "react-multi-carousel";
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import NewsCard from './NewsCard';

const demoImage = "https://picsum.photos/300/150"


const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30
    }
  };
const Simple = ({ deviceType }) => {
  const {data: newsList , isLoading: isLoadingNews ,isFetching:isFetchingNews} = useGetCryptoNewsQuery({ newsCategory: "Cryptocurrency", count: 10});
  if( isLoadingNews && isFetchingNews) return <>Loading</>
    return (
      <Carousel
        ssr
        partialVisbile
        deviceType={deviceType}
        itemClass="image-item"
        responsive={responsive}
      >
        {newsList?.value?.map( (news, i)=> (
            <NewsCard 
            key={i}
            url = {news.url}
            name = {news.name}
            description = {news.description}
            img = {news?.image?.thumbnail?.contentUrl || demoImage}
            provider = {news.provider[0]?.image?.thumbnail?.contentUrl}
            // providername = {news.provider[0]?.name}
            timestamp = {news.datePublished}
            />
            ))}
    </Carousel>
  );
};

const Section = ({ children }) => {
    return (
      <section
        style={{
          margin: "20px 0 20px 0"
        }}
      >
        {children}
      </section>
    );
  };


const MultiCarousel = ({ deviceType,  }) => {
    return (
      <Fragment>
        <Section>
          <Simple deviceType={deviceType} />
        </Section>
      </Fragment>
    );
  };
  MultiCarousel.getInitialProps = ({ req }) => {
    let userAgent;
    if (req) {
      userAgent = req.headers["user-agent"];
    } else {
      userAgent = navigator.userAgent;
    }
    const parser = new UAParser();
    parser.setUA(userAgent);
    const result = parser.getResult();
    const deviceType = (result.device && result.device.type) || "desktop";
    return { deviceType };
  };
  export default MultiCarousel;