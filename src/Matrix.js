import React from 'react'
import {Component} from 'react'
import {Button, Input, InputNumber, Form, Layout, Menu, Icon, Breadcrumb,message} from 'antd'
import {browserHistory} from 'react-router'
import './Matrix.css'

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item

const formLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 8
    }
};

class Matrix extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            mu1: 3,
            mu2: 3,
            nu1: 3,
            nu2: 3,
            Ftu: 9,
            Stu: 9,
            FirstListM: [1, 1, 1, 2, 2, 2, 3, 3, 3],
            FirstListN: [1, 2, 3, 1, 2, 3, 1, 2, 3],
            FirstListE: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            SecondListM: [1, 1, 1, 2, 2, 2, 3, 3, 3],
            SecondListN: [1, 2, 3, 1, 2, 3, 1, 2, 3],
            SecondListE: [9, 8, 7, 6, 5, 4, 3, 2, 1],
            leftExist: false,
            rightExist: false,
            ansExist: false
        }
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    }

    hanleOnclickEvent(e, name,num) {

        const value = e.target.value;
        if (name === 'mu') {
            if(num===1){
            this.setState({mu1: value})
            }else if(num===2){
                this.setState({mu2:value})
            }
        } else if (name === 'nu') {
            if(num===1){
                this.setState({nu1: value})
            }else if(num===2){
                this.setState({nu2:value})
            }

        } else if (name === 'tu') {
            if(num===1){
                this.setState({Ftu:value})
            }else if(num===2){
                this.setState({Stu:value})
            }
        }
    }


    //重构
    handleInputEvent(e, num) {
        let value = e.target.value;
        let list = value.split(',');
        if (num === '1') {
            this.setState({
                FirstListM: [...this.state.FirstListM, list[0]],
                FirstListN: [...this.state.FirstListN, list[1]],
                FirstListE: [...this.state.FirstListE, list[2]]
            })
            if(!Number(list[2])){
                this.setState({
                    Ftu:this.state.Ftu+1
                })
            }
        } else if (num === '2') {
            this.setState({
                SecondListM: [...this.state.SecondListM, list[0]],
                SecondListN: [...this.state.SecondListN, list[1]],
                SecondListE: [...this.state.SecondListE, list[2]],
                Stu: this.state.Stu + 1
            })
            if(list[2]===0){
                this.setState({
                    Stu:this.state.Stu-1
                })
                console.log(list[2])
            }

            console.log(this.state.Stu);
        }

    }


    createDoubleArray(M, N, E, m, n, array) {
        let len = M.length;
        for (let i = 0; i < m; i++) {
            array[i] = new Array(n);
            for (let j = 0; j < n; j++) {
                array[i][j] = 0;
            }
        }

        for (let i = 0; i < len; i++) {
            array[M[i] - 1][N[i] - 1] = Number(E[i]);
        }
    }


    showArrayMatrix(key, Exist,mu,nu,Arr) {

        let array = [];
        // let mu = this.state.mu1, nu = this.state.nu1;
        if (key === "left") {
            // eslint-disable-next-line
            // mu=this.state.mu1,nu=this.state.nu1;
            this.createDoubleArray(this.state.FirstListM, this.state.FirstListN, this.state.FirstListE, mu, nu, array);
        } else if (key === "right") {
            // eslint-disable-next-line
            // mu=this.state.mu2,nu=this.state.nu2;
            this.createDoubleArray(this.state.SecondListM, this.state.SecondListN, this.state.SecondListE, mu, nu, array);
        } else if (key === "ans") {
            array = Arr;
        }
        let oTest = document.getElementById("box-matrix")

        oTest = document.getElementById(key)
        if (!Exist) {
            console.log(mu,nu)
            let num = 1;
            for (let i = 0; i < mu; i++) {

                for (let j = 0; j < nu; j++) {
                    let btn = document.createElement("BUTTON");
                    btn.className = "newButton"
                    btn.id = key + num;
                    num++;
                    let t = document.createTextNode(array[i][j]);
                    btn.appendChild(t);
                    oTest.appendChild(btn);
                    if (key === "left") {
                        this.setState({
                            leftExist: true
                        })
                    } else if (key === "right") {
                        this.setState({
                            rightExist: true
                        })
                    } else if (key === "ans") {
                        this.setState({
                            ansExist: true
                        })
                    }

                }
                oTest.appendChild(document.createElement("br"))
            }
            oTest.appendChild(document.createElement("br"))
        }
        else {
            let num = 1;
            for (let i = 0; i < mu; i++) {
                for (let j = 0; j < nu; j++) {
                    let id = key + num;
                    num++;
                    let button = document.getElementById(id);
                    button.innerHTML = array[i][j];

                }
            }
        }
    };

    SumSub(type) {


        if(this.state.mu1!==this.state.mu2 || this.state.nu1!==this.state.nu2 ){
            message.error("row and column are not matched")
        }
        let m = this.state.mu1;
        let n = this.state.nu1;
        let ans = [], array1 = [], array2 = [];

        this.createDoubleArray(this.state.FirstListM, this.state.FirstListN, this.state.FirstListE, m, n, array1);
        // console.log(array1);
        this.createDoubleArray(this.state.SecondListM, this.state.SecondListN, this.state.SecondListE, m, n, array2);


        for (let i = 0; i < m; i++) {
            ans[i] = new Array(n);
            for (let j = 0; j < n; j++) {
                ans[i][j] = 0;
            }
        }
        if (type === "sum") {
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    ans[i][j] = Number(array1[i][j]) + Number(array2[i][j])
                }
            }
        } else if (type === "sub") {
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    ans[i][j] = Number(array1[i][j]) - Number(array2[i][j])
                }
            }
        }

        this.showArrayMatrix("ans", this.state.ansExist,this.state.mu1,this.state.nu1, ans)
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                ans[i][j] = 0;
            }
        }

    }

    Multi() {

        let M = this.state.mu1, N = this.state.nu1, K = this.state.nu2;
        let array1 = [], array2 = [], ans = [];
        this.createDoubleArray(this.state.FirstListM, this.state.FirstListN, this.state.FirstListE, M, N, array1);

        this.createDoubleArray(this.state.SecondListM, this.state.SecondListN, this.state.SecondListE, M, N, array2);

        for (let i = 0; i < M; i++) {
            ans[i] = new Array(N);
            for (let j = 0; j < N; j++) {
                ans[i][j] = 0;
            }
        }

        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
                for (let k = 0; k < K; k++) {
                    ans[i][j] += Number(array1[i][k]) * Number(array2[k][j])
                }
            }
        }
        // console.log(ans[0][0])
        this.showArrayMatrix("ans", this.state.ansExist, this.state.mu1,this.state.nu2,ans)
        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
                ans[i][j] = 0;
            }
        }


    }

    onClickEvent(e) {
        e.preventDefault();
        browserHistory.push(`/cxy`)
    }

    onClickBack(e) {
        e.preventDefault();
        browserHistory.push(`/`)
    }


    render() {

        // let array=[[19,2,3],[3,0,1]];
        const {form} = this.props
        const {getFieldDecorator} = form


        return (

            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="appstore"/>
                            <span>矩阵</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <div>
                                <Icon type="desktop"/>
                                <span>主程序</span>
                            </div>

                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user"/><span>制作者</span></span>}
                        >
                            <Menu.Item key="3"><span onClick={(e) => {
                                this.onClickEvent(e)
                            }}>陈鑫一</span></Menu.Item>
                        </SubMenu>


                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>课程设计</Breadcrumb.Item>
                            <Breadcrumb.Item>陈鑫一</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            <div>
                                <InputNumber placeholder="行数" className="input" onBlur={(e) => {
                                    this.hanleOnclickEvent(e, 'mu', 1)
                                }}/>
                                <InputNumber placeholder="列数" className="input" onBlur={(e) => {
                                    this.hanleOnclickEvent(e, 'nu', 1)
                                }}/>
                                <Button type="primary" style={{}} icon="upload" onClick={()=>{console.log(this.state.mu1,this.state.nu1,this.state.Ftu)}} >提交</Button>
                                <br/>
                                <br/>
                                <InputNumber placeholder="行数" className="input" onBlur={(e) => {
                                    this.hanleOnclickEvent(e, 'mu', 2)
                                }}/>
                                <InputNumber placeholder="列数" className="input" onBlur={(e) => {
                                    this.hanleOnclickEvent(e, 'nu', 2)
                                }}/>
                                <Button type="primary" style={{}} icon="upload" onClick={()=>{console.log(this.state.mu2,this.state.nu2,this.state.Stu)}} >提交</Button>
                                <br/>
                                <br/>


                                <Form layout="inline">
                                    <FormItem label='矩阵一' {...formLayout}>
                                        {getFieldDecorator('matrix1', {
                                            rules: [
                                                {
                                                    required: false
                                                },
                                                {
                                                    pattern: /\d,\d,\d/,
                                                    message: '例如：1，2，3'
                                                }
                                            ]
                                        })(
                                            <Input type='text' className="input" placeholder="输入三元组，例如:1,2,3"
                                                   onBlur={(e) => {
                                                       this.handleInputEvent(e, '1')
                                                   }}/>
                                        )}
                                    </FormItem>
                                    <FormItem label='矩阵二' {...formLayout}>
                                        {getFieldDecorator('matrix2', {
                                            rules: [
                                                {
                                                    required: false
                                                },
                                                {
                                                    pattern: /\d,\d,\d/,
                                                    message: '例如：1，2，3'
                                                }
                                            ]
                                        })(
                                            <Input type='text' className="input" placeholder="输入三元组，例如:1,2,3"
                                                   onBlur={(e) => {
                                                       this.handleInputEvent(e, '2')
                                                   }}/>
                                        )}
                                    </FormItem>
                                    <Button type="primary" icon="upload">提交</Button>

                                </Form>

                                <div>
                                    <br/>
                                    <Button type="primary" onClick={() => {
                                        this.showArrayMatrix("left", this.state.leftExist,this.state.mu1,this.state.nu1)
                                    }} icon="appstore">输出矩阵1</Button>
                                    <Button type="primary" onClick={() => {
                                        this.showArrayMatrix("right", this.state.rightExist,this.state.mu2,this.state.nu2)
                                    }} icon="appstore">输出矩阵2</Button>
                                    <br/>
                                    <br/>

                                    <Button type="primary" onClick={() => {
                                        this.SumSub("sum")
                                    }} icon="plus">加法</Button>
                                    <Button type="primary" onClick={() => {
                                        this.SumSub("sub")
                                    }} icon="minus">减法</Button>

                                    <Button type="primary" onClick={() => {
                                        this.Multi()
                                    }} icon="close">乘法</Button>
                                    {/*<Button type="primary" onClick={(e)=>{this.refresh(e)}} icon="close">重置</Button>*/}

                                </div>
                                <br/>
                            </div>
                        </div>

                        <div id="box-matrix">
                            <div id="left">
                                {this.state.leftExist ? "Matrix1:" : ""}
                                <br/>
                            </div>
                            <div id="right">
                                {this.state.rightExist ? "Matrix2:" : ""}
                                <br/>
                            </div>
                            <div id="ans">
                                {/*{this.state.ansExist?"Matrix3:":""}*/}

                            </div>

                        </div>

                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2017 Created by cxy
                    </Footer>
                </Layout>
            </Layout>

        )
    }
}

Matrix = Form.create()(Matrix)
export default Matrix

