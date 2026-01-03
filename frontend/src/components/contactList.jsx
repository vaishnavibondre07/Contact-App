const ContactList = ({ contacts, onDelete, showAlert }) => {
  const deleteContact = async (id) => {
    await fetch(`https://contact-management-application-he9c.onrender.com/api/contacts/${id}`, {
      method: "DELETE",
    });
    showAlert("Contact deleted ❌");
    onDelete();
  };

  return (
    <div>
      {/* 🔵 MOBILE VIEW (Cards) */}
      <div className="block md:hidden space-y-4">
        {contacts.map((c) => (
          <div
            key={c._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <p><span className="font-semibold">Name:</span> {c.name}</p>
            <p><span className="font-semibold">Email:</span> {c.email}</p>
            <p><span className="font-semibold">Phone:</span> {c.phone}</p>
            <p><span className="font-semibold">Message:</span> {c.message}</p>

            <button
              onClick={() => deleteContact(c._id)}
              className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}

        {contacts.length === 0 && (
          <p className="text-center text-gray-500">No contacts available</p>
        )}
      </div>

      {/* 🟢 DESKTOP VIEW (Table) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.email}</td>
                <td className="p-2 border">{c.phone}</td>
                <td className="p-2 border">{c.message}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => deleteContact(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {contacts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No contacts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
