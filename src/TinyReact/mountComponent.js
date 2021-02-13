import isFunction from './isFunction'
import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'

export default function mountComponent(virtualDOM, container, oldDOM) {
  let nextVirtualDOM = null
  let component = null
  if (isFunctionComponent(virtualDOM)) {
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    nextVirtualDOM = buildClassComponent(virtualDOM)
    component = nextVirtualDOM.component
  }

  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container, oldDOM)
  } else {
    mountNativeElement(nextVirtualDOM, container, oldDOM)
  }

  if (component) {
    component.componentDidMount()
    if (component.props && component.props.ref) {
      component.props.ref(component)
    }
  }
}

function buildFunctionComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent(virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {})
  const nextVirtualDom = component.render()
  nextVirtualDom.component = component
  return nextVirtualDom
}
