import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';

const RegisterButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button disableElevation variant="contained" color="dark"  size="large" sx={{textTransform: 'none'}} onClick={() => loginWithRedirect()}>Inscription</Button>;
};

export default RegisterButton;