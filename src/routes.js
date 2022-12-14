import Home from './routes/Home.svelte';
import Welcome from './routes/Welcome.svelte';


// signup
import Basic from './routes/signup/Basic.svelte'
import Phone from './routes/signup/Phone.svelte'
import VerifyCode from './routes/signup/VerifyCode.svelte'
import Password from './routes/signup/Password.svelte'
import Passcode from './routes/signup/Passcode.svelte'
import CheckPasscode from './routes/signup/CheckPasscode.svelte'

// login
import Login from './routes/login/Login.svelte'
import VerifyLoginCode from './routes/login/VerifyCode.svelte'

// dashboard
import Grade from './routes/teacher/Grade.svelte'
import Student from './routes/teacher/Student.svelte'

// profile
import Profile from './routes/profile/Profile.svelte'
import Account from './routes/profile/Account.svelte'
import ChangePassword from './routes/profile/ChangePassword.svelte'
import ChangePasscode from './routes/profile/ChangePasscode.svelte'
import Logout from './routes/profile/Logout.svelte'

// timetable
import Timetable from './routes/timetable/Timetable.svelte'

export default {
    '/': Home,
    
    '/signup/basic': Basic,
    '/signup/phone': Phone,
    '/signup/verify-code': VerifyCode,
    '/signup/password': Password,
    '/signup/passcode': Passcode,
    '/signup/check-passcode': CheckPasscode,

    '/welcome': Welcome, 
    '/login': Login,
    '/login/verify-code': VerifyLoginCode,

    '/teacher/:gradeKey': Grade,
    '/teacher/:gradeKey/:subjectKey/:studentKey': Student,

    '/profile': Profile,
    '/profile/account': Account,

    '/profile/account/change-password': ChangePassword,
    '/profile/account/change-passcode': ChangePasscode,

    '/profile/logout': Logout,

    '/timetable': Timetable,
};
