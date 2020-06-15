import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import Loading from "../components/loading";
import logo from "../img/upday-logo-white.svg";

import styles from "./app.module.css";

const WIKI_API_URL =
  "https://{{locale}}.wikipedia.org/api/rest_v1/page/summary";

const localeToPageTitle = {
  el: "Άλμπερτ_Αϊνστάιν",
  ru: "Эйнштейн,_Альберт",
};

async function fetchWikiData({ locale = "en" }) {
  const { data } = await axios.get(
    `${WIKI_API_URL.replace("{{locale}}", locale)}/${
      localeToPageTitle[locale] || "Albert_Einstein"
    }`
  );

  return data;
}

function App() {
  const [locale, setLocale] = useState("en");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetchWikiData({ locale });

      setData(response);
      setIsLoading(false);
    }

    fetchData();
  }, [locale]);

  return (
    <div className={styles.app}>
      <header className={styles["app-header"]}>
        <div className={styles["app-container"]}>
          <img src={logo} className={styles["app-logo"]} alt="logo" />
          <select
            className={styles["app-lang-switch"]}
            onChange={(e) => setLocale(e.currentTarget.value)}
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="it">Italiano</option>
            <option value="ru">Русский</option>
            <option value="tr">Türkçe</option>
            <option value="pl">Polski</option>
            <option value="el">Ελληνικά</option>
            <option value="pt">Português</option>
          </select>
        </div>
      </header>
      <main className={styles["app-main"]}>
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <section className={styles["app-intro"]}>
              <aside>
                <h1>{data.displaytitle}</h1>
                <div
                  style={{
                    width: data.thumbnail?.width,
                    height: data.thumbnail?.height,
                  }}
                >
                  <img
                    src={data.thumbnail?.source}
                    alt={data.displaytitle}
                  ></img>
                </div>
              </aside>
              <div className={styles["app-intro-description"]}>
                <p>{data.description}</p>
              </div>
            </section>
            <section className={styles["app-content"]}>
              <div>{data.extract}</div>
            </section>
          </Fragment>
        )}
      </main>
    </div>
  );
}

export default App;
