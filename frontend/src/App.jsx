import { useEffect, useState } from "react";
import ContactForm from "./components/contactForm.jsx";
import ContactList from "./components/contactList.jsx";
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
    const res = await fetch("https://contact-management-application-he9c.onrender.com/api/contacts");
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
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-6">
    <Alert message={alert} />

    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-indigo-700">
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
