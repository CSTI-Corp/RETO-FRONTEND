import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';
import { styled } from '@mui/material';

const StyledCard = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: "25px",
    // gap: theme.spacing(2),
    margin: 'auto',
    // [theme.breakpoints.up('sm')]: {
    //     width: '100%',
    // },
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    // backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    ...theme.applyStyles?.('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
    }),
    
}));

interface CustomCardProps extends MuiCardProps {
    children: React.ReactNode;
}

export const CardAdmin: React.FC<CustomCardProps> = ({ children, ...props }) => {
    return <StyledCard {...props}>{children}</StyledCard>;
}