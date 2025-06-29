"use client"; //This tells Next.js that the component uses client-side logic (e.g., window.location.href, form interaction).

const ContactPage = () => {
  //Creates a functional React component named ContactPage
  return (
    <div className="font-sans bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-8 bg-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Contact SleepTracker
        </h1>
        <p className="text-lg md:text-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Have questions or need help? Get in touch with us!
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-8 bg-white">
        {" "}
        {/* py-16 px-8: padding top/bottom and sides */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Get in Touch
        </h2>{" "}
        {/* mb-8: adds spacing below heading. */}
        <form
          className="max-w-3xl mx-auto space-y-6"
          //max-w-3xl: limits the form width to make it centered and tidy.
          //mx-auto: horizontally center the form.
          //space-y-6: vertical spacing between form fields.

          onSubmit={(e) => {
            e.preventDefault(); // prevents the page from refreshing
            const name = (document.getElementById("name") as HTMLInputElement)
              ?.value;
            const email = (document.getElementById("email") as HTMLInputElement)
              ?.value;
            const message = (
              document.getElementById("message") as HTMLTextAreaElement
            )?.value;
            const mailtoLink = `mailto:harshanaeshan2002@outlook.com?subject=Message from ${name}&body=Email: ${email}%0D%0A%0D%0A${message}`;
            {
              /*?subject=Message from Eshan 
              &body=Email: ${email}%0D%0A%0D%0A${message} --> This defines the body content of the email.

              Email: ${email}: inserts the user’s email address.
              %0D%0A: this is a newline in URL encoding.
              %0D = Carriage Return (\r)
              %0A = Line Feed (\n)
              So %0D%0A%0D%0A = Two line breaks (empty line)
              ${message}: inserts the actual user message

              mailto:harshanaeshan2002@outlook.com?subject=Message from Eshan&body=Email: eshan@example.com
              I love your app

              */
            }

            // Redirects to user's email client
            window.location.href = mailtoLink;
          }}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-md font-medium shadow-md cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 px-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">
          Contact Information
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-600">harshanaeshan2023@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p className="text-gray-600">+94 76154...</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Address</h3>
            <p className="text-gray-600">Ambalangoda, Sri Lanka</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
