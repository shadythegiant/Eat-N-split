import { useState } from "react";
import { initialFriends } from "./initialFriends";

// ----------- Friends components ----------------------

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  // const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : "d"}>
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

      <button className="button" onClick={() => onSelectFriend(friend)}>
        {isSelected ? "close" : "select"}
      </button>
    </li>
  );
}

// ------------------- forms components --------------------------

function FormAddFriend({ setFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?${id}`,
      balance: 0,
      id,
    };

    setFriends(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🫂Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label> 🖼 Image Url</label>
      <input
        type="text"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  // derived state for friend expense

  const paid = bill ? bill - paidByUser : "";

  // handle submit function

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paid : -paidByUser);
  }

  // JSX
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split bill with {selectedFriend.name}</h2>
      <label> 💰 Bill Value </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />
      <label> 👱 your expense </label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
        }
      />
      <label> 💁 {selectedFriend.name}'s expense </label>
      <input type="text" disabled value={paid} />
      <label> 🙋 who is paying ? </label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

// button

function Button({ children, clickFun }) {
  return (
    <button className="button" onClick={clickFun}>
      {children}
    </button>
  );
}
// -------------------- app component ----------------------------

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // call back functions

  function handleAddFriendForm(e) {
    setShowAddFriend((show) => !show);
  }

  // function handleFriendSet

  function handleFriendSet(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  // function handleSelection

  function handleSelection(friend) {
    // setSelectedFriend(friend);

    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  // handle bill split form

  function handleSplitValue(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }

  // JSX
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectFriend={handleSelection}
          selectedFriend={selectedFriend}
        />

        {/* conditionally rendering the add friend form  */}
        {showAddFriend && <FormAddFriend setFriends={handleFriendSet} />}

        <Button clickFun={handleAddFriendForm}>
          {showAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>

      {/* conditionally rendering the bill spit form  */}

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitValue}
        />
      )}
    </div>
  );
}

export default App;
