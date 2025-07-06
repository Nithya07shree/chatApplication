import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { AlignJustify } from "lucide-react";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
              {/* Commands Section */}
      <div className="absolute right-4 top-24 w-85">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Available Voice Commands:</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <span className="font-medium">"Open Profile":</span> Navigate to your profile page.
            </li>
            <li>
              <span className="font-medium">"Open Settings":</span> Go to the settings page.
            </li>
            <li>
              <span className="font-medium">"Log out":</span> Log out from your account.
            </li>
            <li>
              <span className="font-medium">"Open chats":</span> Navigate back to the home page.
            </li>
            <li>
              <span className="font-medium">"Open chat with (user)":</span> Open chat with a particular user.
            </li>
            <li>
              <span className="font-medium">"Send (message)":</span> Send message to the user opened.
            </li>
            <li>
              <span className="font-medium">"Text (user) saying (yourMessage)":</span> Send a message to user.
            </li>

          </ul>
        </div>
      </div>
      </div>
    </div>
  );
};
export default HomePage;
