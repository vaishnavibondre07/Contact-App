const ContactList = ({ contacts, onDelete, showAlert }) => {
  const deleteContact = async (id) => {
    try {
      await fetch(
        `https://contact-management-application-he9c.onrender.com/api/contacts/${id}`,
        { method: "DELETE" }
      );
      showAlert("Contact deleted ❌");
      onDelete();
    } catch (err) {
      showAlert("Failed to delete contact");
    }
  };

  return (
    <div className="mt-6">
      {/* 🔵 MOBILE VIEW (Cards) */}
      <div className="block md:hidden space-y-4">
        {contacts.length === 0 && (
          <p className="text-center text-gray-500">No contacts available</p>
        )}

        {contacts.map((c) => (
          <div
            key={c._id}
            className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-indigo-700">
              {c.name}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              📧 {c.email || "N/A"}
            </p>
            <p className="text-sm mt-1">📞 {c.phone}</p>

            {c.message && (
              <p className="text-sm text-gray-700 mt-2">
                💬 {c.message}
              </p>
            )}

            <button
              onClick={() => deleteContact(c._id)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete Contact
            </button>
          </div>
        ))}
      </div>

      {/* 🟢 DESKTOP VIEW (Table) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden text-sm">
          <thead className="bg-indigo-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Message</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {contacts.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-4 text-gray-500"
                >
                  No contacts available
                </td>
              </tr>
            )}

            {contacts.map((c) => (
              <tr
                key={c._id}
                className="hover:bg-gray-50 transition"
              >
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">
                  {c.email || "N/A"}
                </td>
                <td className="p-2 border">{c.phone}</td>
                <td className="p-2 border">
                  {c.message || "-"}
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => deleteContact(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;

