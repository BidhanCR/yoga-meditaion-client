import PopularInstructor from "../../PopularInstructor/PopularInstructor";
import Banner from "../../components/Banner/Banner";
import PopularClass from "../../components/PopularClass/PopularClass";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularClass></PopularClass>
      <PopularInstructor></PopularInstructor>
    </div>
  );
};

export default Home;
