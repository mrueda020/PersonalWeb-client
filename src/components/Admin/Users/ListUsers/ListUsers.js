import React, { useEffect, useState } from "react";
import { Switch, Avatar, List, Button, notification } from "antd";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Modal from "../../../Modal/";
import EditUserForm from "../../../Admin/Users/EditUser";
import { getAvatarApi, activateUserApi } from "../../../../api/user";
import { getAccesToken } from "../../../../api/auth";
import "./ListUsers.scss";
function ListUsers(props) {
  const { activeUsers, inactiveUsers, setReloadUsers } = props;
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
          setReloadUsers={setReloadUsers}
        ></ShowActiveUsers>
      ) : (
        <ShowInactiveUsers
          inactiveUsers={inactiveUsers}
          setReloadUsers={setReloadUsers}
        ></ShowInactiveUsers>
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
  const {
    activeUsers,
    setIsVisible,
    setModalTitle,
    setModalContent,
    setReloadUsers,
  } = props;

  const editUser = (user) => {
    setIsVisible(true);
    setModalTitle(`Editar usuario`);
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisible={setIsVisible}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={activeUsers}
      renderItem={(user) => (
        <ShowActiveUser
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
};

const ShowActiveUser = (props) => {
  const { user, editUser, setReloadUsers } = props;
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

  const deactivateUser = () => {
    const token = getAccesToken();
    activateUserApi(token, user._id, false)
      .then((response) => {
        notification["success"]({ message: response });
        setReloadUsers(true);
      })
      .catch((err) => notification["error"]({ message: err }));
  };

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
        <Button type="danger" onClick={deactivateUser}>
          <StopOutlined />
        </Button>,
        <Button type="danger">
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar src={avatar && avatar} icon={!avatar && <UserOutlined />} />
        }
        title={`${user.name ? user.name : "..."}
            ${user.lastname ? user.lastname : "..."}`}
        description={user.email}
      />
    </List.Item>
  );
};

const ShowInactiveUsers = (props) => {
  const { inactiveUsers, setReloadUsers } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={inactiveUsers}
      renderItem={(user) => (
        <ShowInactiveUser user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
};

const ShowInactiveUser = (props) => {
  const { user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const activateUser = () => {
    const token = getAccesToken();
    activateUserApi(token, user._id, true)
      .then((response) => {
        notification["success"]({ message: response });
        setReloadUsers(true);
      })
      .catch((err) => notification["error"]({ message: err }));
  };
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
        <Button type="primary" onClick={activateUser}>
          <CheckOutlined />
        </Button>,

        <Button type="danger">
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar src={avatar && avatar} icon={!avatar && <UserOutlined />} />
        }
        title={`${user.name ? user.name : "..."}
            ${user.lastname ? user.lastname : "..."}`}
        description={user.email}
      />
    </List.Item>
  );
};
export default ListUsers;
