import Component from '../Component';
function isClass(type){
  return type.prototype && type.prototype instanceof Component;
}
class CompositeComponent{
  constructor(element){
    this.currentElement = element;
    this.renderedComponent = null;
    this.publicInstance = null;
  }
  getPublicInstance(){
    return this.publicInstance;
  }
  mount(){
    const element = this.currentElement;
    const { type, props } = element;

    let publicInstance;
    let renderedElement;
    if(isClass(type)){
      publicInstance = new type(props);
      publicInstance.props = props;
      if(publicInstance.componentWillMount){
        publicInstance.componentWillMount();
      }
      renderedElement = publicInstance.render();
    }else if(typeof type === 'function'){
      publicInstance = null;
      renderedElement = type(props);
    }
    this.publicInstance = publicInstance;

    const renderedComponent = instantiateComponent(renderedElement);
    this.renderedComponent = renderedComponent;
    return renderedComponent.mount();
  }
}

class DOMComponent {
  constructor(element){
    this.currentElement = element;
    this.renderedChildren = [];
    this.node = null;
  }
  getPublicInstance(){
    return this.node;
  }
  mount(){
    const element = this.currentElement;
    const { type, props } = element;
    const children = props.children;
    const node = document.createElement(type);
    this.node = node;

    Object.keys(props).forEach(propName => {
      if(propName !== 'children'){
        node.setAttribute(propName,props[propName])
      }
    })

    const renderedChildren = children.map(instantiateComponent);
    this.renderedChildren = renderedChildren;

    const childNodes = renderedChildren.map(child => child.mount());
    childNodes.forEach(childNode => node.appendChild(childNode));
    return node;
  }
}
class TextComponent{
  constructor(text){
    this.currentText = text;
  }
  mount(){
    const node = document.createElement('span');
    node.textContent = this.currentText;
    this.node = node;
    return node;
  }
}
function instantiateComponent(element){
  if(typeof element === 'string'){
    return new TextComponent(element);
  }
  const type = element.type;
  if(typeof type === 'function'){
    return new CompositeComponent(element);
  }else if( typeof type === 'string'){
    return new DOMComponent(element);
  }
}

function render(element,containerNode){
  const rootComponent = instantiateComponent(element);
  const node = rootComponent.mount();
  containerNode.appendChild(node);
  const publicInstance = rootComponent.getPublicInstance();
  return publicInstance;
}
export default {
  render
}