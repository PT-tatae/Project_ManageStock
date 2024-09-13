import { Button, Card, Form, Input, message, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../../services/https";
import { LoginInterface } from "../../interfaces/Login";
import logo from "../../assets/ImgLogo/Logo.png";
import "./Login.css";

function LoginPages() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: LoginInterface) => {
    let res = await SignIn(values);
    console.log("Response:", res);
  
    // ตรวจสอบว่ามี token และตอบกลับถูกต้อง
    if (res && res.token) {
      messageApi.success("Login successful");
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("page", "dashboard");
      localStorage.setItem("token_type", res.token_type);
      localStorage.setItem("token", res.token);
      localStorage.setItem("id", res.id);
      localStorage.setItem("firstName", res.firstName);
      localStorage.setItem("lastName", res.lastName);
      localStorage.setItem("positionID", res.positionID);
      setTimeout(() => {
        navigate("/ManageStock");
      }, 2000);
    } else {
      messageApi.error("Login failed");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="login-container">
        
        <Card className="card-login">
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Row gutter={[16, 8]} style={{padding:"30px", justifyContent:"center"}}>
              <img className="logo" src={logo} alt="Logo" />

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please input your email!" }]}
                >
                  <Input placeholder="กรุณากรอกอีเมล" className="login-form"/>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password placeholder="กรุณากรอกรหัสผ่าน" className="login-form"/>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-button">
                    Login
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default LoginPages;