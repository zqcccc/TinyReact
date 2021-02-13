export default function unmountNode(node) {
  const virtualDOM = node._virtualDOM
  if (virtualDOM.type === 'text') {
    // 文本节点直接删除
    node.remove()
    return
  }

  // 看节点是否是组件生成
  let component = virtualDOM.component
  if (component) {
    component.componentWillUnmount()
  }

  // 是否有 ref 属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }

  // 看节点中的属性中是否有事件属性
  Object.keys(virtualDOM.props).forEach((propName) => {
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLocaleLowerCase().slice(2)
      const eventHandler = virtualDOM.props[propName]
      node.removeEventListener(eventName, eventHandler)
    }
  })
  // 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i--
      console.log(
        '%c i: ',
        'font-size:12px;background-color: #7F2B82;color:#fff;',
        i
      )
    }
  }
  node.remove()
}
