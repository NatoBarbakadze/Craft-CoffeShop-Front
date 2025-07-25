import { useEffect, useState } from "react";
import { HeroContent, HeroSection } from "../components/Hero"
import useFetch from "../hooks/useFetch";
import { CoffeeCard, CoffeeText, CurrencyButton, HeaderMini, QRIcon, Title } from "../components/popularCoffees";
import coffeeImg from "../assets/Fotos/cafeMocha.png"
import styled from "styled-components";
import QRIconImg from "../assets/Fotos/qr-icon.png";
import { useNavigate } from "react-router-dom";



const Section = styled.section`
  width: 1217px;
  height: max-content;
  margin-left: 137px;
  margin-bottom: 106px;
`;

const CoffeeImage = styled.img`
  width: 100%;
  height: 206px;
  object-fit: cover;
`;

const CoffeeGrid = styled.div`
  width: 1217px;
  height: max-content;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 55px;
  margin-bottom: 87px;
`;

const CoffeeInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 222px;
  height: 62px;
  padding: 14px 17px 16px 24px;

`;

const IngredientsPage=()=>{
    const { response: ingredients, loading, error } = useFetch({
    url: "http://localhost:5000/api/v1/resource/INGREDIENT",
    method: "GET",
  });

  const navigate = useNavigate();

  const [currency, setCurrency] = useState("GEL");
  const [exchangeRate, setExchangeRate] = useState(undefined); 

  const toggleCurrency = () => {
    setCurrency((curr) => (curr === "GEL" ? "USD" : "GEL"));
  };

  
  useEffect(() => {
    if (currency === "USD") {
      fetch("https://v6.exchangerate-api.com/v6/8758b2f94ecc01a304444b44/latest/GEL")
        .then((res) => res.json())
        .then((data) => {
          if (data?.conversion_rates?.USD) {
            setExchangeRate(data.conversion_rates.USD); 
          }
        })
        .catch((err) => {
          console.error("Error fetching exchange rate:", err);
        });
    }
  }, [currency]);

  

  const formatPrice = (priceInGEL) => {
  const numericPrice = Number(priceInGEL);

  if (isNaN(numericPrice)) return "N/A";

  if (currency === "GEL") {
    return `${numericPrice.toFixed(2)} ₾`;
  }

  const priceInUSD = numericPrice * exchangeRate;
  return `$${priceInUSD.toFixed(2)}`;
};

  if (loading) return <p>Loading ingredients...</p>;
  if (error) return <p>Error loading ingredients: {error.message}</p>;




 return (

  <>   
    <HeroSection>
      <HeroContent>
        <h2>SIMPLY CLEVER</h2>
        <h1>BEST COFFEE</h1>
        <h3>Lorem Ipsum Dolor met sit dolor</h3>
        <hr />
      </HeroContent>
    </HeroSection>


    <Section>
      <HeaderMini>
          <Title>All Ingredients</Title>
          <CurrencyButton onClick={toggleCurrency}>
            {currency === "GEL" ? "USD" : "GEL"}
          </CurrencyButton>
      </HeaderMini>

      <CoffeeGrid>

        {ingredients?.map((ing) => {
          const price = ing.data?.price || ing.price;
          const name = ing.data?.name || ing.name;

          return (
            <CoffeeCard key={ing.id} onClick={() => navigate(`/ingredients/${ing.id}`)}>
              <CoffeeImage
                src={coffeeImg}
                alt={name}
              />
              <CoffeeInfoWrapper>
                <CoffeeText>
                  <h4>{name}</h4>
                  <p>{formatPrice(price)}</p>
                </CoffeeText>
                <QRIcon src={QRIconImg} alt="Qr-Icon" />
              </CoffeeInfoWrapper>
            </CoffeeCard>
          );
        })}
      </CoffeeGrid>
    
    </Section>
  </>
 
  )
}
export default IngredientsPage