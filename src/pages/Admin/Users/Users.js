import React, { useState, useEffect } from "react";
import { getAccesToken } from "../../../api/auth";
import { getActiveUsers } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers/";
import "./Users.scss";
function Users() {
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccesToken();

  useEffect(() => {
    getActiveUsers(token, true).then((result) => setActiveUsers(result.users));
    getActiveUsers(token, false).then((result) =>
      setInactiveUsers(result.users)
    );
    setReloadUsers(false);
  }, [token, reloadUsers]);
  return (
    <div className="users">
      <ListUsers
        activeUsers={activeUsers}
        inactiveUsers={inactiveUsers}
        setReloadUsers={setReloadUsers}
      ></ListUsers>
    </div>
  );
}

export default Users;
