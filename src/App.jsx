import { ToastContainer } from "react-toastify";
import { Loading } from "./Componentes/Loanding";
import { useContextIm } from "./hooks/useContext";
import { RoutesMain } from "./routes";
import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {loading} = useContextIm();

  return (
    <>
      {loading ? <Loading>Carregando...</Loading> : <RoutesMain />}
      <ToastContainer position="bottom-right"/>
    </>
  )
}

export default App
