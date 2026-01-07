import { useState } from "react";
import classes from "./chat.module.scss";
import { userChatMock } from "entities/user";
import { chatMessagesMock } from "entities/message";
import { ChatContainer } from "widgets/chatContainer";
import { Layout } from "widgets/layout";
import { useLoadPageStatus } from "entities/pageStats";

const Chat = () => {
    const isPageLoaded = useLoadPageStatus();

    const [messages, setMessages] = useState(chatMessagesMock);

    return (
        <Layout pageStatus={isPageLoaded}>
            <main className={classes.chat}>
                <ChatContainer messages={messages} setMessages={setMessages} userInfo={userChatMock} />
            </main>
        </Layout>
    );
};

export { Chat };
