"use client";

import { useUsers } from "@/hooks/useUser";
import { useUserStore } from "@/store/useUserStore";

interface User {
  id: number;
  name: string;
}

const UserList = () => {
  const { data: users, isLoading, error } = useUsers();
  const { selectedUserId, setSelectedUser, selectedUserName } = useUserStore();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users.</p>;

  return (
    <div>
      <h2 className="text-lg font-bold">User List</h2>
      <ul>
        {users &&
          users.map((user: User) => (
            <li key={user.id}>
              {user.id % 2 == 0 ? (
                <button
                  className={`cursor-pointer p-2 text-left w-full ${selectedUserId === user.id ? "bg-gray-300 text-black" : ""}`}
                  onClick={() => setSelectedUser(user.id, user.name)}
                >
                  {user.name}
                </button>
              ) : null}
            </li>
          ))}
      </ul>
      {selectedUserId && (
        <p>
          Selected User ID: {selectedUserId}, name: {selectedUserName}
        </p>
      )}
    </div>
  );
};

export default UserList;
