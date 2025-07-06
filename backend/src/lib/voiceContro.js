// text to speech using Sarvam API
function textToSpeech(text) {
    const apiKey = "90813def-f791-4cdd-94b2-3bdc28d70e46";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Subscription-Key": apiKey,
      },
      body: JSON.stringify({
        inputs: [text], // Use the dynamic text here
        target_language_code: "kn-IN",
        speaker: "meera",
        pitch: 0,
        pace: 1.2,
        loudness: 1.5,
        speech_sample_rate: 8000,
        enable_preprocessing: true,
        model: "bulbul:v1",
      }),
    };
    fetch("https://api.sarvam.ai/text-to-speech", options)
      .then((response) => response.json())
      .then((response) => {
        // Assuming 'resopnse.audios' contains the raw audio data in binary or base64 format
        const audioData = response.audios; // Adjust according to the actual data format
  
        // Convert base64 to Blob (if your data is in base64)
        const byteCharacters = atob(audioData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "audio/wav" }); // Change the type as necessary
  
        // Create an object URL for the Blob
        const audioUrl = URL.createObjectURL(blob);
  
        // Create an audio element and play the audio
        const audio = new Audio(audioUrl);
        audio.play();
      })
      .catch((err) => console.error(err));
}

//web speech api for speech to text
function webspeech() {
    document.getElementById('youSaid').innerText = " You Said: Listening...";
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support the Web Speech API.');
    } else {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'en-US'; // Set language for recognition
        recognition.interimResults = false; // Get final results only
        recognition.maxAlternatives = 1; // Maximum number of alternatives returned

        recognition.onstart = () => {
            console.log('Speech recognition service has started.');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript; // Get the transcript of the first result
            console.log(`Result received: ${transcript}`);
            // Check if the transcript matches the command to go to the form page
            // if (transcript.toLowerCase() === "go to form") {
            //     window.location.href = "form.html"; // Navigate to form.html
            //     document.getElementById('youSaid').innerText = "You Said: "+ transcript;
            // }
        };

        recognition.onerror = (event) => {
            console.error('Error occurred in recognition: ' + event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition service has stopped.');
            recognition.start(); // Restart recognition to listen again
        };

        // Start listening automatically on page load
        recognition.start();
    }
}