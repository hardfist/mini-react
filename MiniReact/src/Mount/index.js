import Component from '../Component';
function isClass(type){
  return type.prototype && type.prototype instanceof Component;
}
function mountComposite(element){
  const { type, props } = element;
  let  renderedElement;
  if(isClass(type)){
    let instance = new type(props);
    instance.props = props;
    if(instance.componentWillMount){
      instance.componentWillMount();
    }
    renderedElement = instance.render();
  }else{
    renderedElement = type(props);
  }
  return mount(renderedElement);
}
function mountHost(element){
  const { type, props } = element;
  const children = props.children;
  const node = document.createElement(type);
  Object.keys(props).forEach(propName => {
    if(propName !== 'children'){
      node.setAttribute(propName,props[propName]);
    }
  })
  children.forEach(childElement => {
    const childNode = mount(childElement);
    node.appendChild(childNode);
  })
  return node;
}
function mountText(text){
  const node = document.createElement('span')
  node.textContent = text;
  return node;
}
function mount(element){
  if(typeof element === 'string'){
    return mountText(element);
  }
  const type = element.type;
  if(typeof type === 'function'){
    return mountComposite(element);
  }else{
    return mountHost(element);
  }
}
function render(element,containerNode){
  const node = mount(element);
  containerNode.appendChild(node);
}
export default {
  render
}