import React from "react"
import { Breadcrumb, Button, Layout, theme } from "antd"
import { NavLink, Outlet } from "react-router-dom"
import { PAGE_PRODUCTS } from "../common/constants"

const { Header, Content, Footer } = Layout

const Main: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <nav>
          <NavLink to={`/${PAGE_PRODUCTS}`}>
            {({ isActive }) => (
              <Button type={isActive ? "primary" : "default"}>Products</Button>
            )}
          </NavLink>
        </nav>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Yauheni Herasimenka ©2023</Footer>
    </Layout>
  )
}

export default Main
