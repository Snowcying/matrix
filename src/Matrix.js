import React from 'react'
import {Component}  from 'react'
// import {Input} from 'antd'

export default  class Matrix extends  Component{
    constructor(){
        super();
        this.state={
            mu:0,
            nu:0,
            tu:0,
            list1:[],
            list2:[],
            ans:0
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

    handleInputEvent(e,num){
        var value=e.target.value;
        var list=value.split(',');
        if(num==='1') this.setState({list1:[...this.state.list1,...list]})
        else this.setState({list2:[...this.state.list2,...list]})
        e.target.value='';

    }

    handleMulti(){
        var arrone=new Array(100);
        var arr2=new Array(100);
        for(var i=1;i<=2;i++){
            arrone[i]=new Array(100);
            arr2[i]=new Array(100);
            // for(var j=1;j<=2;j++){
            //     arr[i][j]=i*j;
            // }
        }

        var listone=this.state.list1
        var lenthone=listone.length;

        var list2=this.state.list2
        var lenth2=list2.length;
        for(i=0;i<lenthone;i=i+3){
            // console.log(listone[0],listone[1],listone[2]);
            var I=i;
            var J=i+1;
            var E=i+2;
            arrone[listone[I]][listone[J]]=listone[E];
        }
        for(i=1;i<=2;i++){
            for( var j=1;j<=2;j++){
                console.log(arrone[i][j]+' ');
            }

        }

    }
    render(){

        return(
            <div>
                <input type="text" onBlur={(e)=>{this.hanleOnclickEvent(e,'mu')}}/>
                <input type="text"  onBlur={(e)=>{this.hanleOnclickEvent(e,'nu')}}/>
                <input type="text" onBlur={(e)=>{this.hanleOnclickEvent(e,'tu')}}/>
                <br/>
                {this.state.mu}
                <br/>
                {this.state.nu}
                <br/>
                {this.state.tu}
                <br/>

                <input type="text" onBlur={(e)=>{this.handleInputEvent(e,'1')}}/>
                <input type="text" onBlur={(e)=>{this.handleInputEvent(e,'2')}}/>

                <br/>
                {this.state.list1}
                <br/>
                {this.state.list2}
                <br/>
                <input type="submit" onClick={()=>{this.handleMulti()}}/>
            </div>
        )
    }
}

