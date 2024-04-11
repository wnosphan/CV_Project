import { useAuth } from "react-oidc-context"
import { Button, Spin, Typography } from 'antd'

import { AuthApi } from "~/api";
import handleLogError from "~/utils/HandleError";
const { Title } = Typography

function PrivateRoute({ children }) {
    const auth = useAuth();
    if (auth.isLoading) {
        return (
            <div className="text-center">
                {/* <Title>Keycloak is loading</Title>
                <Title className="text-gray-500" level={2}>or running authorization code flow with PKCE</Title> */}
                <Title>Loading...</Title>
                <Spin size="large"></Spin>
            </div>
        )
    }

    if (auth.error) {
        return (
            <div className="text-center">
                <Title>Oops ...</Title>
                <Title className="text-gray-500" level={2}>{auth.error.message}</Title>
                <Button onClick={() => {
                    auth.removeUser();
                    auth.signinRedirect({ redirect_uri: process.env.REACT_APP_PROJECT_URL });
                }
                }>Login</Button>
            </div>
        )
    }

    if (!auth.isAuthenticated) {
        auth.signinRedirect({ redirect_uri: process.env.REACT_APP_PROJECT_URL })
        return null
    }
    else {
        const user = {
            username: auth.user?.profile.preferred_username,
            email: auth.user?.profile.email
        }
        AuthApi.saveUser(user)
            .catch(error => handleLogError(error))
    }
    return children
}
export default PrivateRoute;