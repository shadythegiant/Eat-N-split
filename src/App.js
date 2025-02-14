import { initialFriends } from "./initialFriends";

// ----------- Friends components ----------------------

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          {" "}
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {" "}
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} Are Even</p>}

      <Button>select</Button>
    </li>
  );
}

// ------------------- forms components --------------------------

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🫂Friend Name</label>
      <input type="text" />
      <label> 🖼 Image Url</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split bill with X</h2>
      <label> 💰 Bill Value </label>
      <input type="text" />
      <label> 👱 your expense </label>
      <input type="text" />
      <label> 💁 X's expense </label>
      <input type="text" disabled />
      <label> 🙋 who is paying ? </label>
      <select>
        <option value="">You</option>
        <option value="">friend</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

// button

function Button({ children }) {
  return <button className="button">{children}</button>;
}
// -------------------- app component ----------------------------

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

export default App;
