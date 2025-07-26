import userNameAndPassword from "../components/UsernameAndPassword.tsx"
function LoginWithUsernameAndPassword(){
    return(
            <div id="login-page">
                {userNameAndPassword()}
            </div>
    );
}

export default LoginWithUsernameAndPassword;