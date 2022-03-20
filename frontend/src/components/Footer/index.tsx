import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
            News App By Suchitra Mohan
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
            Data provided by The New York Times
        </Typography>
        <Typography align="center">
            <Link display="inline"
                align="center"
                variant="body1"
                href="https://github.com/suchimohan"
                sx={{ ml: 0.5 }}>
                <GitHubIcon/>
            </Link>
            <Link
                display="inline"
                align="center"
                variant="body1"
                href="https://www.linkedin.com/in/suchitra-mohan/"
                sx={{ ml: 0.5 }}
            >
                <LinkedInIcon/>
            </Link>
            <Link
                display="inline"
                align="center"
                variant="body1"
                href="suchimohan91@gmail.com"
                sx={{ ml: 0.5 }}
            >
                <EmailIcon/>
            </Link>
        </Typography>
      </Container>
    </Box>
  );
}
