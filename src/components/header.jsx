import styled from 'styled-components';
import logo from '../assets/Fotos/Qr-code-scanner.png';
import { useNavigate } from 'react-router-dom';
import useScrollHeader from '../hooks/UseScrollHeader';


const StyledHeader = styled.header `
  display: flex;
  width: 1440px;
  height: 60px;
  margin-top: 0px;
  margin-left: 0px;
  z-index: 100;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: ${({ scrolled }) => (scrolled ? "#1f1f22" : "transparent")};
  padding-right: ${({ scrolled }) => (scrolled ? "200px" : "0px")};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 202px;
  margin-top: 11px;
  margin-left: 102px;
  

  img {
    width: 38px;
    height: 38px;
    angle: 0 deg;
    opacity: 1;
    cursor: pointer;
    
  }

  span {
    font-family: Inter;
    font-weight: 600;
    font-style: Semi Bold;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: 14%;
    color: rgba(240, 238, 237, 1);
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 12px;

`;

const NavButton1 = styled.button`
  padding: 10px 36px;
  border-radius: 5px;
  angle: 0 deg;
  opacity: 1;
  background-color: rgba(31, 31, 34, 1);
  color: rgba(240, 238, 237, 1);
  font-family: Inter;
  font-weight: 500;
  font-style: Medium;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0%;
  cursor: pointer;

  }
`;

const NavButton2 = styled.button`
  padding: 10px 33px;
  border-radius: 5px;
  angle: 0 deg;
  opacity: 1;
  background-color: rgba(31, 31, 34, 1);
  color: rgba(240, 238, 237, 1);
  font-family: Inter;
  font-weight: 500;
  font-style: Medium;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0%;
  cursor: pointer;

`;


const Header = () => {
  const navigate = useNavigate();
  const scrolled = useScrollHeader(50);

  return (
    <StyledHeader scrolled={scrolled}>
      <LogoContainer>
        <img src={logo} alt="Logo" onClick={() => navigate('/')} />
        <span>Coffee Shop</span>
      </LogoContainer>
      <NavButtons>
        <NavButton1 onClick={() => navigate('/coffees')}>Coffees</NavButton1>
        <NavButton2 onClick={() => navigate('/ingredients')}>Ingredients</NavButton2>
      </NavButtons>
    </StyledHeader>
  );
};


export default Header;



