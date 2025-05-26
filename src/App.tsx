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
