import styled from 'styled-components';
import logo from '../assets/Fotos/Qr-code-scanner.png';
import { useNavigate } from 'react-router-dom';
import useScrollHeader from '../hooks/UseScrollHeader';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: ${({ scrolled }) => (scrolled ? "#1f1f22" : "transparent")};
  padding-right: ${({ scrolled }) => (scrolled ? "200px" : "0px")};
  transition: 0.3s;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 102px;

  img {
    width: 38px;
    height: 38px;
    cursor: pointer;
  }

  span {
    font-family: Inter;
    font-weight: 600;
    font-size: 20px;
    color: rgba(240, 238, 237, 1);
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 102px;
`;

const NavButton = styled.button`
  padding: 10px 34px;
  border-radius: 5px;
  background-color: rgba(31, 31, 34, 1);
  color: rgba(240, 238, 237, 1);
  font-family: Inter;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  border: none;
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
        <NavButton onClick={() => navigate('/coffees')}>Coffees</NavButton>
        <NavButton onClick={() => navigate('/ingredients')}>Ingredients</NavButton>
      </NavButtons>
    </StyledHeader>
  );
};

export default Header;
