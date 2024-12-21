import { AppRouter } from "./routes/router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick draggable
        pauseOnHover />
    </>
  );
}

export default App;