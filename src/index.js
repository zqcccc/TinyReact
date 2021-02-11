import TinyReact from './TinyReact'

const root = document.getElementById('root')

const virtualDOM = (
  <div className='container'>
    <h1 data-test='test'>你好 Tiny React</h1>
    <h2>(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert('你好')}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input type='text' value='123' />
  </div>
)

// console.log(virtualDOM)

// TinyReact.render(virtualDOM, root)
function Demo(props) {
  return <div>{props.title}&hearts;</div>
}
function Heart(props) {
  return <Demo {...props} />
}
// class Heart {
//   render() {
//     return <div>&hearts;</div>
//   }
// }
// TinyReact.render(<Heart title='你好啊' />, root)
// console.log(
//   '%c <Heart />: ',
//   'font-size:12px;background-color: #F5CE50;color:#fff;',
//   <Heart />
// )

class Alert extends TinyReact.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.name}
        {this.props.age}
        Hello React
      </div>
    )
  }
}
TinyReact.render(virtualDOM, root)

const modifyVirtualDOM = (
  <div className='container'>
    <h1 data-test='test123123'>你好 Tiny React12131</h1>
    <h2>(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert('你好1231')}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input type='number' value='12111113' />
  </div>
)
setTimeout(() => {
  TinyReact.render(modifyVirtualDOM, root)
}, 2000)
