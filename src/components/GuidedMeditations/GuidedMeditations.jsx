import  { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const GuidedMeditations = () => {

  const [axiosSecure] = useAxiosSecure();
  const { data: guidedMeditations = [] } = useQuery(
    ["guidedMeditations"],
    async () => {
      const res = await axiosSecure.get(`/guidedMeditations`);
      return res.data;
    }
  );
  
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className='bg-[#f2ecf9]'>
      <div className='container mx-auto pb-16'>
      <h2 className='text-2xl text-center py-8'>Guided Meditations</h2>
      <p className='text-center mb-8'>Explore our library of guided meditations to support your meditation practice:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guidedMeditations.map((meditation, index) => (
          <div data-aos="flip-right" className="card shadow-xl border p-4 border-green-500" key={index}>
            <h3>{meditation.title}</h3>
            <p><strong>Duration:</strong> {meditation.duration}</p>
            <p>{meditation.description}</p>
            <audio controls>
              <source src={meditation.audioUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
      
    </div>
    </div>
  );
}

export default GuidedMeditations;
