// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).

// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0

// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.

$(document).ready(function () {

  // FUNZIONI

  // 1. Funzione che stampa l'intero mese.
  function printCalendar(dataMoment) {

    // Compilo il template contenente il giorno con handlebars.
    var source = $("#calendar-template").html();
    var template = Handlebars.compile(source);

    // Definisco il numero di giorni presenti nel mese scelto.
    var giorniMese = dataMoment.daysInMonth();

    // Creiamo un clone della dataMoment.
    var dataMomentClone = dataMoment.clone();

    // Stampo il nome del mese e l'anno.
    $("header h1").text(dataMoment.format("MMMM YYYY"));

    // Impostiamo un ciclo per stampare i giorni del mese.
    for (var i = 1; i <= giorniMese; i++) {

      // Definisco l'oggetto da stampare.
      var context = {
        "giornata": dataMomentClone.format("D"),
        "mese": dataMomentClone.format("MMMM"),
        "dataCompleta": dataMomentClone.format("YYYY-MM-DD")
      };

      // Compilo e stampo il giorno.
      var html = template(context);
      $("#days").append(html);

      // Alla fine del ciclo, incremento la data di un giorno operando sul clone.
      dataMomentClone.add(1, "days");
    }
  }

  // 2. Funzione che esegue l'attribuzione della festività.
  function printHolidays(dataMoment) {

    // Trovo l'indice del mese corrente.
    var meseIndice = dataMoment.format("M") - 1;

    // Ora effettuo la chiamata ajax all'API per ottenere l'elenco delle festività.
    $.ajax(
      {
        "url": "https://flynn.boolean.careers/exercises/api/holidays",
        "data":
          {
            "year": 2018,
            "month": meseIndice
          },
        "method": "GET",
        "success": function (data) {

          // Salvo in una variabile l'array che mi giunge dall'API.
          var listaFeste = data.response;

          // Eseguo un ciclo dell'array.
          for (var i = 0; i < listaFeste.length; i++) {

            // Salvo in una variabile la festività.
            var festa = listaFeste[i];

            // Seleziono il nome della festa e la data estrapolando le proprietà.
            var nomeFesta = festa.name;
            var dataFesta = festa.date;

            // Seleziono i giorni con il data-date uguale alla data e li evidenzio aggiungendo la classe holiday.
            $(".day[data-date='"+ dataFesta +"']").addClass("holiday");

            // Scrivo anche il nome della festività.
            $(".day[data-date='"+ dataFesta +"'] .holiday-type").text("- " + nomeFesta);
          }
        },
        "error": function () {
          alert("Errore!");
        }
      }
    );
  }

  // FINE FUNZIONI



  // Stabilisco la data di inizio del calendario.
  var data = "2018-01-01";

  // Trasformo la data in un oggetto moment.
  var dataMoment = moment(data);

  // Stampo il mese usando la funzione.
  printCalendar(dataMoment);

  // Importo con la chiamata ajax e stampo nel calendario le festività usando la funzione.
  printHolidays(dataMoment);


  //EVENTI

  // 1. Cliccando su successivo, voglio passare al prossimo mese.
  $("header .next").click(
    function () {

      // Eseguo un controllo sul mese di dicembre per impedire di andare oltre.
      if (dataMoment.format("M") == "12") {
        alert("Impossibile visualizzare il mese successivo!");

      // Altrimenti, visualizzo il mese successivo.
      } else {

        // Aggiungo un mese alla data.
        dataMoment.add(1, "months");

        // Rimuovo il mese visualizzato.
        $("#days li.day").remove();

        // Stampo il nuovo mese usando la funzione.
        printCalendar(dataMoment);

        // Importo con la chiamata ajax e stampo nel calendario le festività usando la funzione.
        printHolidays(dataMoment);
      }
  });

  // 2. Cliccando su precedente, voglio tornare al precedente mese.
  $("header .prev").click(
    function () {

      // Eseguo un controllo sul mese di gennaio per impedire di andare prima.
      if (dataMoment.format("M") == "1") {
        alert("Impossibile visualizzare il mese precedente!");

      // Altrimenti, visualizzo il mese precedente.
      } else {

        // Aggiungo un mese alla data.
        dataMoment.subtract(1, "months");

        // Rimuovo il mese visualizzato.
        $("#days li.day").remove();

        // Stampo il nuovo mese usando la funzione.
        printCalendar(dataMoment);

        // Importo con la chiamata ajax e stampo nel calendario le festività usando la funzione.
        printHolidays(dataMoment);
      }
  });



});
