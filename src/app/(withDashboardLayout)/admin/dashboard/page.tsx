import { useUser } from "@/context/UserContext";

export default function AdminDashboard() {
    const { user } = useUser();
      const userInfo = user?.jwtPayload;
    
      return (
        <section className="p-6">
          <h1 className="text-2xl font-semibold">Welcome</h1>
          {userInfo ? (
            <div className="mt-4 space-y-2">
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>Phone:</strong> {userInfo.phone_number}</p>
              <p><strong>Address:</strong> {userInfo.address}</p>
            </div>
          ) : (
            <p className="text-gray-500">User information not available.</p>
          )}
        </section>
      );
  }