import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SortBar from "./components/SortBar";
import Alert from "./components/AlertBox";

function App() {
  const [contacts, setContacts] = useState([]);
  const [sort, setSort] = useState("latest");
  const [alert, setAlert] = useState("");

  const showAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(""), 2500);
  };

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:5000/api/contacts");
    let data = await res.json();

    if (sort === "oldest") data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sort === "latest") data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === "name") data.sort((a, b) => a.name.localeCompare(b.name));

    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, [sort]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Alert message={alert} />

      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-center mb-6">
          📇 Contact Management App
        </h1>

        <ContactForm onAdd={fetchContacts} showAlert={showAlert} />
        <SortBar sort={sort} setSort={setSort} />
        <ContactList
          contacts={contacts}
          onDelete={fetchContacts}
          showAlert={showAlert}
        />
      </div>
    </div>
  );
}

export default App;
