import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";

import appStore from "./utils/appStore";
import {
  Body,
  ErrorPage,
  Feed,
  Login,
  NotFound,
  Profile,
  Connections,
  Requests,
  ContactUs,
  PrivacyPolicy,
  RefundPolicy,
  TermsOfService,
} from "./components";
// import Container from "./Container";
function App() {
  return (
    <>
      {/* <Container> */}
      {/* </Container> */}
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="refunds" element={<RefundPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="/" element={<Feed />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/error" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
