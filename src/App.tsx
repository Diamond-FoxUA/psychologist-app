import Header from "./components/layout/Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
