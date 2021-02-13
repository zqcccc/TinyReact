import createDOMElement from './createDOMElement'
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (
    virtualDOM.type !== oldVirtualDOM.type &&
    typeof virtualDOM.type !== 'function'
  ) {
    const newElement = createDOMElement(virtualDOM)
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if (typeof virtualDOM.type === 'function') {
    // 组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // virtualDOM 类型相同的情况
    if (virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 将拥有key属性的子元素放置在一个单独的对象中
    const keyedElements = {}
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      const domElement = oldDOM.childNodes[i]
      if (domElement.nodeType === 1) {
        const key = domElement.getAttribute('key')
        if (key) {
          keyedElements[key] = domElement
        }
      }
    }

    const hasNoKey = Object.keys(keyedElements).length === 0

    if (hasNoKey) {
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i])
      })
    } else {
      // 循环 virtualDOM 的子元素获取子元素的 key 属性
      virtualDOM.children.forEach((child, i) => {
        const key = child.props.key
        if (key) {
          const domElement = keyedElements[key]
          if (domElement) {
            // 看看当前位置的元素是不是我们期望的元素
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          } else {
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[i])
          }
        }
      })
    }

    let oldChildNodes = oldDOM.childNodes
    if (hasNoKey) {
      // 删除多余节点
      if (oldChildNodes.length > virtualDOM.children.length) {
        // 有节点需要被删除
        // 然后从尾部开始删除
        for (
          let i = oldChildNodes.length - 1;
          i > virtualDOM.children.length - 1;
          i--
        ) {
          unmountNode(oldChildNodes[i])
        }
      }
    } else {
      for (let i = 0; i < oldChildNodes.length; i++) {
        const oldChild = oldChildNodes[i]
        const oldChildKey = oldChild._virtualDOM.props.key
        let found = false
        for (let n = 0; n < virtualDOM.children.length; n++) {
          if (oldChildKey === virtualDOM.children[n].props.key) {
            found = true
            break
          }
        }
        if (!found) {
          unmountNode(oldChild)
        }
      }
    }
  }
}
