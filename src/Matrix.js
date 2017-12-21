import React from 'react'
import {Component}  from 'react'
import {Button} from 'antd'
import './Matrix.css'


export default  class Matrix extends  Component{
    constructor(){
        super();
        this.state={
            mu:3,
            nu:3,
            tu:2,
            Ftu:3,
            Stu:5,
            list1:[],
            list2:[],
            ans:[],
            FirstListM:[1,1,1],
            FirstListN:[1,2,3],
            FirstListE:[99,33,11],
            SecondListM:[1,2,1,3,2],
            SecondListN:[2,3,1,1,1],
            SecondListE:[7,199,100,200,30]
        }
    };

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

    // handleInputEvent(e,num){
    //     var value=e.target.value;
    //     var list=value.split(',');
    //     if(num==='1') this.setState({list1:[...this.state.list1,...list]})
    //     else this.setState({list2:[...this.state.list2,...list]})
    //     e.target.value='';
    //
    // }

    handleInputEvent(e,num){
        var value=e.target.value;
        var list =value.split(',');
        // if(num=='1') this.setState({
        //     list1:this.state.list1.push(list[0])
        // })
        // this.setState({
        //     list1:[...this.state.list1,[1,2,3]]
        // })
        // console.log(list1)
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

    handleMulti(){
        var arrone=new Array(4);
        var arrtwo=new Array(4);
        for(var i=1;i<=2;i++){
            arrone[i]=new Array(4);
            arrtwo[i]=new Array(4);
            for(var j=1;j<=2;j++){
                arrone[i][j]=0;
                arrtwo[i][j]=0;

            }
        }

        var listone=this.state.list1
        var lenthone=listone.length;

        var listtwo=this.state.list2
        var lenthtwo=listtwo.length;
        for(i=0;i<lenthone;i=i+3){
            // console.log(listone[0],listone[1],listone[2]);
            var I=i;
            var J=i+1;
            var E=i+2;
            arrone[listone[I]][listone[J]]=listone[E];
        }  for(i=0;i<lenthtwo;i=i+3){
            // console.log(listone[0],listone[1],listone[2]);
             I=i;
             J=i+1;
             E=i+2;
            arrtwo[listtwo[I]][listtwo[J]]=listtwo[E];
        }
        var ans=this.state.ans;
        for(i=1;i<=2;i++){
            ans[i]=new Array(4);
            for(  j=1;j<=2;j++){
                // console.log(arrone[i][j]+' ');
                ans[i][j]=Number(arrone[i][j])+Number(arrtwo[i][j]);
            }
        }

        // for(i=1;i<=2;i++)
        //     for(j=1;j<=2;j++)
        //         console.log(ans[i][j]);
        this.setState({
            ans:[ans[1],ans[2]]
        })
    }

    // handleShowAns(){
    //     return{<div>
    //         123
    //     </div>}
    // }


    showArrayMatrix(array){

        var m=array.length;
        var n=array[0].length;

        for(var i=0;i<m;i++)
        {
            for(var j=0;j<n;j++)
            {


                    var btn=document.createElement("BUTTON");
                    btn.className="newButton"
                    var t=document.createTextNode(array[i][j]);
                    btn.appendChild(t);
                    document.body.appendChild(btn);

            }
            document.body.appendChild(document.createElement("br"))
        }
        document.body.appendChild(document.createElement("br"))


        console.log(array)

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

        this.showArrayMatrix(ans)
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
                    ans[i][j]=Number(array1[i][k])*Number(array2[k][j])
                }
            }
        }
        this.showArrayMatrix(ans)
        for( i=0;i<M;i++){
            for( j=0;j<N;j++){
                ans[i][j]=0;
            }
        }


    }

    render(){

        // var array=[[19,2,3],[3,0,1]];
        var array1=[],array2=[];
        var ans=[];

        return(
            <div>
                <input type="text" onBlur={(e)=>{this.hanleOnclickEvent(e,'mu')}}/>
                <input type="text"  onBlur={(e)=>{this.hanleOnclickEvent(e,'nu')}}/>
                <input type="text" onBlur={(e)=>{this.hanleOnclickEvent(e,'tu')}}/>
                <Button type="primary">提交</Button>
                <br/>
                {this.state.mu+" "+this.state.nu+" "+this.state.tu}
                <br/>


                <input type="text" onBlur={(e)=>{this.handleInputEvent(e,'1')}}/>
                <input type="text" onBlur={(e)=>{this.handleInputEvent(e,'2')}}/>
                <Button type="primary" onClick={()=>{this.toArrayMatrix(array1,array2)}}>提交</Button>
                <div>


                    <br/>
                    <Button type="primary" onClick={()=>{this.showArrayMatrix(array1,array2)}}>输出矩阵1</Button>
                    <Button type="primary" onClick={()=>{this.showArrayMatrix(array2,array1)}}>输出矩阵2</Button>
                    <br/>
                    <br/>
                    <Button type="primary" onClick={()=>{this.SumSub(array1,array2,ans,"sum")}}>加法</Button>

                    <Button type="primary" onClick={()=>{this.SumSub(array1,array2,ans,"sub")}}>减法</Button>
                    <br/>
                    <Button type="primary" onClick={()=>{this.Multi(array1,array2,ans)}}>乘法</Button>


                </div>
                <br/>




            </div>
        )
    }
}

