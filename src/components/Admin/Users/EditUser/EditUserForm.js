import React, { useState, useCallback, useEffect } from "react";
import { Avatar, Form, Input, Select, Button, Row, Col } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import "./EditUserForm.scss";
function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    password: "",
    repeatPassword: "",
  });
  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar });
    }
  }, [avatar]);
  const updateUser = () => {
    console.log(userData);
  };
  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        user={user}
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

const UploadAvatar = (props) => {
  const { avatar, setAvatar } = props;
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150}></Avatar>
      ) : (
        <Avatar size={150} src={avatar ? avatar.preview : ""}></Avatar>
      )}
    </div>
  );
};

const EditForm = (props) => {
  const { user, userData, setUserData, updateUser } = props;
  const { Option } = Select;
  return (
    <Form className="form-edit" onFinish={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              defaultValue={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellidos"
              defaultValue={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              defaultValue={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              defaultValue={userData.role}
              placeholder="Selecciona un rol"
              onChange={(e) => {
                setUserData({ ...userData, role: e });
              }}
            >
              <Option value="admin">Admin</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          {" "}
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirmar Contraseña"
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditUserForm;
