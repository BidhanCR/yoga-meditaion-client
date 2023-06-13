import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <Slider {...settings}>
        <div>
          <div className="relative h-[600px]">
            <img
              src="https://i.ibb.co/19xTyP9/photo-1529693662653-9d480530a697.jpg"
              alt="Slide 2"
              className="w-screen h-screen object-cover"
            />
            <div data-aos="zoom-out-up" className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 px-12 py-20">
              <p  className="text-xl">
                Welcome to our yoga and meditation website, where serenity and self-care await you. Immerse yourself in a sanctuary of tranquility as you explore a diverse range of yoga classes, guided meditations, and insightful articles. Whether you are seeking relaxation, stress relief, or a deeper spiritual connection, our platform is here to support your journey towards holistic well-being.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="relative h-[600px]">
            <img
              src="https://i.ibb.co/WGJgHdB/trainer-assisting-group-people-with-lotus-position-1170-179.jpg"
              alt="Slide 1"
              className="w-screen h-screen object-cover"
            />
            <div data-aos="zoom-out-up" className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 px-12 py-20">
              <p  className="text-xl">
                Experience a transformative journey of self-discovery through yoga and meditation. Cultivate mindfulness, find inner peace, and enhance your overall well-being. Join us on this path of self-care and unlock a harmonious balance of mind, body, and spirit.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="relative h-[600px]">
            <img
              src="https://i.ibb.co/JRcdv6R/young-blonde-woman-sportswear-is-meditating-yoga-mat-with-closed-eyes-1.jpg"
              alt="Slide 3"
              className="w-screen h-screen object-cover"
            />
            <div data-aos="zoom-out-up" className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 px-12 py-20">
              <p  className=" text-xl">
                Embark on a journey of self-discovery and holistic well-being through the practice of yoga and meditation. Reconnect with your body, mind, and spirit as you explore gentle movements, conscious breathing, and mindful awareness. Experience a profound sense of inner peace, increased flexibility, and improved mental clarity as you embrace the transformative power of these ancient practices.
              </p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
