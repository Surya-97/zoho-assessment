import Carousel from 'react-bootstrap/Carousel';

function MovieCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1680284917210_32e3rgth.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1681123745909_webbannernpa.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.ticketnew.com/tn/offer_banner/Viduthalai/1920_400.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1680271399724_web.jpg"
          alt="Fourth slide"
        />
      </Carousel.Item>
      
    </Carousel>
  );
}

export default MovieCarousel;