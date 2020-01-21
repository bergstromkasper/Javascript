//---------------------------------------------
// Börjar i validateForm när knappen är klickad och testar i funktionen 'isInputValid' om alla
// fält är korreka, om de är korrekta skickas formuläret in
// isInputValid ger tillbaka true eller false och de som är false sparas och skickas till
// "formFeedback" där den ändrar border på fältet till rött och lägger till text om vad
// som är fel i modalen.
// Om du sedan rättar till fältet så blir färgen återställd till det vanliga och när allting är rätt
// så skickas formuläret in.
//--------------------------------------------

function formFeedback(Name, Last, Email, School, Message) {
  // function som aktiveras om alla fälten i formen inte är rätt
  // Alla är bool så antingen true eller false.
  // Ger alla fält som inte är valida klassen "wrong" som finns i index.html annars
  // så gå tillbaka till det som det var från början
  // Gömmer eller display block beroende på om fältet är valid eller inte

  // Styling om det är fel på det fältet
  function wrongStyling(x, y) {
    console.log(x);
    document.getElementById(x).className += " wrong";
    document.getElementById(y).style.display = "block";
  }
  // Styling om det är rätt efter (behövs bara om fältet har varit fel tidigare)
  function defaultStyling(x, y) {
    document.getElementById(x).className = "pure-u-23-24";
    document.getElementById(y).style.display = "none";
  }
  //Firstname
  if (Name == false) {
    wrongStyling("firstname", "firstError");
  } else {
    defaultStyling("firstname", "firstError");
  }
  //Lastname
  if (Last == false) {
    wrongStyling("lastname", "lastError");
  } else {
    defaultStyling("lastname", "lastError");
  }
  //Email
  if (Email == false) {
    wrongStyling("email", "emailError");
  } else {
    defaultStyling("email", "emailError");
  }
  //School
  if (School == false) {
    wrongStyling("skola", "schoolError");
  } else {
    defaultStyling("skola", "schoolError");
  }
  //Message
  if (Message == false) {
    wrongStyling("message", "otherError");
  } else {
    defaultStyling("message", "otherError");
  }

  // Modal - meddelandet i modalen läggs till ovanför
  var modal = document.querySelector(".modal");
  // om du klickar på stäng knappen
  var closeButton = document.querySelector(".close-button");
  // Visa modal
  function enableModal() {
    modal.classList += " show-modal";
  }
  // Stäng modal
  function closeModal() {
    modal.classList = "modal";
  }
  enableModal();
  closeButton.addEventListener("click", closeModal);
}

// Funktion för att kolla om Förnamn Efternamn och skola är tomma. Email behövs inte pga regex
function isInputValid(x) {
  // Testar för namn/skola längre än 1 bokstav och inte har nummer i sig
  const regexNameOrLast = /^[a-zA-ZåäöÅÄÖ-]+$/;
  if (x.length >= 2 && regexNameOrLast.test(x)) {
    return true;
  } else {
    return false;
  }
}

//Denna funktion körs när 'Skicka anmälan'-knappen klickas
function validateForm(event) {
  // Läser alla input i formen och sparar
  let isAllValid;
  let Name = document.forms["registration_form"]["firstname"].value;
  let Last = document.forms["registration_form"]["lastname"].value;
  let School = document.forms["registration_form"]["organisation"].value;
  let Message = document.forms["registration_form"]["message"].value;
  let email = document.getElementById("email").value;

  // Testar mail seperat från de andra eftersom den behöver andra saker
  const regexEmail = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
  let isEmailValid = regexEmail.test(email);

  // Testar message att det är mindre än 200 tecken
  let isMessageValid;
  if (Message.length != 0 && Message.length <= 200) {
    isMessageValid = true;
  } else {
    isMessageValid = false;
  }

  //Skickar värderna till isInputValid som skickar tillbaka antingen true eller false
  let isNameValid = isInputValid(Name);
  let isLastValid = isInputValid(Last);
  let isSchoolValid = isInputValid(School);
  //-------------------------------------------------------------------------//

  // Testar om alla fält är korrekta och lägger ihop allt till isAllvalid (Mest bara för att det är lättare att läsa)
  if (
    isEmailValid &&
    isNameValid &&
    isLastValid &&
    isSchoolValid &&
    isMessageValid
  ) {
    isAllValid = true;
  } else {
    isAllValid = false;
  }
  // Om alla form-värderna är rätt skrivna så skickar den in formen annars stannar den på sidan
  if (isAllValid) {
  } else {
    event.preventDefault();
    formFeedback(
      isNameValid,
      isLastValid,
      isEmailValid,
      isSchoolValid,
      isMessageValid
    );
  }
}
// Hämtar dom-variabeln för formuläret
const form = document.querySelector("form");
// Lyssnar på submit-event för formuläret. Om knappen 'Skicka anmälan' klickas körs funktionen validateForm()
form.addEventListener("submit", validateForm);
