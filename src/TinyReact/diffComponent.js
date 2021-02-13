import mountElement from './mountElement'
import updateComponent from './updateComponent'

export default function diffComponent(
  virtualDOM,
  oldComponent,
  oldDOM,
  container
) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    // 同一个组件
    updateComponent(virtualDOM, oldComponent, oldDOM, container)
  } else {
    // 不是同一组件
    mountElement(virtualDOM, container, oldDOM)
  }
}

function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor
}
