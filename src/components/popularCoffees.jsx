import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import QrIconImg from "../assets/Fotos/Qr-icon.png";
import americanoImg from "../assets/Fotos/americano.png";
import frappuchinoImg from "../assets/Fotos/frappuchino.png";
import cafeMochaImg from "../assets/Fotos/cafeMocha.png";
import caramelMacchiatoimg from "../assets/Fotos/caramelMacchiato.png";
import { CurrencyContext } from "../contexts/CurrencyContext";



export const coffees = [
  { name: "Frappuchino", img: frappuchinoImg, price: 5.99 },
  { name: "Cafe Mocha", img: cafeMochaImg, price: 5.99 },
  { name: "Caramel Macchiato", img: caramelMacchiatoimg, price: 5.99 },
  { name: "Americano", img: americanoImg, price: 5.99 },
];



const Section = styled.section`
  width: 1217px;
  height: 560px;
  margin-left: 137px;
`;
export const HeaderMini = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 42px;
`;
export const Title = styled.h2`
  font-family: Inter;
  font-weight: 500;
  font-size: 36px;
  line-height: 100%;
  color: rgba(0, 0, 0, 1);
`;

export const CurrencyButton = styled.button`
  font-family: Inter;
  font-weight: 500;
  font-size: 20px;
  color: rgba(240, 238, 237, 1);
  padding: 11px 13px;
  background-color: rgba(31, 31, 34, 1);
  border-radius: 5px;
  cursor: pointer;
`;
const CoffeeGrid = styled.div`
  width: 1217px;
  height: 367px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 55px;
`;
export const CoffeeCard = styled.div`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;

`;
const CoffeeImage = styled.img`
  width: 100%;
  height: 254px;
  object-fit: cover;
`;
const CoffeeInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 222px;
  height: 77px;
  padding: 17px 17px 19px 24px;

`;
export const CoffeeText = styled.div`
  h4 {
    font-family: Inter;
    font-weight: 600;
    font-size: 16px;
    color: rgba(118, 111, 107, 1);
  }
  p {
    font-family: Inter;
    font-weight: 700;
    font-size: 12px;
    color: rgba(119, 74, 71, 1);
  }
`;
export const QRIcon = styled.img`
  width: 62px;
  height: 62px;
`;



const PopularCoffees = () => {
  const { currency, toggleCurrency } = useContext(CurrencyContext);
  const [exchangeRate, setExchangeRate] = useState(undefined);


  useEffect(() => {
    if (currency === "GEL") {
      fetch("https://v6.exchangerate-api.com/v6/8758b2f94ecc01a304444b44/latest/USD")
        .then((res) => res.json())
        .then((data) => {
          if (data?.conversion_rates?.GEL) {
            setExchangeRate(data.conversion_rates.GEL);
          }
        })
        .catch((err) => {
          console.error("Error fetching exchange rate:", err);
        });
    }
  }, [currency]);


  
  const formatPrice = (price) => {
    if (currency === "GEL") return `$${price.toFixed(2)}`;
    return `${(price * exchangeRate).toFixed(2)} ₾`;
  };



  return (
    <Section>
      <HeaderMini>
        <Title>Popular Coffees</Title>
        <CurrencyButton onClick={toggleCurrency}>{currency}</CurrencyButton>
      </HeaderMini>

      <CoffeeGrid>
        {coffees.map((coffee, index) => (
          <CoffeeCard key={index}>
            <CoffeeImage src={coffee.img} alt={coffee.name} />
            <CoffeeInfoWrapper>
              <CoffeeText>
                <h4>{coffee.name}</h4>
                <p>{formatPrice(coffee.price)}</p>
              </CoffeeText>
              <QRIcon src={QrIconImg} alt="Qr-Icon" />
            </CoffeeInfoWrapper>
          </CoffeeCard>
        ))}
      </CoffeeGrid>
    </Section>
  );
};
export default PopularCoffees




