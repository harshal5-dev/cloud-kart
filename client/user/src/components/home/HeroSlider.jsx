import { useRef, useState, useEffect } from "react";
import { Typography, Button, Space, Row, Col } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const timeoutRef = useRef(null);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      title: "Summer Collection 2025",
      description:
        "Shop the latest trends for the summer season with discounts up to 40% off",
      buttonText: "Shop Now",
      buttonLink: "/categories/fashion",
    },
    {
      image:
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      title: "Latest Tech Gadgets",
      description:
        "Discover cutting-edge electronics and tech accessories for your digital lifestyle",
      buttonText: "Browse Electronics",
      buttonLink: "/categories/electronics",
    },
    {
      image:
        "https://images.unsplash.com/photo-1565022536102-f7645c84354a?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      title: "Home Essentials",
      description:
        "Transform your living space with our stylish and functional home collection",
      buttonText: "Explore",
      buttonLink: "/categories/home-kitchen",
    },
  ];

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setActiveSlide((prevSlide) =>
          prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        ),
      6000
    );

    return () => {
      resetTimeout();
    };
  }, [activeSlide, slides.length]);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const goToPrevSlide = () => {
    setActiveSlide(activeSlide === 0 ? slides.length - 1 : activeSlide - 1);
  };

  const goToNextSlide = () => {
    setActiveSlide(activeSlide === slides.length - 1 ? 0 : activeSlide + 1);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="relative h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

            <Row className="absolute inset-0 z-10">
              <Col xs={24} md={12} className="h-full flex items-center">
                <div className="p-8 md:p-16">
                  <Title
                    level={1}
                    className="text-white mb-4 text-4xl md:text-5xl font-bold"
                  >
                    {slide.title}
                  </Title>
                  <Paragraph className="text-white text-lg mb-8 max-w-md">
                    {slide.description}
                  </Paragraph>
                  <Space size="middle">
                    <Button size="large" type="primary">
                      {slide.buttonText}
                    </Button>
                    <Button
                      size="large"
                      ghost
                      className="text-white border-white"
                    >
                      Learn More
                    </Button>
                  </Space>
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full"
        onClick={goToPrevSlide}
      >
        <ArrowLeftOutlined className="text-white text-lg" />
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full"
        onClick={goToNextSlide}
      >
        <ArrowRightOutlined className="text-white text-lg" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeSlide ? "bg-white w-8" : "bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
