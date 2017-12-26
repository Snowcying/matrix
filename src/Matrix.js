import React from 'react'
import {Component}  from 'react'
import {Button,Input,InputNumber,Form,Layout, Menu,Icon ,Breadcrumb} from 'antd'
import {browserHistory} from 'react-router'
import './Matrix.css'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const FormItem=Form.Item

const formLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 8
    }
};

class Matrix extends  Component{
    constructor(){
        super();
        this.state={
            collapsed: false,
            mu:3,
            nu:3,
            Ftu:9,
            Stu:9,
            FirstListM:[1,1,1,2,2,2,3,3,3],
            FirstListN:[1,2,3,1,2,3,1,2,3],
            FirstListE:[1,2,3,4,5,6,7,8,9],
            SecondListM:[1,1,1,2,2,2,3,3,3],
            SecondListN:[1,2,3,1,2,3,1,2,3],
            SecondListE:[9,8,7,6,5,4,3,2,1],
            leftExist:false,
            rightExist:false,
            ansExist:false
        }
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    hanleOnclickEvent(e,name){

        const value=e.target.value;
       if(name==='mu'){
           this.setState({mu:value})
       }else if(name==='nu'){
           this.setState({nu:value})
       }else if(name==='tu'){
           this.setState({tu:value})
       }
    }

    handleInputEvent(e,num){
        var value=e.target.value;
        var list =value.split(',');
        if(num==='1'){
            this.setState({
                FirstListM:[...this.state.FirstListM,list[0]],
                FirstListN:[...this.state.FirstListN,list[1]],
                FirstListE:[...this.state.FirstListE,list[2]],
                Ftu:this.state.Ftu+1
            })
        }else if(num==='2'){
            this.setState({
                SecondListM:[...this.state.SecondListM,list[0]],
                SecondListN:[...this.state.SecondListN,list[1]],
                SecondListE:[...this.state.SecondListE,list[2]],
                Stu:this.state.Stu+1
            })
        }
    }




    showArrayMatrix(array,key,Exist){

        var m=array.length;
        var n=array[0].length;
        var oTest = document.getElementById("box-matrix")
        // let leftExist=this.state.leftExist
        // let rightExist=this.state.rightExist;
        // let ansExist=this.state.ansExist;



            oTest=document.getElementById(key)
            if(!Exist){
                let num=1;
                for(var i=0;i<m;i++)
                {

                    for(var j=0;j<n;j++)
                    {
                        var btn=document.createElement("BUTTON");
                        btn.className="newButton"
                        btn.id=key+num;
                        num++;
                        var t=document.createTextNode(array[i][j]);
                        btn.appendChild(t);
                        oTest.appendChild(btn);
                        if(key==="left"){
                            this.setState({
                        leftExist:true
                        })
                        }else if(key==="right"){
                            this.setState({
                                rightExist:true
                            })
                        }else if(key==="ans"){
                            this.setState({
                                ansExist:true
                            })
                        }

                    }
                    oTest.appendChild(document.createElement("br"))
                }
                oTest.appendChild(document.createElement("br"))
            }
            else{
                let num=1;
                for(i=0;i<m;i++){
                    for(j=0;j<n;j++){
                        let id=key+num;
                        num++;
                        let button=document.getElementById(id);
                        button.innerHTML=array[i][j];

                    }
                }
            }
    };

    toArrayMatrix(array1,array2){
        var m=this.state.mu;
        var n=this.state.nu;
        for(var i=0;i<m;i++){
            array1[i]=new Array(n);
            array2[i]=new Array(n);
            for(var j=0;j<n;j++){
                array1[i][j]=0;
                array2[i][j]=0;
            }
        }
        var Ftu=this.state.Ftu;
        for(i=0;i<Ftu;i++){
            array1[this.state.FirstListM[i]-1][this.state.FirstListN[i]-1]=Number(this.state.FirstListE[i]);
        }
        var Stu=this.state.Stu;
        for(i=0;i<Stu;i++){
            array2[this.state.SecondListM[i]-1][this.state.SecondListN[i]-1]=Number(this.state.SecondListE[i])
        }
    }


    SumSub(array1,array2,ans,type){


        var m=this.state.mu;
        var n=this.state.nu;

        for(var i=0;i<m;i++){
            ans[i]=new Array(n);
            for(var j=0;j<n;j++){
                ans[i][j]=0;
            }
        }
        if(type==="sum"){
            for( i=0;i<m;i++){
                for( j=0;j<n;j++){
                    ans[i][j] =Number(array1[i][j])+Number(array2[i][j])
                }
            }
        }else if(type==="sub"){
            for( i=0;i<m;i++){
                for( j=0;j<n;j++){
                    ans[i][j] =Number(array1[i][j])-Number(array2[i][j])
                }
            }
        }

        this.showArrayMatrix(ans,"ans",this.state.ansExist)
        for( i=0;i<m;i++){
            for( j=0;j<n;j++){
                ans[i][j]=0;
            }
        }

    }

    Multi(array1,array2,ans){

        var  M=this.state.mu,N=this.state.nu,K=this.state.nu;

        for(var i=0;i<M;i++){
            ans[i]=new Array(N);
            for(var j=0;j<N;j++){
                ans[i][j]=0;
            }
        }

        for( i=0;i<M;i++){
            for( j=0;j<N;j++ ){
                for( var k=0;k<K;k++){
                    ans[i][j]+=Number(array1[i][k])*Number(array2[k][j])
                }
            }
        }
        // console.log(ans[0][0])
        this.showArrayMatrix(ans,"ans",this.state.ansExist)
        for( i=0;i<M;i++){
            for( j=0;j<N;j++){
                ans[i][j]=0;
            }
        }


    }

    onClickEvent(e){
        e.preventDefault();
        browserHistory.push(`/cxy`)
    }

    onClickBack(e){
        e.preventDefault();
        browserHistory.push(`/`)
    }


    render(){

        // var array=[[19,2,3],[3,0,1]];
        var array1=[],array2=[];
        var ans=[];
        const {form}=this.props
        const {getFieldDecorator}=form


        return(

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
                            <div >
                                <Icon type="desktop" />
                                <span>主程序</span>
                            </div>

                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>制作者</span></span>}
                        >
                            <Menu.Item key="3" ><span onClick={(e)=>{this.onClickEvent(e)}}>陈鑫一</span></Menu.Item>
                        </SubMenu>


                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>课程设计</Breadcrumb.Item>
                            <Breadcrumb.Item>陈鑫一</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <div>
                            <InputNumber placeholder="行数" className="input" onBlur={(e)=>{this.hanleOnclickEvent(e,'mu')}}/>
                            <InputNumber placeholder="列数" className="input"  onBlur={(e)=>{this.hanleOnclickEvent(e,'nu')}}/>
                            <Button type="primary" style={{}} icon="upload" >提交</Button>
                            <br/>
                            <br/>


                            <Form layout="inline">
                                <FormItem label='矩阵一' {...formLayout}>
                                    {getFieldDecorator('matrix1',{
                                        rules:[
                                            {
                                                required:false
                                            },
                                            {
                                                pattern:/\d,\d,\d/,
                                                message:'例如：1，2，3'
                                            }
                                        ]
                                    })(
                                        <Input type='text'  className="input" placeholder="输入三元组，例如:1,2,3" onBlur={(e)=>{this.handleInputEvent(e,'1')}}/>
                                    )}
                                </FormItem>
                                <FormItem label='矩阵二' {...formLayout}>
                                    {getFieldDecorator('matrix2',{
                                        rules:[
                                            {
                                                required:false
                                            },
                                            {
                                                pattern:/\d,\d,\d/,
                                                message:'例如：1，2，3'
                                            }
                                        ]
                                    })(
                                        <Input type='text'  className="input" placeholder="输入三元组，例如:1,2,3" onBlur={(e)=>{this.handleInputEvent(e,'2')}} />
                                    )}
                                </FormItem>
                                <Button type="primary" onClick={()=>{this.toArrayMatrix(array1,array2)}}  icon="upload" >提交</Button>

                            </Form>

                            <div>
                                <br/>
                                <Button type="primary" onClick={()=>{this.showArrayMatrix(array1,"left",this.state.leftExist)}} icon="appstore">输出矩阵1</Button>
                                <Button type="primary" onClick={()=>{this.showArrayMatrix(array2,"right",this.state.rightExist)}} icon="appstore">输出矩阵2</Button>
                                <br/>
                                <br/>

                                <Button type="primary" onClick={()=>{this.SumSub(array1,array2,ans,"sum")}} icon="plus">加法</Button>
                                <Button type="primary" onClick={()=>{this.SumSub(array1,array2,ans,"sub")}} icon="minus">减法</Button>

                                <Button type="primary" onClick={()=>{this.Multi(array1,array2,ans)}} icon="close">乘法</Button>
                                {/*<Button type="primary" onClick={(e)=>{this.refresh(e)}} icon="close">重置</Button>*/}

                            </div>
                            <br/>
                        </div>
                        </div>

                        <div id="box-matrix">
                            <div id="left">
                                {this.state.leftExist?"Matrix1:":""}
                                <br/>
                            </div>
                            <div id="right">
                                {this.state.rightExist?"Matrix2:":""}
                                <br/>
                            </div>
                            <div id="ans">
                                {/*{this.state.ansExist?"Matrix3:":""}*/}

                            </div>

                        </div>

                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2017 Created by cxy
                    </Footer>
                </Layout>
            </Layout>










        )
    }
}
Matrix=Form.create()(Matrix)
export default Matrix

