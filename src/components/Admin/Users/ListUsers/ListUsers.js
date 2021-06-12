import React, { useEffect, useState } from "react";
import { Switch, Avatar, List, Button } from "antd";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Modal from "../../../Modal/";
import EditUserForm from "../../../Admin/Users/EditUser";
import { getAvatarApi } from "../../../../api/user";
import "./ListUsers.scss";
function ListUsers(props) {
  const { activeUsers, inactiveUsers } = props;
  const [viewUsers, setViewUsers] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
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
        <ShowActiveUsers
          activeUsers={activeUsers}
          setIsVisible={setIsVisible}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
        ></ShowActiveUsers>
      ) : (
        <ShowInactiveUsers inactiveUsers={inactiveUsers}></ShowInactiveUsers>
      )}
      <Modal
        title={modalTitle}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

const ShowActiveUsers = (props) => {
  const { activeUsers, setIsVisible, setModalTitle, setModalContent } = props;
  const editUser = (user) => {
    setIsVisible(true);
    setModalTitle(`Editar usuario`);
    setModalContent(<EditUserForm user={user} />);
  };
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={activeUsers}
      renderItem={(user) => <ShowActiveUser user={user} editUser={editUser} />}
    />
  );
};

const ShowActiveUser = (props) => {
  const { user, editUser } = props;
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);
  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          onClick={() => {
            editUser(user);
          }}
        >
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
        avatar={<Avatar src={avatar && avatar} />}
        title={`${user.name ? user.name : "..."}
            ${user.lastname ? user.lastname : "..."}`}
        description={user.email}
      />
    </List.Item>
  );
};

const ShowInactiveUsers = (props) => {
  const { inactiveUsers } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={inactiveUsers}
      renderItem={(user) => <ShowInactiveUser user={user} />}
    />
  );
};

const ShowInactiveUser = (props) => {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);
  return (
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
  );
};
export default ListUsers;
