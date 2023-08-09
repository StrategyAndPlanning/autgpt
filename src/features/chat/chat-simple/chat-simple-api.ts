import { userHashedId } from "@/features/auth/helpers";
import { CosmosDBChatMessageHistory } from "@/features/langchain/memory/cosmosdb/cosmosdb";
import { LangChainStream, StreamingTextResponse } from "ai";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferWindowMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { initAndGuardChatSession } from "../chat-services/chat-thread-service";
import { PromptGPTProps } from "../chat-services/models";

export const ChatSimple = async (props: PromptGPTProps) => {
  const { lastHumanMessage, id } = await initAndGuardChatSession(props);

  const { stream, handlers } = LangChainStream();

  const userId = await userHashedId();

  const chat = new ChatOpenAI({
    temperature: 0,
    streaming: true,
  });

  const memory = new BufferWindowMemory({
    k: 100,
    returnMessages: true,
    memoryKey: "history",
    chatHistory: new CosmosDBChatMessageHistory({
      sessionId: id,
      userId: userId,
      config: {
        db: process.env.AZURE_COSMOSDB_DB_NAME,
        container: process.env.AZURE_COSMOSDB_CONTAINER_NAME,
        endpoint: process.env.AZURE_COSMOSDB_URI,
        key: process.env.AZURE_COSMOSDB_KEY,
        partitionKey: "id",
      },
    }),
  });

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `-You are an AI Assistant called AUTGPT at Auckland University of Technology in Auckland, New Zealand. 
      - You can answer prompts about the university or anything else. 
      - You can partially respond in Te Reo but when responding in English please repsond in NZ English. 
      - Please respond in a very encouraging manner. 
      - In your first response to any prompt please mention that you're still in preview and you may produce inaccurate information about people, places, or facts`
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);
  const chain = new ConversationChain({
    llm: chat,
    memory,
    prompt: chatPrompt,
  });

  chain.call({ input: lastHumanMessage.content }, [handlers]);

  return new StreamingTextResponse(stream);
};
