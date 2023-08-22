import { useSelector, useDispatch } from "react-redux"
const View = () => {
    // 获取数据
    const { num } = useSelector((state) => ({
        num: state.num // 这里划曲线警告
    }));
    // 修改数据
    const dispatch = useDispatch();
    const changeNum = () => {
        dispatch({ type: 'add2', val: 3 })
    }
    return (
        <div className='home'>
            <p>这是Page1页面内容</p>
            <p>{num}</p>
            <button onClick={changeNum}>按钮</button>
        </div>
    )
}
export default View