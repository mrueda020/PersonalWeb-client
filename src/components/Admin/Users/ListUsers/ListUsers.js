import React, { useState } from "react";
import { Switch, Avatar, List, Button } from "antd";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./ListUsers.scss";
function ListUsers(props) {
  const { activeUsers, inactiveUsers } = props;
  const [viewUsers, setViewUsers] = useState(true);
  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsers(!viewUsers)}
        ></Switch>
        <span>{viewUsers ? "Usuarios Activos" : "Usuarios inactivos"}</span>
      </div>

      {viewUsers ? (
        <ShowActiveUsers activeUsers={activeUsers}></ShowActiveUsers>
      ) : (
        <ShowInactiveUsers inactiveUsers={inactiveUsers}></ShowInactiveUsers>
      )}
    </div>
  );
}

const ShowActiveUsers = (props) => {
  const { activeUsers } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={activeUsers}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button type="primary">
              <EditOutlined />
            </Button>,
            <Button type="danger">
              <StopOutlined />
            </Button>,
            <Button type="danger">
              <DeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={`${user.name ? user.name : "..."}
            ${user.lastname ? user.lastname : "..."}`}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
};
const ShowInactiveUsers = (props) => {
  const { inactiveUsers } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={inactiveUsers}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button type="primary">
              <CheckOutlined />
            </Button>,

            <Button type="danger">
              <DeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={`${user.name ? user.name : "..."}
            ${user.lastname ? user.lastname : "..."}`}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
};

export default ListUsers;
