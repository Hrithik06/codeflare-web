import { useAppSelector } from "../../utils/hooks";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";

const AuthLayout = () => {
	const isAuthenticated = useAppSelector((store) => store.user.isAuthenticated);

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return (
		<>
			<Outlet />
			<Footer />
		</>
	);
};
export default AuthLayout;
