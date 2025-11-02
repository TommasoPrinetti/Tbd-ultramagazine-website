import "clsx";
import { H as Header, F as Footer } from "../../../chunks/footer.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    Header($$renderer2, {
      headerVar: "ARTICLES",
      issuesData: data.issues,
      temporaryCalls: data.temporaryCalls
    });
    $$renderer2.push(`<!----> <div class="about_container vertical_flex svelte-cwls5q" id="MANIFESTO"><h1>MANIFESTO</h1> <p class="p2">TBD, acronimo di "To Be Defined", è un progetto editoriale che dal 2019
                pubblica volumi tematici e collabora con artist* per la realizzazione
                di eventi a essi collegati. Il percorso critico di ogni numero si sviluppa
                a partire da fatti d'attualità definiti zeitgeisting, notizie o icone virali
                che rivelano lo spirito culturale del tempo. Ogni fatto è sintomo e/o coadiuvante
                di tematiche più ampie, trattate sotto forma di saggi scritti e contenuti visivi.
                A partire da un focus specifico sulla contemporaneità, TBD apre quindi finestre di dialogo
                e un'interrogazione continua sull'arte e sull'estetica. Ogni pubblicazione si accompagna
                alla realizzazione di una o più opere commissionate per l'occasione, che vengono intese quale parte
                integrante della riflessione. L'intento è quello di mettere in discussione il rapporto tra artist*,
                critic* e curator*, e soprattutto tra arte e teoria, nell'ottica di definire una pratica che solleciti uno
                scambio reciproco di idee e apra molteplici possibilità interpretative, non gerarchiche e non esclusive. <br/> <br/> TBD ULTRAMAGAZINE è un progetto di Irene Sofia Comi, Camilla Compagni, Roberto Malaspina,
                Sofia Pirandello, Iacopo Prinetti e Miriam Rejas Del Pino. <br/> <br/> TBD è stato fondato da: Anna Casartelli, Camilla Compagni, Irene Sofia Comi, Eleonora Fascetta, Roberto Malaspina, Francesca Manni, Daria Miricola, Sofia Pirandello, Iacopo Prinetti, Miriam Rejas Del Pino.</p></div> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
