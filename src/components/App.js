import { Users } from "./Users/Users";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./NotFond/NotFond";
import { Tweets } from "./Tweets/Tweets";
import { SharedLayout } from "./SharedLayout/SharedLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Users />}></Route>
        <Route path="/tweets" element={<Tweets />}></Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
