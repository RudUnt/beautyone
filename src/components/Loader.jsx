import '../style/Loader.css';
import logo from '../assets/BeautyOne.gif'
function Loader(){
    return(
        <div id='loader'>
                <img src={logo} alt="logo" />
        </div>
    )
}
export default Loader;