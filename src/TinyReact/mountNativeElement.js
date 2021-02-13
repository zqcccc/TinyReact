import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'

export default function mountNativeElement(virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM)
  // 将转换之后的 DOM 对象放置在页面中
  if (oldDOM) {
    container.insertBefore(newElement, oldDOM)
  } else {
    container.appendChild(newElement)
  }
  if (oldDOM) {
    unmountNode(oldDOM)
  }

  let component = virtualDOM.component

  if (component) {
    component.setDOM(newElement)
  }
}
