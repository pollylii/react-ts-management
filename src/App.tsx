
import { useRoutes, Link } from "react-router-dom"
import router from './router';

function App() {
  const outlet = useRoutes(router);
  return (
    <div className="App">
      {/* <Link to="/home">home2</Link> |
      <Link to="/about">about2</Link>  */}
      {/* 占位符组件，窗口，有点类似于Vue中的 router-view */}
      {outlet}
    </div>
  )
}
export default App
