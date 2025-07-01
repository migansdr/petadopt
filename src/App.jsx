import React from "react";
import Routes from "./Routes";
import CookieConsent from "./components/ui/CookieConsent";
import CookieSettingsButton from "./components/ui/CookieSettingsButton";

function App() {
  return (
    <>
      <Routes />
      <CookieConsent />
      <CookieSettingsButton />
    </>
  );
}

export default App;