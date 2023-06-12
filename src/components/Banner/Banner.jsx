
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Banner = () => {
    return (
        
            <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            <div className='h-screen'>
                <img src="https://i.ibb.co/LkBtkvw/photo-1552196527-bffef41ef674.jpg" />
            </div>
            <div className='h-screen'>
                <img src="https://i.ibb.co/19xTyP9/photo-1529693662653-9d480530a697.jpg" />
            </div>
            <div className='h-screen'>
                <img src="https://i.ibb.co/JRcdv6R/young-blonde-woman-sportswear-is-meditating-yoga-mat-with-closed-eyes-1.jpg" />
            </div>
        </Carousel>
        
    );
};

export default Banner;