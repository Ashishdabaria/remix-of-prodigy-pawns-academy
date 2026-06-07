// Preload for `bun test` to provide a DOM via happy-dom.
import { GlobalRegistrator } from "@happy-dom/global-registrator";

if (!(globalThis as any).__HAPPY_DOM_REGISTERED__) {
  GlobalRegistrator.register({ url: "http://localhost/" });
  (globalThis as any).__HAPPY_DOM_REGISTERED__ = true;
}

// React 19 reads this to silence "not wrapped in act(...)" warnings appropriately.
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
