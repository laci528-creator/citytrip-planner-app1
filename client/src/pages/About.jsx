function About() {
  return (
    <main className="main-container">
      <section className="result-card about-page">
        <h1>About CityTrip Planner</h1>

        <section lang="en">
          <h2>English</h2>

          <p>
            CityTrip Planner is a modern web application designed
            to help users prepare for short city trips by bringing
            useful destination information together in one place.
          </p>

          <p>
            Users can search for a city, choose from multiple
            matching locations, and view information such as
            current weather, a seven-day forecast, local currency
            exchange rates, nearby attractions, destination images,
            and an interactive map.
          </p>

          <h3>Why CityTrip Planner?</h3>

          <p>
            The project originally started under the German working
            title <strong>Urlaub Planer</strong>. During development,
            however, it became clear that the application was more
            suitable for planning short city breaks than longer
            holidays.
          </p>

          <p>
            The project was therefore renamed{" "}
            <strong>CityTrip Planner</strong>, which better reflects
            its main purpose and features.
          </p>

          <h3>Why is the application in English?</h3>

          <p>
            The user interface was changed to English because the
            external APIs used by the application mainly return data,
            category names, and descriptions in English.
          </p>

          <p>
            Using one language throughout the application keeps the
            displayed information consistent and avoids incomplete
            or inaccurate automatic translations.
          </p>

          <h3>Project Goal</h3>

          <p>
            The main goal of this project is to practise working with
            asynchronous API requests and combining information from
            several external data sources.
          </p>

          <p>
            The project demonstrates how geocoding, weather,
            currency, image, and attraction data can be retrieved
            and combined by a Node.js and Express backend, while
            React Leaflet and OpenStreetMap are used to display
            the selected destination and nearby attractions on an
            interactive map.
          </p>
          <h3>Data sources</h3>

          <p>
            The application integrates Open-Meteo for geocoding
            and weather data, OpenTripMap for nearby attractions,
            Unsplash for destination images, Frankfurter for
            currency exchange rates, and OpenStreetMap with
            React Leaflet for the interactive map.
          </p>
        </section>

        <hr />

        <section lang="de">
          <h2>Deutsch</h2>

          <p>
            CityTrip Planner ist eine moderne Webanwendung, die
            Nutzerinnen und Nutzer bei der Vorbereitung kurzer
            Städtereisen unterstützt, indem wichtige Informationen
            über ein Reiseziel an einem Ort zusammengeführt werden.
          </p>

          <p>
            Es kann nach einer Stadt gesucht und zwischen mehreren
            passenden Treffern gewählt werden. Anschließend zeigt
            die Anwendung unter anderem das aktuelle Wetter, eine
            Sieben-Tage-Wettervorhersage, Wechselkursinformationen,
            Sehenswürdigkeiten in der Nähe, ein Bild des Reiseziels
            und eine interaktive Karte an.
          </p>

          <h3>Warum CityTrip Planner?</h3>

          <p>
            Das Projekt begann ursprünglich unter dem deutschen
            Arbeitstitel <strong>Urlaub Planer</strong>. Während der
            Entwicklung wurde jedoch deutlich, dass sich die
            Anwendung eher für die Planung kurzer Städtereisen als
            für längere Urlaube eignet.
          </p>

          <p>
            Das Projekt wurde deshalb in{" "}
            <strong>CityTrip Planner</strong> umbenannt. Dieser Name
            beschreibt den Zweck und die Funktionen der Anwendung
            genauer.
          </p>

          <h3>Warum ist die Anwendung auf Englisch?</h3>

          <p>
            Die Benutzeroberfläche wurde auf Englisch umgestellt, da
            die verwendeten externen APIs ihre Daten, Kategorienamen
            und Beschreibungen überwiegend in englischer Sprache
            bereitstellen.
          </p>

          <p>
            Eine einheitliche Sprache sorgt für eine konsistente
            Darstellung und vermeidet unvollständige oder ungenaue
            automatische Übersetzungen.
          </p>

          <h3>Projektziel</h3>

          <p>
            Das Hauptziel des Projekts ist es, den Umgang mit
            asynchronen API-Anfragen sowie die Zusammenführung von
            Informationen aus mehreren externen Datenquellen zu
            üben.
          </p>

          <p>
            Das Projekt zeigt, wie Geocoding-, Wetter-, Währungs-,
            Bild- und Sehenswürdigkeitsdaten durch ein Node.js-
            und Express-Backend abgerufen und zusammengeführt
            werden. React Leaflet und OpenStreetMap werden
            verwendet, um das ausgewählte Reiseziel und
            Sehenswürdigkeiten in der Nähe auf einer interaktiven
            Karte darzustellen.
          </p>
          <h3>Datenquellen</h3>

          <p>
            Die Anwendung verwendet Open-Meteo für Geocoding-
            und Wetterdaten, OpenTripMap für Sehenswürdigkeiten
            in der Nähe, Unsplash für Bilder der Reiseziele,
            Frankfurter für Wechselkurse sowie OpenStreetMap
            und React Leaflet für die interaktive Karte.
          </p>
        </section>
      </section>
    </main>
  );
}

export default About;