import { useAuth0 } from "@auth0/auth0-react";

export function GetToken() {



const {
  getAccessTokenSilently
} = useAuth0();

const token = getAccessTokenSilently();

return {
    token: getAccessTokenSilently()
}

}