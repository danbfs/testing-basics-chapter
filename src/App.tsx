import Form, { FormData } from "./Form";

import "./App.css";

export default function App() {

  const saveData = (data: FormData) => {
    localStorage.setItem("formdata", JSON.stringify(data));
  };

  return <Form saveData={saveData} />;
}
