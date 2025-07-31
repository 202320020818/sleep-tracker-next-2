import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server"; //This function retrieves the currently signed-in user from Clerk on the server side
import AddNewRecord from "@/components/AddNewRecord";

export default async function HomePage() {
  //This is the main page component that renders when someone visits the homepage (/)
  const user = await currentUser(); //This returns the user object if someone is logged in, or null if not.

  if (!user) {
    //If there is no user, it means the user is not logged in
    //So we return the Guest component which is a public page for users who are not logged
    return <Guest />;
  }
  return (
    <main className="bg-gray-100 text-gray-800 front-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* left Column */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row item center sm:items-start gap-6">
            {/* Use Image */}
            <img
              src={user.imageUrl}
              alt={`${user.firstName}&#39;s profile`}
              className="w-24 h-24 rounded-full border border-gray-300 shadow-md"
            />

            {/* User details */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">
                Welcom Back, {user.firstName}
              </h2>
              <p className="text-gray-600 mb-4">
                Here&#39;s a quick overview of your recent sleep activity.on top
                of your data insights and manage your tasks efficiently!
              </p>

              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Joined :</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>

                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">
                    Last Active:
                  </span>{" "}
                  {user.lastActiveAt
                    ? new Date(user.lastActiveAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
          {/* Placeholder for AddSleepRedord */}
          <AddNewRecord />
        </div>

        {/* Right Column */}
        <div className="space-y-6">{/* Placeholder for SleepRecordList */}</div>
      </div>
      <div className="max-w-7xl mt-auto"></div>
    </main>
  );
}
