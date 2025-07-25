import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import coffeePlaceholderImg from "../assets/Fotos/IndPageCoffee.png";
import QRIconImg from "../assets/Fotos/QrCodeScannerBig.png";
import useFetch from "../hooks/useFetch";
import Arrow from "../assets/Fotos/arrow.png";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  height: 100%;
  font-family: 'Inter', sans-serif;
`;

const BackButton = styled.button`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
  margin-left: 115px;
  padding: 12px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 25px;
  color: #333;
  font-weight: 500;

  &:hover {
    color: #000;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 60px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  max-width: 400px;
`;

const IngredientImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const InfoSection = styled.div`
  flex: 1;
  max-width: 500px;
`;

const IngredientTitle = styled.h1`
  font-size: 48px;
  font-weight: 500;
  margin: 0 0 30px;
  color: #333;
  line-height: 1.2;
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 20px;
`;

const PriceGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IngredientPrice = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
`;

const CurrencyButton = styled.button`
  padding: 6px 12px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: #555;
  }
`;

const QRSection = styled.div`
  margin-top: -40px;
  flex-shrink: 0;
`;

const QRIcon = styled.img`
  width: 240px;
  height: 240px;
`;

const Divider = styled.hr`
  border: none;
  height: 2px;
  width: 340px;
  background-color: #7D7772;
  margin: 30px 0;
`;

const IngredientDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #7D7772;
  margin-bottom: 20px;
`;

const DetailedIngredientPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ingredient, setIngredient] = useState(null);
  const [currency, setCurrency] = useState("GEL");
  const [exchangeRate, setExchangeRate] = useState(1);
  const oppositeCurrency = currency === "GEL" ? "USD" : "GEL";

  const { response: ingredients } = useFetch({
    url: "http://localhost:5000/api/v1/resource/INGREDIENT",
    method: "GET",
  });

  useEffect(() => {
    if (ingredients) {
      const found = ingredients.find((ing) => ing.id === id);
      setIngredient(found);
    }
  }, [ingredients, id]);

  useEffect(() => {
    if (currency === "USD") {
      fetch("https://v6.exchangerate-api.com/v6/8758b2f94ecc01a304444b44/latest/GEL")
        .then((res) => res.json())
        .then((data) => {
          if (data?.conversion_rates?.USD) {
            setExchangeRate(data.conversion_rates.USD);
          }
        });
    }
  }, [currency]);

  const formatPrice = (price) => {
    if (!price) return "N/A";
    return currency === "GEL"
      ? `${price.toFixed(2)} ₾`
      : `$${(price * exchangeRate).toFixed(2)}`;
  };

  const toggleCurrency = () => setCurrency((prev) => (prev === "GEL" ? "USD" : "GEL"));

  const goBackHome = () => navigate("/ingredients");

  if (!ingredient) return null;

  const price = ingredient.data?.price || ingredient.price;
  const title = ingredient.data?.name || ingredient.name;
  const description = ingredient.data?.description || "No description available.";

  return (
    <Container>
      <BackButton onClick={goBackHome}>
        <img src={Arrow} alt="back arrow" />
        Return to Home
      </BackButton>

      <ContentWrapper>
        <ImageSection>
          <IngredientImage src={coffeePlaceholderImg} alt={title} />
        </ImageSection>

        <InfoSection>
          <IngredientTitle>{title}</IngredientTitle>

          <PriceSection>
            <PriceGroup>
              <IngredientPrice onClick={toggleCurrency}>{formatPrice(price)}</IngredientPrice>
              <CurrencyButton onClick={toggleCurrency}>{oppositeCurrency}</CurrencyButton>
            </PriceGroup>

            <QRSection>
              <QRIcon src={QRIconImg} alt="QR Code" />
            </QRSection>
          </PriceSection>

          <Divider />

          <IngredientDescription>{description}</IngredientDescription>
        </InfoSection>
      </ContentWrapper>
    </Container>
  );
};

export default DetailedIngredientPage;
