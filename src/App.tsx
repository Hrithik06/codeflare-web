// import { BrowserRouter, Routes, Route } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { Suspense, lazy } from "react";

import appStore from "./utils/appStore";
import { Body, Login, Loader } from "./components"; // These load instantly

// Lazy-loaded components
const Feed = lazy(() => import("./components/Feed"));
const Profile = lazy(() => import("./components/Profile"));
const Connections = lazy(() => import("./components/Connections"));
const Requests = lazy(() => import("./components/Requests"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./components/RefundPolicy"));
const TermsOfService = lazy(() => import("./components/TermsOfService"));
const NotFound = lazy(() => import("./components/NotFound"));
const ErrorPage = lazy(() => import("./components/ErrorPage"));

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        {/* Suspense for all lazy-loaded routes */}
        <Suspense
          fallback={
            <div className="flex p-10 w-full justify-around ">
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="login" element={<Login />} />
              {/* No suspense, loads instantly */}
              <Route index element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="refunds" element={<RefundPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
