import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import arrowImg from "../assets/Fotos/arrow.png";
import QrIconBig from "../assets/Fotos/QrCodeScannerBig.png";
import styled from "styled-components";
import CoffeePhoto from "../assets/Fotos/IndPageCoffee.png";
import { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../contexts/CurrencyContext";

export const ArrowDiv = styled.div`
  width: 252px;
  height: 52px;
  display: flex;
  gap: 21px;
  margin-bottom: 40px;
  margin-top: 86px;
  margin-left: 102px;
  align-items: center;
  cursor: pointer;
`;

export const ArrowTitle = styled.p`
  font-family: Inter;
  font-weight: 400;
  font-size: 24px;
  color: rgba(31, 31, 34, 1);
`;

export const BigQR = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 55px;
`;

export const BigPhoto = styled.img`
  width: 513px;
  height: 802px;
  border-radius: 5px;
  margin-left: 105px;
  margin-bottom: 86px;
`;

export const DetailedPageText = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 513px;
`;

export const DetailedPageContent = styled.div`
  display: flex;
  gap: 102px;
  align-items: flex-start;
`;

export const Hr = styled.hr`
  width: 496px;
  height: 3px;
  background-color: rgba(125, 119, 114, 1);
  margin-left: 0px;
 
`;

export const Description = styled.h2`
  font-family: Inter;
  font-weight: 400;
  font-size: 20px;
  color: rgba(31, 31, 34, 1);
  width: 593px;
  height: 309px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CoffeeTitle = styled.h2`
  font-family: "High Tower Text";
  font-weight: 400;
  font-size: 48px;
  color: rgba(31, 31, 34, 1);
  align-self: flex-start;
`;

export const CoffeePrice = styled.h2`
  font-family: Inter;
  font-weight: 700;
  font-size: 48px;
  color: rgba(97, 74, 72, 1);
`;

const CurrencyButton = styled.button`
  font-family: Inter;
  font-weight: 500;
  font-size: 20px;
  color: rgba(240, 238, 237, 1);
  padding: 11px 13px;
  background-color: rgba(31, 31, 34, 1);
  border-radius: 5px;
  cursor: pointer;
  max-height:57px;
`;

export const DetailedValues = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 70px;
  margin-bottom: 55px;
`;

export const DetailedValuesMini = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 27px;
  width: 248px;
  align-items: center;

`;

const DetailedCoffeePage = () => {
  const { coffeeId } = useParams();
  const navigate = useNavigate();

  const { response: coffee, loading, error } = useFetch({
    url: `http://localhost:5000/api/v1/resource/COFFEE/${coffeeId}`,
    method: "GET",
  });

  const { currency, toggleCurrency } = useContext(CurrencyContext);
  const [exchangeRate, setExchangeRate] = useState(1);


  useEffect(() => {

    fetch("https://v6.exchangerate-api.com/v6/8758b2f94ecc01a304444b44/latest/GEL")
      .then((res) => res.json())
      .then((data) => {
        if (data?.conversion_rates?.USD) {
          setExchangeRate(data.conversion_rates.USD);
        } else {
          setExchangeRate(1);
        }
      })
      .catch(() => {
        setExchangeRate(1);
      });
  }, [currency]);

 
  const formatPrice = (priceInGEL) => {
    if (priceInGEL == null || isNaN(priceInGEL)) return "N/A";

    if (currency === "GEL") return `${priceInGEL.toFixed(2)} ₾`;

    if (!exchangeRate || isNaN(exchangeRate)) return "Loading...";

    return `$${(priceInGEL * exchangeRate).toFixed(2)}`;
  };

  if (loading) return <p>Loading coffee details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!coffee) return <p>No coffee found.</p>;
  

  
  const name = coffee?.data?.title || coffee?.name || "Unnamed Coffee";
  const description = coffee?.data?.description || "No description provided";
  const price = coffee?.data?.totalPrice ?? coffee?.totalPrice ?? null;

  return (
    <div>
      <ArrowDiv>
        <img src={arrowImg} alt="arrow image" onClick={() => navigate("/coffees")} />
        <ArrowTitle>Return to Home</ArrowTitle>
      </ArrowDiv>

      <DetailedPageContent>
        <BigPhoto src={CoffeePhoto} alt="Coffee" />
        <DetailedPageText>
          <CoffeeTitle>{name}</CoffeeTitle>
          <DetailedValues>
            <DetailedValuesMini>
              <CoffeePrice>{formatPrice(price)}</CoffeePrice>
              <CurrencyButton onClick={toggleCurrency}>{currency}</CurrencyButton>
            </DetailedValuesMini>
            <BigQR src={QrIconBig} alt="QR Icon" />
          </DetailedValues>       
          <Hr />
          <Description>{description}</Description>
        </DetailedPageText>
      </DetailedPageContent>
    </div>
  );
};
export default DetailedCoffeePage;


