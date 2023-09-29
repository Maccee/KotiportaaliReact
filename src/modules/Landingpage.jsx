import React from "react";
import "./css/Landingpage.css";

const Landingpage = ({ setShowLogin }) => {
  return (
    <>
      <div className="landingpage moduleHeader">
        <h1>KotiPortaali™</h1>
        <div>Kaikki taloyhtiösi asiat yhdellä klikkauksella!</div>
        <button onClick={() => {setShowLogin(true)}}>REKISTERÖIDY</button>
        <hr />
        <h2>Tervetuloa KotiPortaaliin™!</h2>
        <p>
          KotiPortaali™ on taloyhtiöiden ja asukkaiden ykköspalvelu. Meidän
          avullamme hallinnoit ja seuraat taloyhtiön asioita helposti ja
          tehokkaasti yhdestä paikasta.
        </p>
        <h2>Miksi valita KotiPortaali™?</h2>
        <ul>
          <li>
            Kaikki yhdessä paikassa! Tiedotteet, remontit, huollot,
            parkkipaikat, järjestyssäännöt ja paljon muuta!
          </li>
          <li>
             Sauna- ja pesutupavaraukset sujuvasti ja
            vaivattomasti.
          </li>
          <li>
            Taloyhtiön dokumentit,
            isännöintitodistukset ja muut tärkeät paperit aina käden
            ulottuvilla.
          </li>
          <li>
            Pysy ajan tasalla resurssien kulutuksesta, kuten
            sähkön hinnasta.
          </li>
          <li>
            Seuraa ja hallinnoi taloyhtiön tärkeitä
            päiviä.
          </li>
        </ul>
        <h2>Miten KotiPortaali™ toimii?</h2>
        <ol>
          <li>
            Luo oma käyttäjätilisi ja liitä se taloyhtiöösi.
          </li>
          <li>
            Selaa kaikkia tarjolla olevia palveluita ja toimintoja.
          </li>
          <li>
            Tee varauksia, katso tiedotteita ja hallitse taloyhtiön
            asioita vaivatta.
          </li>
        </ol>
        <h2>Tervetuloa mukaan parempaan taloyhtiöelämään!</h2>
        <p>
          Liity mukaan ja ota KotiPortaali™ käyttöösi jo tänään. Elämä
          taloyhtiössä ei ole koskaan ollut näin helppoa!
        </p>
        <footer>
          <hr />
          <p>© 2023 KotiPortaali™ - Kaikki oikeudet pidätetään.</p>
        </footer>
      </div>
    </>
  );
}

export default Landingpage;
