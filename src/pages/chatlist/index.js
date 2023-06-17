import { getSortedChatList, getAllChatIds } from "@/utils/chatlist";

export async function getStaticProps() {
  const chatList = getAllChatIds();
  console.log(chatList);
  return {
    props: {
      chatList: JSON.parse(JSON.stringify(chatList)),
    },
  };
}

export default function ChatList({ chatList }) {
  return (
    <div>
      <h1>Chat List</h1>
      <ul>
        {chatList.map(({ id, data }) => (
          <li key={id}>
            <br />
            <small>
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}