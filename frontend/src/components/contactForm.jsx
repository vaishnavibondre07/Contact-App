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
    (!form.email || /\S+@\S+\.\S+/.test(form.email)) &&
    (!form.phone || /^\d{10}$/.test(form.phone));

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("https://contact-management-application-he9c.onrender.com/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", email: "", phone: "", message: "" });
    showAlert("Contact added successfully ✅");
    onAdd();
  };

  return (
    // <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" onSubmit={handleSubmit}>
    //   <input
    //     className="border p-2 rounded"
    //     placeholder="Name *"
    //     value={form.name}
    //     onChange={e => setForm({ ...form, name: e.target.value })}
    //   />
    //   <input
    //     className="border p-2 rounded"
    //     placeholder="Email"
    //     value={form.email}
    //     onChange={e => setForm({ ...form, email: e.target.value })}
    //   />
    //   <input
    //     className="border p-2 rounded md:col-span-2"
    //     placeholder="Phone *"
    //     value={form.phone}
    //     onChange={e => setForm({ ...form, phone: e.target.value })}
    //   />
    //   <textarea
    //     className="border p-2 rounded md:col-span-2"
    //     placeholder="Message"
    //     value={form.message}
    //     onChange={e => setForm({ ...form, message: e.target.value })}
    //   />

    //   <button
    //     disabled={!isValid}
    //     className={`md:col-span-2 py-2 rounded text-white font-semibold
    //     ${isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
    //   >
    //     Submit
    //   </button>
    // </form>

    <form
  onSubmit={handleSubmit}
  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
>
  <input
    className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    placeholder="Name *"
    value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
  />

  <input
    className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    placeholder="Email"
    value={form.email}
    onChange={(e) => setForm({ ...form, email: e.target.value })}
  />

  <input
    type="tel"
    maxLength={10}
    className="border rounded-lg p-3 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    placeholder="Phone *"
    value={form.phone}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "");
      if (value.length <= 10) {
        setForm({ ...form, phone: value });
      }
    }}
  />

  <textarea
    className="border rounded-lg p-3 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    placeholder="Message"
    rows="3"
    value={form.message}
    onChange={(e) => setForm({ ...form, message: e.target.value })}
  />

  <button
    disabled={!isValid}
    className={`sm:col-span-2 py-3 rounded-lg font-semibold text-white transition
    ${
      isValid
        ? "bg-indigo-600 hover:bg-indigo-700"
        : "bg-gray-400 cursor-not-allowed"
    }`}
  >
    Add Contact
  </button>
</form>

  );
};

export default ContactForm;
