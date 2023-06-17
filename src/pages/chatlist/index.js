import { getSortedChatList, getAllChatIds } from "@/utils/chatlist";

export async function getStaticProps() {
  const chatList = await getSortedChatList();
  return {
    props: {
      chatList,
    },
  };
}

export default function ChatList({ chatList }) {
  return (
    <div>
      <h1>Chat List</h1>
      <ul>
        {chatList.map((chat) => (
          <li key={chat.id}>{chat.id}</li>
        ))}
      </ul>
    </div>
  );
}