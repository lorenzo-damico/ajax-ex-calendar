// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).

// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0

$(document).ready(function () {

  // Compilo il template contenente il giorno con handlebars.
  var source = $("#calendar-template").html();
  var template = Handlebars.compile(source);

  // Stabilisco la data di inizio del calendario e la trasformo in un oggetto moment.
  var dataInizio = moment("2018-01-01");
  console.log(dataInizio);

  // Definisco il numero di giorni presenti nel mese scelto.
  var giorniMese = dataInizio.daysInMonth();
  console.log(giorniMese);

  // Definisco il mese in cui mi trovo.
  var meseCorrente = dataInizio.format("MMMM");
  console.log(meseCorrente);

  // Impostiamo un ciclo per stampare i giorni del mese di gennaio.
  for (var i = 1; i <= giorniMese; i++) {

    // Definisco l'oggetto da stampare.
    var context = {
      "giornata": i,
      "mese": meseCorrente
    };

    // Compilo e stampo il giorno.
    var html = template(context);
    $("#days").append(html);
  }




});
