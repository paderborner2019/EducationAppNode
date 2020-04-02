import { connect } from "react-redux";
import { Register } from "../../components/auth/register";
import { showSignInAction, hideRegisterAction } from "../../Redux/popUp/actions";

const mapDispatcToProps = {
    showSignInAction,
    hideRegisterAction
}


export default connect(null,mapDispatcToProps)(Register)