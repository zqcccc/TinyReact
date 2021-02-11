import mountNativeElement from './mountNativeElement'
import mountComponent from './mountComponent'
import isFunction from './isFunction'

export default function mountElement(virtualDOM, container) {
  if(isFunction(virtualDOM)) {
    // Component 
    mountComponent(virtualDOM, container)
  } else {
    // NativeElement
    mountNativeElement(virtualDOM, container)
  }
}