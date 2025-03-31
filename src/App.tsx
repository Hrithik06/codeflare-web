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
  Test,
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
              <Route path="/" element={<Feed />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/test" element={<Test />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
