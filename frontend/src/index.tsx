import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Certifique-se de que o App está sendo importado corretamente
import "./styles.css"; // Se tiver um arquivo de estilos, importe aqui

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
