import { Home } from "./pages/Home";
import { LoginContextWrapper } from "./context/LoginContext";
import { ThemesContextWrapper } from "./context/ThemesContext";

function App() {
  return (
    <LoginContextWrapper>
      <ThemesContextWrapper>
        <Home />
      </ThemesContextWrapper>
    </LoginContextWrapper>
  );
}

export default App;
