import React from './MiniReact';
class Button extends React.Component{
  render(){
    const { id } = this.props;
    return (
      <button id={id}>this is a btn</button>
    )
  }
}
class App extends React.Component{
  render(){
    return <Button id="btn"/>
  }
}
React.render(<App/>,document.getElementById('root'))