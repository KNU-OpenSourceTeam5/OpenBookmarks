import { isBrowser, isMobile } from "react-device-detect";
import BrowserAppEntry from "./apps/BrowserAppEntry";
import MobileAppEntry from "./apps/MobileAppEntry";

function App() {
  return (
    <>
      {isBrowser ? <BrowserAppEntry /> : null}
      {isMobile ? <MobileAppEntry /> : null}
    </>
  );
}

export default App;
