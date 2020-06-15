import React from "react";
import { render } from "@testing-library/react";

import App from "./app";

describe("app", () => {
  describe("lang switcher", () => {
    let languageGetter;

    beforeEach(() => {
      languageGetter = jest.spyOn(window.navigator, "language", "get");
    });

    it("renders lang switcher with default value", () => {
      const { getByTestId } = render(<App />);
      const langSwitcher = getByTestId("lang-switcher");

      expect(langSwitcher.value).toBe("en");
      expect(langSwitcher).toBeInTheDocument();
    });

    it("renders lang switcher with preferred locale", () => {
      languageGetter.mockReturnValue("de-De");
      const { getByTestId } = render(<App />);
      const langSwitcher = getByTestId("lang-switcher");

      expect(langSwitcher.value).toBe("de");
      expect(langSwitcher).toBeInTheDocument();
    });
  });
});
