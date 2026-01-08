import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { ToastProvider } from "./utils/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={appStore}>
			<ToastProvider>
				<App />
			</ToastProvider>
		</Provider>
	</StrictMode>,
);
