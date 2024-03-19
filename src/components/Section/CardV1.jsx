import React from "react";
import { Card } from "react-bootstrap";
import Slider from "react-slick";
import '../listadoDeProductos/listado.css'
import { useAuth } from "../../context/UserContext.jsx";

const CardV1 = ({}) => {
  const {products} = useAuth();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  const favoriteProducts = products.filter(product => product.isFavorite);

  return (
    <>
    <div className="slider-container">
      {favoriteProducts.length > 0 ? (
        <Slider {...settings}>
          {favoriteProducts.map((product) => (    
            <div key={product._id} className="mx-3 card-1">
              <Card className="text-white card-1">
                <Card.Img variant="top" src={product.image || ''} className="card-img" />
                <div className="titulo">
                  <Card.Title className="text-center">{product.name}</Card.Title>
                  <div className="card-footer">
                    <small>${product.price}</small>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center">No hay productos destacados</p> 
      )}
    </div>

    </>
  );
};

export default CardV1;
