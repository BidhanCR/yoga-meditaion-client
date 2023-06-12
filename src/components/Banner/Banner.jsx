import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img
            src="https://i.ibb.co/19xTyP9/photo-1529693662653-9d480530a697.jpg"
            alt="Slide 2"
            className="w-screen h-screen"
          />
        </div>
        <div>
          <img
            src="https://i.ibb.co/LkBtkvw/photo-1552196527-bffef41ef674.jpg"
            alt="Slide 1"
            className="w-screen h-screen"
          />
        </div>

        <div>
          <img
            src="https://i.ibb.co/JRcdv6R/young-blonde-woman-sportswear-is-meditating-yoga-mat-with-closed-eyes-1.jpg"
            alt="Slide 3"
            className="w-screen h-screen"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
