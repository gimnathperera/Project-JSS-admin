import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LogoImage from '../../assets/images/Logo.svg';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        justify-content: center;
`
);

function Logo() {
  return (
    <LogoWrapper to="/overview">
      <img src={LogoImage} />
    </LogoWrapper>
  );
}

export default Logo;
