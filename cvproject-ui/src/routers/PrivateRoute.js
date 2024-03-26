import { useAuth } from "react-oidc-context"
import { Spin, Typography } from 'antd'
import { myCVListApi } from "../api/MyCVListApi";
import handleLogError from "../utils/HandleError";
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
    } else {
        myCVListApi.saveUser(auth.user.profile.preferred_username, auth.user.profile.email)
            .catch(error => handleLogError(error))
    }

    return children
}
export default PrivateRoute