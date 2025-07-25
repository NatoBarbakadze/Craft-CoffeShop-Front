import styled from 'styled-components';
import heroImage from '../assets/Fotos/cover-foto.png';
import rectangle from '../assets/Fotos/Rectangle.png'

export const HeroSection = styled.section`
  position: relative;
  height: 662px;
  max-width: 100%;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: rgba(240, 238, 237, 1);
  z-index: 1;
  margin: -10px auto 76px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 937px;
  height: 662px;  
  background: url(${rectangle}) center/cover no-repeat;
  z-index: 0;
`;

export const HeroContent = styled.div`
  position: relative;
  width: 649px;
  margin-left: 102px;
  margin-top: 176px;
  display: flex;
  flex-direction: column;

  hr {
    width: 496px;
    height: 3px;
    background-color: rgba(255, 255, 255, 1);
    border: none;
    margin: 0;
  }

  h2 {
    font-family: Inter;
    font-weight: 500;
    font-size: 36px;
    color: rgba(240, 238, 237, 1);
    margin: 37px 0px 13px;
  }

  h1 {
    font-family: High Tower Text;
    font-weight: 400;
    font-size: 96px;
    color: rgba(240, 238, 237, 1);
    margin: 0;
  }

  h3 {
    font-family: Inter;
    font-weight: 400;
    font-size: 20px;
    color: rgba(251, 251, 251, 1);
    margin: 0px 0px 37px;
  };
  
`

const Hero = () => {
  return (
    <HeroSection>
      <Overlay />
      <HeroContent>
        <hr/>
        <h2>SIMPLY CLEVER</h2>
        <h1>BEST COFFEE</h1>
        <h3>Lorem Ipsum Dolor met sit dolor</h3>
        <hr />
      </HeroContent>
    </HeroSection>
  );
};
export default Hero;
