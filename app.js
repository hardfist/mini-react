import React from './MiniReact';
class Button extends React.Component{
  componentWillMount(){
    console.log('will mount Button');
  }
  componentWillUnmount(){
    console.log('will unmount Button');
  }
  render(){
    const { id } = this.props;
    return (
      <button id={id}>this is a btn</button>
    )
  }
}
class App extends React.Component{
  componentWillMount(){
    console.log('will mount App');
  }
  componentWillUnmount(){
    console.log('will unmount App');
  }
  render(){
    return <Button id="btn"/>
  }
}
React.render(<App/>,document.getElementById('root'))
setTimeout(() =>{
  React.unMountComponentAtNode(document.getElementById('root'))
},1000)