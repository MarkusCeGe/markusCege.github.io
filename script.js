document.addEventListener("DOMContentLoaded", function () {
    // Definición de conjugaciones reales para cada idioma
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

    // Frases de ejemplo reales con sus traducciones en los tres idiomas y español
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
    let selectedLanguage = ""; // Idioma a seleccionar por el usuario al inicio
    let currentVerb = ""; // Verbo fijo por ahora (puede modificarse según el idioma)
    let currentTense = ""; // Tiempo verbal que cambia dinámicamente
    let currentPerson = ""; // Persona que cambia dinámicamente
    let currentAnswer = ""; // Almacena la respuesta correcta
    let questionCount = 0; // Contador de preguntas realizadas
    let correctCount = 0; // Contador de respuestas correctas
    let incorrectCount = 0; // Contador de respuestas incorrectas
    let totalQuestions = 1; // Número total de preguntas (N) por defecto

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
    const translationES = document.getElementById("translation-es"); // Traducción al español
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
        // Obtener el número de preguntas seleccionado por el usuario
        totalQuestions = parseInt(questionCountSelect.value);
        questionCount = 0; // Reiniciar contador de preguntas
        correctCount = 0; // Reiniciar contador de respuestas correctas
        incorrectCount = 0; // Reiniciar contador de respuestas incorrectas
        updateCounters(); // Actualizar contadores en pantalla
        questionSelection.classList.add("hidden"); // Ocultar selección de preguntas
        gameContainer.classList.remove("hidden"); // Mostrar contenedor del juego
        nextQuestion(); // Empezar la primera pregunta
    }

    // Función para generar la siguiente pregunta
    function nextQuestion() {
        if (questionCount >= totalQuestions) {
            endGame(); // Finalizar juego si se alcanza el número total de preguntas
            return;
        }

        // Seleccionar una persona y un tiempo verbal aleatorios basados en el idioma seleccionado
        currentPerson = getRandomElement(Object.keys(conjugations[selectedLanguage][currentVerb]["Presente del indicativo"]));
        currentTense = getRandomElement(Object.keys(conjugations[selectedLanguage][currentVerb]));

        // Definir la respuesta correcta basada en el verbo, la persona y el tiempo verbal
        currentAnswer = conjugations[selectedLanguage][currentVerb][currentTense][currentPerson];

        // Mostrar la pregunta al usuario en el idioma seleccionado
        questionElement.textContent = `Pregunta ${questionCount + 1} de ${totalQuestions}: Conjuga el verbo "${currentVerb}" en "${currentTense}" para la persona "${currentPerson}".`;
        feedbackElement.classList.add("hidden"); // Ocultar retroalimentación inicial
        exampleElement.classList.add("hidden"); // Ocultar ejemplo inicial
        translationContainer.classList.add("hidden"); // Ocultar traducciones iniciales
        userAnswerElement.value = ""; // Limpiar campo de respuesta
        document.body.style.backgroundColor = ""; // Resetear color de fondo
    }

    // Función para validar la respuesta del usuario
    function checkAnswer() {
        const userAnswer = userAnswerElement.value.trim().toLowerCase();

        if (userAnswer === currentAnswer) {
            document.body.style.backgroundColor = "green"; // Respuesta correcta
            feedbackElement.textContent = "¡Correcto!";
            correctCount++; // Incrementar respuestas correctas
        } else {
            document.body.style.backgroundColor = "red"; // Respuesta incorrecta
            feedbackElement.textContent = `Incorrecto. La respuesta correcta es: "${currentAnswer}".`;
            incorrectCount++; // Incrementar respuestas incorrectas
        }

        feedbackElement.classList.remove("hidden");
        showExample(); // Mostrar la frase de ejemplo y sus traducciones

        questionCount++; // Incrementar el contador de preguntas
        updateCounters(); // Actualizar contadores en pantalla

        if (questionCount < totalQuestions) {
            setTimeout(nextQuestion, 5000); // Generar la siguiente pregunta después de 5 segundos
        } else {
            setTimeout(endGame, 5000); // Finalizar el juego después de 5 segundos si se llega al límite de preguntas
        }
    }

    // Función para mostrar la frase de ejemplo y sus traducciones
    function showExample() {
        const example = exampleSentences[currentVerb][currentTense];

        // Mostrar la frase en el idioma actual
        const currentLanguageSentence = example[selectedLanguage];
        exampleElement.textContent = `Ejemplo en ${capitalizeFirstLetter(selectedLanguage)}: ${currentLanguageSentence}`;
        exampleElement.classList.remove("hidden");

        // Mostrar las traducciones en los otros dos idiomas y en español
        const [lang1, lang2] = getOtherLanguages(selectedLanguage);
        translationFRElement.textContent = `Francés: ${example.french}`;
        translationITElement.textContent = `Italiano: ${example.italian}`;
        translationDEElement.textContent = `Alemán: ${example.german}`;
        translationES.textContent = `Español: ${example.spanish}`; // Mostrar traducción en español

        // Ocultar el idioma seleccionado y mostrar solo los otros tres
        translationFRElement.style.display = selectedLanguage === "french" ? "none" : "block";
        translationITElement.style.display = selectedLanguage === "italian" ? "none" : "block";
        translationDEElement.style.display = selectedLanguage === "german" ? "none" : "block";

        translationContainer.classList.remove("hidden");
    }

    // Función para finalizar el juego
    function endGame() {
        questionElement.textContent = `¡Has completado las ${totalQuestions} preguntas!`;
        feedbackElement.classList.add("hidden"); // Ocultar feedback
        exampleElement.classList.add("hidden"); // Ocultar frase de ejemplo
        translationContainer.classList.add("hidden"); // Ocultar traducciones
        submitButton.disabled = true; // Deshabilitar el botón de Verificar
        restartButton.classList.remove("hidden"); // Mostrar botón de reinicio
        document.body.style.backgroundColor = ""; // Restablecer fondo
    }

    // Función para reiniciar el juego
    function restartGame() {
        restartButton.classList.add("hidden"); // Ocultar botón de reinicio
        languageSelection.classList.remove("hidden"); // Mostrar pantalla de selección de idioma
        gameContainer.classList.add("hidden"); // Ocultar contenedor del juego
        submitButton.disabled = false; // Habilitar el botón de Verificar
    }

    // Función para actualizar los contadores en pantalla
    function updateCounters() {
        questionCountElement.textContent = questionCount;
        correctCountElement.textContent = correctCount;
        incorrectCountElement.textContent = incorrectCount;
    }

    // Función para obtener los otros idiomas no seleccionados
    function getOtherLanguages(selectedLang) {
        const languages = ["french", "italian", "german"];
        return languages.filter(lang => lang !== selectedLang);
    }

    // Función para obtener un elemento aleatorio de un array
    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Función para capitalizar la primera letra de una palabra
    function capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    // Event listeners para la selección de idioma
    document.getElementById("btn-french").addEventListener("click", () => selectLanguage("french"));
    document.getElementById("btn-italian").addEventListener("click", () => selectLanguage("italian"));
    document.getElementById("btn-german").addEventListener("click", () => selectLanguage("german"));

    // Event listener para el botón "Iniciar Juego"
    startGameButton.addEventListener("click", startGame);

    // Event listener para el botón "Verificar"
    submitButton.addEventListener("click", checkAnswer);

    // Event listener para el botón "Reiniciar Juego"
    restartButton.addEventListener("click", restartGame);
});
