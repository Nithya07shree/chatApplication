import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore"; // Import the Zustand store
import { useAppStore } from "../store/useAppStore";
let recognition;

export function webspeech() {
  if (!recognition) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (
      !("SpeechRecognition" in window) &&
      !("webkitSpeechRecognition" in window)
    ) {
      alert("Your browser does not support the Web Speech API.");
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false; 
    recognition.maxAlternatives = 1; 

    recognition.onstart = () => {
      console.log("Speech recognition service has started.");
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript; // Get the latest transcript
      console.log(`Result received: ${transcript}`);
      const cmd = transcript.toLowerCase();

      //handle transcript
      if (cmd === "open settings") {
        window.location.href = "/settings";
      } else if (cmd === "open profile") {
        window.location.href = "/profile";
      } else if (cmd === "open chats") {
        window.location.href = "/";
      } else if (cmd === "log out" || cmd === "logout") {
        console.log("logging out...")
        const {logout} = useAuthStore.getState();
        try{
          await logout();
          console.log("Logged out successfully...");
        }catch(err){
          console.log("Error during logout: ",err);
        }
      }else if(transcript.startsWith("send")) {
        const match = transcript.match(/send (.+)/);
        if(match){
          const message = match[1];
          const user = useChatStore.getState().selectedUser;
          if(user){
            console.log("recipient is ",user.fullName);
            sendMsg(user.fullName, message);
          }else{
            console.log("Error")
          }
          
          // const recipient = user.fullName;
          // console.log(`Sending message to: ${recipient}, Text: ${message}`);
        }
      } else if (transcript.startsWith("text")) {
        const match = transcript.match(/text (\w+) saying (.+)/);
        if (match) {
          const recipient = match[1]; // Extract recipient username
          const message = match[2]; // Extract message text

          console.log(`Sending message to: ${recipient}, Text: ${message}`);

          sendMsg(recipient, message);
        } else {
          console.log("Invalid send message command format.");
        }
      } else if (transcript.startsWith("open chat with")) {
        const match = transcript.match(/open chat with (\w+)/);
        if (match) {
          const recipient = match[1]; //extract recipient username
          console.log(`opening chat with : ${recipient}`);
          openChatWithUser(recipient);
        }
      } else if (cmd === "create account" || cmd === "signup" || cmd === "sign up"){
        window.location.href = "/signup";
      }
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: " + event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition service has stopped.");
      // recognition.start();
      setTimeout(() => {
        recognition.start();
      }, 1000);
    };
  }

  // Start recognition if not already started
  try {
    recognition.start();
  } catch (error) {
    console.error("Recognition start error:", error);
  }
}

export function stopWebspeech() {
  if (recognition) {
    recognition.onend = null; // Prevent restarting
    recognition.stop();
    console.log("Speech recognition manually stopped.");
  }
}

const openChatWithUser = async (username) => {
  try {
    // Get the list of users from the chat store (assuming it has been fetched already)
    const users = useChatStore.getState().users;

    // Find the user based on the username
    const selectedUser = users.find(
      (user) => user.fullName.toLowerCase() === username.toLowerCase()
    );

    if (selectedUser) {
      // Set the selected user in the chat store
      useChatStore.getState().setSelectedUser(selectedUser);

      // Fetch the messages for the selected user
      await useChatStore.getState().getMessages(selectedUser._id);

      // Optionally, scroll to the latest message or focus on the chat
      console.log(`Chat opened with ${selectedUser.fullName}`);
    } else {
      console.log(`User ${username} not found`);
    }
  } catch (error) {
    console.error("Error in opening chat:", error);
  }
};

const sendMsg = async (recipient, message) => {
  try{
    // Call Zustand store to send the message
    const { getUsers, sendMessage, setSelectedUser, users } = useChatStore.getState();
    // Fetch users if not already loaded
    await getUsers();

    const recipientUser = useChatStore
      .getState()
      .users.find((user) => user.fullName === recipient);

    if (recipientUser) {
      setSelectedUser(recipientUser);
      // Send the message
      await sendMessage({
        text: message,
        recipientId: recipientUser._id, // Pass the recipient's ID explicitly
      });
    } else {
      console.log(`User with username ${recipient} not found`);
    }
  }catch(err){
    console.log("Error sending message: ",err);
  }
}


