import { createContext, useContext, useRef, useState, ReactNode } from "react";

type ToastType = "success" | "error" | "info";

type Toast = {
	message: string;
	type: ToastType;
};

type ToastContextType = {
	showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);
const ToastUI = ({ message, type }: { message: string; type: string }) => {
	const styles = {
		success: "bg-violet-600 text-white",
		error: "bg-red-600 text-white",
		info: "bg-gray-900 text-white",
	};

	return (
		<div className="fixed bottom-6 right-6 z-50 animate-slide-up">
			<div
				className={`px-6 py-3 rounded-xl shadow-lg text-sm
                    ${styles[type as keyof typeof styles]}`}
			>
				{message}
			</div>
		</div>
	);
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toast, setToast] = useState<Toast | null>(null);
	const timeoutRef = useRef<number | null>(null);

	const showToast = (message: string, type: ToastType = "info") => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		setToast({ message, type });

		timeoutRef.current = window.setTimeout(() => {
			setToast(null);
			timeoutRef.current = null;
		}, 3000);
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{toast && <ToastUI {...toast} />}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used inside ToastProvider");
	return ctx;
};
