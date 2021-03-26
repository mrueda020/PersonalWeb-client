import React, { useState, useEffect } from "react";
import { getAccesToken } from "../../../api/auth";
import { getActiveUsers } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers/";
import "./Users.scss";
function Users() {
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const token = getAccesToken();

  useEffect(() => {
    getActiveUsers(token, true).then((result) => setActiveUsers(result.users));
    getActiveUsers(token, false).then((result) =>
      setInactiveUsers(result.users)
    );
  }, [token]);
  return (
    <div className="users">
      <ListUsers
        activeUsers={activeUsers}
        inactiveUsers={inactiveUsers}
      ></ListUsers>
    </div>
  );
}

export default Users;
