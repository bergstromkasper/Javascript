# Javascript - Validering av formulär

Syftet med denna uppgift är att använda JavaScript för att validera information som skrivs in i ett webbformulär. Att validera innebär att göra något giltigt. Du ska skriva kod i som verifierar att:

* Inget av fälten Förnamn, Efternamn, E-post eller Skola får lämnas tomt
* E-postadressen måste vara korrekt formaterad
* Om ett meddelande skickas skall innehållet kontrolleras så att det inte överstiger 200 tecken.

Om formuläret innehåller något fel skall användaren upplysas om detta. Då skickas inte formuläret iväg utan användaren blir kvar på formulärsidan (index.html) och får feedback om vilka fel användaren gjort. Hur du väljer att upplysa användaren är upp till dig att bestämma (se bedömningskriterier).

**Du får inte ändra något i index.html endast lägga till html om du använder dig av en s.k modal. Du löser uppgiften genom att endast skriva kod i medföljande validate.js och klass i form.css**

## Bra att veta 

Det du behöver veta är att funktionen validateForm() i validate.js är den som triggas när man trycker på “Skicka anmälan”. Det är denna funktion du ska utgå ifrån när du skriver din kod som ska validera. Du kan även skapa andra funktioner som anropas från den. Det som är viktigt att veta att om du vill stanna kvar på sidan och ge feedback till användaren anger du event.preventDefault(). D.v.s det normala är att när ett event som submit triggas skickas man vidare, i detta fall dummy.html eftersom action="dummy.html" är ett attribut i formuläret. Om valideringen lyckas använder du dig alltså inte av event.preventDefault() för att komma vidare :-)

## Validering av e-mail med reguljärt uttryck

En e-postadress valideras mest effektivt med hjälp av reguljära uttryck (regular expressions). Då reguljära uttryck är ganska komplicerade för nybörjare får ni här den kod som behöver för att kontrollera detta. I exemplet nedan innehåller variabeln email själva värdet av e-postadressen och variabeln isValid är en boolsk variabel som får värdet true om e-postadressen är korrekt och false om den inte är korrekt: 

const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

let isValid = regex.test(email); //Där variabeln email är värdet på strängen som tas in
 
Om du är intresserad, läs mer om reguljära uttryck [här](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) eller här https://regexr.com/

## Bedömningskriterier

### Godkänd

* Din validate.js validerar enligt instruktionen med tillfredsställande resultat
* Du upplyser användaren om vad som är fel med enkel lösning exempelvis med alert-fönster som informerar eller med med att ändra i style genom att lägga till/ta bort klasser i CSS:en

### Högre betyg

* Din validate.js validerar enligt instruktionen med gott resultat
* Du upplyser användaren om vad som är fel genom att anävnda en s.k Modal [Se exempel här](MODAL https://sabe.io/tutorials/how-to-create-modal-popup-box). Du lägger till informationen i modalen beroende på vad som lyckats/misslyckats. Det är ok låna kod från modalexemplet för att integrera i din lösning.
* Din kod har en bra och tydlig struktur som är lätt att följa och förstå

Lycka till!
/Sandra

## Exempel på feedback
 
![Exempel på feedback](https://github.com/mediagymnasiet-webbutveckling/javascript-validate-form/blob/master/screen1.png)

## Exempel på feedback med modal

![Exempel på feedback med modal](https://github.com/mediagymnasiet-webbutveckling/javascript-validate-form/blob/master/screen2.png)
