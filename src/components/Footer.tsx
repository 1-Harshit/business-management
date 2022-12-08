import { Box, Container, Typography, styled } from '@mui/material';
import Link from "next/link";

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; 2022 - Pole Star Enterprises&apos; Business Management Application
          </Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          Crafted by{' '}
          <Link
            href="/credits"
            rel="noopener noreferrer"
          >
            Harshit Raj
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
