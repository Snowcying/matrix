import React from 'react'
import {browserHistory} from 'react-router'
import { Layout, Menu, Icon } from 'antd';
import './MySelf.css'
const { Header, Content, Footer, Sider } = Layout;

const SubMenu = Menu.SubMenu;

class MySelf extends React.Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    onClickEvent(e){
        e.preventDefault();
        browserHistory.push(`/`)
    }

    Jump(e,href){
        e.preventDefault()
        if(href==="js"){
            window.location.href="https://github.com/Snowcying/matrix";
        }
        else{
            window.location.href="https://github.com/Snowcying/Design_Matrix/tree/master/Design";
        }


    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="appstore" />
                            <span>矩阵</span>
                        </Menu.Item>
                        <Menu.Item key="2" >
                            <div onClick={(e)=>{this.onClickEvent(e)}}>
                                <Icon type="desktop" />
                                <span >主程序</span>
                            </div>

                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>制作者</span></span>}
                        >
                            <Menu.Item key="3">陈鑫一</Menu.Item>
                        </SubMenu>


                    </Menu>
                </Sider>

                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <h1>课设</h1>
                            <h4>作者:陈鑫一</h4>
                            <h4>学号：20169016</h4>
                            <h4>班级：计科4班27号</h4>
                            <span onClick={(e)=>{this.Jump(e,"js")}}><Icon  type="github"/>  源代码(js)</span>
                            <br/>
                            <span onClick={(e)=>{this.Jump(e,"c++")}} ><Icon  type="github"/>  源代码(c++)</span>

                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2017 Created by cxy
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MySelf
