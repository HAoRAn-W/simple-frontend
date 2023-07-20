import { Box, Container, Link, Typography } from '@mui/material';
import React from 'react'

function Footer(props) {
    // const { description, title } = props;
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py:4, bottom: 0}}>
          <Container maxWidth="lg">
            <Typography variant="h6" align="center" gutterBottom>
              whr.one
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
            >
              The best people in life are free
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              color="text.secondary"
            >
              Built with React.js and MUI
            </Typography>
            <Copyright />
          </Container>
        </Box>
      );
}


function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          whr.one
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Footer
