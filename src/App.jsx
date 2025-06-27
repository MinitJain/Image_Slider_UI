import { useState } from "react";
import "./App.css";
import ImageSlider from "./assets/Image-slider/ImageSlider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ImageSlider url={"https://picsum.photos/v2/list"} page={1} limit={5} />
    </>
  );
}

export default App;
