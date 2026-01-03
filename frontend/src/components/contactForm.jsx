import { useState } from "react";

const ContactForm = ({ onAdd, showAlert }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const isValid =
    form.name.trim() &&
    form.phone.trim() &&
    (!form.email || /\S+@\S+\.\S+/.test(form.email));

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", email: "", phone: "", message: "" });
    showAlert("Contact added successfully ✅");
    onAdd();
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" onSubmit={handleSubmit}>
      <input
        className="border p-2 rounded"
        placeholder="Name *"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border p-2 rounded"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="border p-2 rounded md:col-span-2"
        placeholder="Phone *"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />
      <textarea
        className="border p-2 rounded md:col-span-2"
        placeholder="Message"
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
      />

      <button
        disabled={!isValid}
        className={`md:col-span-2 py-2 rounded text-white font-semibold
        ${isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
