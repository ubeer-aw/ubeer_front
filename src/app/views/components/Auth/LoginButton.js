import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button disableElevation variant="contained" color="grey"  size="large" sx={{textTransform: 'none'}} onClick={() => loginWithRedirect()}>Connexion</Button>;
};

export default LoginButton;