import { useRef, forwardRef, useImperativeHandle, useState } from 'react'
import './Home.css'
import NavbarComponent from '../../components/NavBar'
import FondoPrimeraLayer from './Home Components/FondoPrimeraLayer';
import InfoPrincipal from './Home Components/InfoPrincipal';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardCarousel from './Home Components/CardCarousel';
import Subscripcion from './Home Components/Subs'
 

const HomePage = forwardRef((_props, ref) => {
  
  const [_modalIsOpen, setModalIsOpen] = useState(false);

  const handleLoginClick = () => {
    setModalIsOpen(true);
  };
  
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  
  const scrollToAboutUs = () => {
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPlans = () => {
    if (plansRef.current) {
      plansRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useImperativeHandle(ref, () => ({
    scrollToAboutUs() {
      if (aboutUsRef.current) {
        aboutUsRef.current.scrollIntoView();
      }
    }
  }));

  return (
    <div>
    <div className='page-container'>
      <NavbarComponent onPlansClick={scrollToPlans}onAboutUsClick={scrollToAboutUs} />
      <InfoPrincipal/>
      <FondoPrimeraLayer/>
    </div>
    <div ref={aboutUsRef}>
      <CardCarousel />
    </div>
    <div ref={plansRef} className='page-container'>
      <Subscripcion />
    </div>
  </div>
  );
});

export default HomePage;
