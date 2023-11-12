import React from "react"
import { Layout, Space } from "antd"
import { Outlet } from "react-router-dom"
import { PAGE_PRODUCTS } from "../common/constants"
import HeaderNavLink from "../Components/NavLink"

const { Header, Content, Footer } = Layout

const Main: React.FC = () => {
  return (
    <Layout
      style={{
        display: "grid",
        gridTemplateRows: "70px auto 70px",
        minHeight: "97vh",
      }}
    >
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Space size={"middle"}>
          <HeaderNavLink to={"."} title="Home"></HeaderNavLink>
          <HeaderNavLink
            to={`/${PAGE_PRODUCTS}`}
            title="Products"
          ></HeaderNavLink>
        </Space>
      </Header>
      <Content style={{ padding: "0 50px", height: "100%" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>Yauheni Herasimenka ©2023</Footer>
    </Layout>
  )
}

export default Main
