import { Switch, Route, Router as WouterRouter } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { LanguageProvider } from "@/hooks/useLanguage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ar" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

// `ssrPath` is only passed while prerendering pages at build time.
function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={ssrPath}>
      <LanguageProvider>
        <Router />
      </LanguageProvider>
    </WouterRouter>
  );
}

export default App;
