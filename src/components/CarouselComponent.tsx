import React, { useState } from 'react';
import { Button, Carousel, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../assets/img1.png';
import img3 from '../assets/img3.png';
import '../styles/CarouselComponent.css'

const CarouselComponent: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const eventsInfo = [
    {
      title: "MARATON 5Km",
      description: "\nVeni y participa de una maraton de 5km de distancia, no importa que no seas un deportista habitual, esta es una maraton amateur echa con el proposito de que las personas hagan ejercicio.\n\nEdad minima:12 años\nHora de encuentro: 2pm\nUbicacion: Parque rodo",
      img: img1,
    },
    {
      title: "COMPETENCIA DE BALONCESTO",
      description: "\nVeni y participa de un torneo de baloncesto en el \ncual podras formar un equipo y divertirte con tus amigos.\n\nEdad minima: 12 años.\nEdad Maxima:15 años.\nHora de inicio: 14:30hs.",
      img: img3,
    },
  ];

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={12} className="d-flex justify-content-center">
          <div className="carousel-info-container">
            <Row>
              <Col md={6} className="carousel-container">
                <Carousel 
                  activeIndex={index} 
                  onSelect={handleSelect} 
                  className="carousel" 
                  data-bs-theme="dark" // Aplicar tema oscuro
                >
                  {eventsInfo.map((event, idx) => (
                    <Carousel.Item key={idx} className="carousel-item">
                      <img
                        className="d-block w-100"
                        src={event.img}
                        alt={`Slide ${idx}`}
                      />
                      <Carousel.Caption>
                        <h5>{event.title}</h5>
                        <p>{event.description}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <Col md={6} className="d-flex align-items-start justify-content-start">
                <div className="event-info">
                  <h3><span>{eventsInfo[index].title}</span></h3>
                  <p>{eventsInfo[index].description}</p>
                  <Button className="button-info">Ver Info</Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CarouselComponent;
