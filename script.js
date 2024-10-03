document.addEventListener("DOMContentLoaded", function () {
    // Definición de conjugaciones para cada idioma
    const conjugations = {
        french: {
            "être": {
                "Presente del indicativo": { "yo": "je suis", "tú": "tu es", "él/ella": "il/elle est", "nosotros": "nous sommes", "vosotros": "vous êtes", "ellos": "ils/elles sont" },
                "Pasado compuesto": { "yo": "j'ai été", "tú": "tu as été", "él/ella": "il/elle a été", "nosotros": "nous avons été", "vosotros": "vous avez été", "ellos": "ils/elles ont été" }
            }
        },
        italian: {
            "essere": {
                "Presente indicativo": { "yo": "sono", "tú": "sei", "él/ella": "è", "nosotros": "siamo", "vosotros": "siete", "ellos": "sono" },
                "Pasado próximo": { "yo": "sono stato", "tú": "sei stato", "él/ella": "è stato", "nosotros": "siamo stati", "vosotros": "siete stati", "ellos": "sono stati" }
            }
        },
        german: {
            "sein": {
                "Presente": { "yo": "bin", "tú": "bist", "él/ella": "ist", "nosotros": "sind", "vosotros": "seid", "ellos": "sind" },
                "Perfecto": { "yo": "bin gewesen", "tú": "bist gewesen", "él/ella": "ist gewesen", "nosotros": "sind gewesen", "vosotros": "seid gewesen", "ellos": "sind gewesen" }
            }
        }
    };

    // Frases de ejemplo con traducciones en los tres idiomas y español
    const exampleSentences = {
        "être": {
            "Presente del indicativo": {
                french: "Je suis content d'être ici.",
                italian: "Io sono felice di essere qui.",
                german: "Ich bin froh, hier zu sein.",
                spanish: "Yo estoy contento de estar aquí."
            },
            "Pasado compuesto": {
                french: "J'ai été heureux.",
                italian: "Sono stato felice.",
                german: "Ich bin glücklich gewesen.",
                spanish: "Yo he sido feliz."
            }
        },
        "essere": {
            "Presente indicativo": {
                french: "Je suis content d'être ici.",
                italian: "Io sono felice di essere qui.",
                german: "Ich bin froh, hier zu sein.",
                spanish: "Yo estoy contento de estar aquí."
            },
            "Pasado próximo": {
                french: "J'ai été heureux.",
                italian: "Sono stato felice.",
                german: "Ich bin glücklich gewesen.",
                spanish: "Yo he sido feliz."
            }
        },
        "sein": {
            "Presente": {
                french: "Je suis content d'être ici.",
                italian: "Io sono felice di essere qui.",
                german: "Ich bin froh, hier zu sein.",
                spanish: "Yo estoy contento de estar aquí."
            },
            "Perfecto": {
                french: "J'ai été heureux.",
                italian: "Sono stato felice.",
                german: "Ich bin glücklich gewesen.",
                spanish: "Yo he sido feliz."
            }
        }
    };

    // Variables de control de juego
    let selectedLanguage = ""; // Idioma seleccionado
    let currentVerb = ""; // Verbo a utilizar según el idioma
    let currentTense = ""; // Tiempo verbal dinámico
    let currentPerson = ""; // Persona dinámica
    let currentAnswer = ""; // Respuesta correcta
    let questionCount = 0; // Contador de preguntas
    let correctCount = 0; // Contador de respuestas correctas
    let incorrectCount = 0; // Contador de respuestas incorrectas
    let totalQuestions = 1; // Número total de preguntas

    // Referencias a elementos HTML
    const languageSelection = document.getElementById("language-selection");
    const questionSelection = document.getElementById("question-selection");
    const questionCountSelect = document.getElementById("question-count-select");
    const gameContainer = document.getElementById("game-container");
    const questionElement = document.getElementById("question");
    const userAnswerElement = document.getElementById("user-answer");
    const feedbackElement = document.getElementById("feedback");
    const exampleElement = document.getElementById("example-sentence");
    const translationContainer = document.getElementById("translation-container");
    const translationFRElement = document.getElementById("translation-fr");
    const translationITElement = document.getElementById("translation-it");
    const translationDEElement = document.getElementById("translation-de");
    const translationES = document.getElementById("translation-es");
    const submitButton = document.getElementById("btn-submit");
    const questionCountElement = document.getElementById("question-count");
    const correctCountElement = document.getElementById("correct-count");
    const incorrectCountElement = document.getElementById("incorrect-count");
    const restartButton = document.getElementById("btn-restart");
    const startGameButton = document.getElementById("btn-start-game");

    // Función para seleccionar el idioma
    function selectLanguage(language) {
        selectedLanguage = language;
        languageSelection.classList.add("hidden"); // Ocultar selección de idioma
        questionSelection.classList.remove("hidden"); // Mostrar selección de número de preguntas

        // Definir el verbo para cada idioma
        if (selectedLanguage === "french") currentVerb = "être";
        if (selectedLanguage === "italian") currentVerb = "essere";
        if (selectedLanguage === "german") currentVerb = "sein";
    }

    // Función para iniciar el juego
    function startGame() {
        totalQuestions = parseInt(questionCountSelect.value);
        questionCount = 0;
        correctCount = 0;
        incorrectCount = 0;
        updateCounters();
        questionSelection.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        nextQuestion(); // Iniciar con la primera pregunta
    }

    // Función para generar la siguiente pregunta
    function nextQuestion() {
        if (questionCount >= totalQuestions) {
            endGame(); // Finalizar si se completan las preguntas
            return;
        }

        // Seleccionar aleatoriamente la persona y el tiempo verbal según el idioma
        const tenses = Object.keys(conjugations[selectedLanguage][currentVerb]); // Tiempos verbales
        const persons = Object.keys(conjugations[selectedLanguage][currentVerb][tenses[0]]); // Personas en el primer tiempo verbal disponible

        currentTense = getRandomElement(tenses); // Selección aleatoria del tiempo verbal
        currentPerson = getRandomElement(persons); // Selección aleatoria de la persona

        // Definir la respuesta correcta según el idioma seleccionado
        currentAnswer = conjugations[selectedLanguage][currentVerb][currentTense][currentPerson];

        // Mostrar la pregunta al usuario
        questionElement.textContent = `Pregunta ${questionCount + 1} de ${totalQuestions}: Conjuga el verbo "${currentVerb}" en "${currentTense}" para la persona "${currentPerson}".`;
        feedbackElement.classList.add("hidden"); // Ocultar retroalimentación
        exampleElement.classList.add("hidden"); // Ocultar ejemplo
        translationContainer.classList.add("hidden"); // Ocultar traducciones
        userAnswerElement.value = ""; // Limpiar respuesta
        document.body.style.backgroundColor = ""; // Resetear color de fondo
    }

    // Función para validar la respuesta
    function checkAnswer() {
        const userAnswer = userAnswerElement.value.trim().toLowerCase();

        if (userAnswer === currentAnswer) {
            document.body.style.backgroundColor = "green"; // Respuesta correcta
            feedbackElement.textContent = "¡Correcto!";
            correctCount++;
        } else {
            document.body.style.backgroundColor = "red"; // Respuesta incorrecta
            feedbackElement.textContent = `Incorrecto. La respuesta correcta es: "${currentAnswer}".`;
            incorrectCount++;
        }

        feedbackElement.classList.remove("hidden");
        showExample(); // Mostrar la frase de ejemplo y sus traducciones

        questionCount++;
        updateCounters();

        if (questionCount < totalQuestions) {
            setTimeout(nextQuestion, 5000); // Esperar y mostrar la siguiente pregunta
        } else {
            setTimeout(endGame, 5000); // Finalizar el juego después de la última pregunta
        }
    }

    // Función para mostrar la frase de ejemplo
    function showExample() {
        const example = exampleSentences[currentVerb][currentTense];
        const currentLanguageSentence = example[selectedLanguage];

        // Mostrar frase en el idioma actual
        exampleElement.textContent = `Ejemplo en ${capitalizeFirstLetter(selectedLanguage)}: ${currentLanguageSentence}`;
        exampleElement.classList.remove("hidden");

        // Mostrar las traducciones en los otros dos idiomas y en español
        const [lang1, lang2] = getOtherLanguages(selectedLanguage);
        translationFRElement.textContent = `Francés: ${example.french}`;
        translationITElement.textContent = `Italiano: ${example.italian}`;
        translationDEElement.textContent = `Alemán: ${example.german}`;
        translationES.textContent = `Español: ${example.spanish}`;

        translationFRElement.style.display = selectedLanguage === "french" ? "none" : "block";
        translationITElement.style.display = selectedLanguage === "italian" ? "none" : "block";
        translationDEElement.style.display = selectedLanguage === "german" ? "none" : "block";

        translationContainer.classList.remove("hidden");
    }

    // Función para finalizar el juego
    function endGame() {
        questionElement.textContent = `¡Has completado las ${totalQuestions} preguntas!`;
        feedbackElement.classList.add("hidden");
        exampleElement.classList.add("hidden");
        translationContainer.classList.add("hidden");
        submitButton.disabled = true; // Deshabilitar botón de verificar
        restartButton.classList.remove("hidden");
        document.body.style.backgroundColor = ""; // Restablecer fondo
    }

    // Función para reiniciar el juego
    function restartGame() {
        restartButton.classList.add("hidden");
        languageSelection.classList.remove("hidden");
        gameContainer.classList.add("hidden");
        submitButton.disabled = false;
    }

    // Función para actualizar contadores
    function updateCounters() {
        questionCountElement.textContent = questionCount;
        correctCountElement.textContent = correctCount;
        incorrectCountElement.textContent = incorrectCount;
    }

    // Obtener otros idiomas no seleccionados
    function getOtherLanguages(selectedLang) {
        const languages = ["french", "italian", "german"];
        return languages.filter(lang => lang !== selectedLang);
    }

    // Obtener un elemento aleatorio
    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Capitalizar la primera letra
    function capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    // Event listeners para selección de idioma
    document.getElementById("btn-french").addEventListener("click", () => selectLanguage("french"));
    document.getElementById("btn-italian").addEventListener("click", () => selectLanguage("italian"));
    document.getElementById("btn-german").addEventListener("click", () => selectLanguage("german"));

    // Event listener para iniciar juego
    startGameButton.addEventListener("click", startGame);

    // Event listener para verificar respuesta
    submitButton.addEventListener("click", checkAnswer);

    // Event listener para reiniciar juego
    restartButton.addEventListener("click", restartGame);
});
