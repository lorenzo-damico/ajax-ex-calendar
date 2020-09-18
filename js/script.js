// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).

// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0

$(document).ready(function () {

  // FUNZIONI

  // Funzione che aggiunge uno zero se il giorno è minore di 10.
  function addZero(dayValue) {
    if (dayValue < 10) {
      return "0" + dayValue
    }
    return dayValue;
  }

  // Funzione che esegue l'attribuzione della festività.
  function ifHolidays(arrayFeste) {

    // Eseguo un ciclo dell'array.
    for (var i = 0; i < arrayFeste.length; i++) {

      // Salvo in una variabile la festività.
      var festa = arrayFeste[i];

      // Seleziono il nome della festa e la data estrapolando le proprietà.
      var nomeFesta = festa.name;
      var dataFesta = festa.date;
      console.log(nomeFesta);
      console.log(dataFesta);

      // Seleziono i giorni con il data-date uguale alla data e li evidenzio aggiungendo la classe holiday.
      $("[data-date='"+ dataFesta +"']").addClass("holiday");

      // Scrivo anche il nome della festività.
      $("[data-date='"+ dataFesta +"']").append(" - " + nomeFesta);

    }
  }

  // FINE FUNZIONI


  // Compilo il template contenente il giorno con handlebars.
  var source = $("#calendar-template").html();
  var template = Handlebars.compile(source);

  // Stabilisco la data di inizio del calendario e l'indice del mese.
  var data = "2018-01-01";
  var meseIndice = 0;

  // Trasformo la data in un oggetto moment.
  var dataInizio = moment(data);
  console.log(dataInizio);

  // Definisco il numero di giorni presenti nel mese scelto.
  var giorniMese = dataInizio.daysInMonth();
  console.log(giorniMese);

  // Definisco il mese in cui mi trovo.
  var meseCorrente = dataInizio.format("MMMM");
  console.log(meseCorrente);

  // Impostiamo un ciclo per stampare i giorni del mese di gennaio.
  for (var i = 1; i <= giorniMese; i++) {

    // Definisco la variabile giorno.
    var giornoCorrente = addZero(i);

    // Definisco l'oggetto da stampare.
    var context = {
      "giornata": i,
      "mese": meseCorrente,
      "data": dataInizio.format("YYYY") + "-" + dataInizio.format("MM") + "-" + giornoCorrente
    };

    // Compilo e stampo il giorno.
    var html = template(context);
    $("#days").append(html);
  }

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
      "success": function (data, stato) {

        // Salvo in una variabile l'array che mi giunge dall'API.
        var listaFeste = data.response;
        console.log(listaFeste);

        // Eseguo la funzione isHolidays.
        ifHolidays(listaFeste);
      },
      "error": function (richiesta, stato, errore) {
        console.log(stato);
      }
    }
  );




});
