import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button disableElevation variant="contained" color="grey"  size="large" sx={{textTransform: 'none'}} onClick={() => logout({ logoutParams: { returnTo: window.location.origin + '/logout_redirect' } })}>
      Déconnexion
    </Button>
  );
};

export default LogoutButton;