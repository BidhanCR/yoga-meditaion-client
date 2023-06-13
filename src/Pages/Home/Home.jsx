import { Helmet } from "react-helmet";
import PopularInstructor from "../../PopularInstructor/PopularInstructor";
import Banner from "../../components/Banner/Banner";
import PopularClass from "../../components/PopularClass/PopularClass";
import GuidedMeditations from "../../components/GuidedMeditations/GuidedMeditations";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Inner Pease | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularClass></PopularClass>
      <PopularInstructor></PopularInstructor>
      <GuidedMeditations></GuidedMeditations>
    </div>
  );
};

export default Home;
