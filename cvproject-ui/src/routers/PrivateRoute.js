import { useAuth } from "react-oidc-context"
import { Spin, Typography } from 'antd'
const { Title } = Typography

function PrivateRoute({ children }) {
    const auth = useAuth();

    if (auth.isLoading) {
        return (
            <div className="text-center">
                <Title>Keycloak is loading</Title>
                <Title className="text-gray-500" level={2}>or running authorization code flow with PKCE</Title>
                <Spin size="large"></Spin>
            </div>
        )
    }

    if (auth.error) {
        return (
            <div className="text-center">
                <Title>Oops ...</Title>
                <Title className="text-gray-500" level={2}>{auth.error.message}</Title>
            </div>
        )
    }

    if (!auth.isAuthenticated) {
        auth.signinRedirect()
        return null
    }

    return children
}

export default PrivateRoute