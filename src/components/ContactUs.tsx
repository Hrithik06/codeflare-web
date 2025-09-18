const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="mb-4">
        We're here to help! If you have any questions, concerns, or feedback,
        please feel free to reach out to us using the details below:
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Email</h2>
      <p className="mb-4">
        <a
          href="mailto:support@example.com"
          className="text-blue-600 underline"
        >
          support@example.com
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Phone</h2>
      <p className="mb-4">+91-XXXXXXXXXX</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Address</h2>
      <p className="mb-4">
        123, Main Street, Your City, Your State, India - 123456
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Business Hours</h2>
      <p className="mb-4">Monday - Friday: 9:00 AM - 6:00 PM</p>

      <p>
        We usually respond to all queries within 1-2 business days. For urgent
        queries, please use the contact number above.
      </p>
    </div>
  );
};

export default ContactUs;
