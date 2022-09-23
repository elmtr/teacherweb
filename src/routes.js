import Home from './routes/Home.svelte';

// signup
import Basic from './routes/signup/Basic.svelte'
import Phone from './routes/signup/Phone.svelte'
import VerifyCode from './routes/signup/VerifyCode.svelte'
import Password from './routes/signup/Password.svelte'
import Passcode from './routes/signup/Passcode.svelte'

// login
import Login from './routes/login/Login.svelte'
import VerifyLoginCode from './routes/login/VerifyCode.svelte'
import Update from './routes/login/Update.svelte'

// getting
import Subject from './routes/teacher/Subject.svelte'
import Student from './routes/teacher/Student.svelte'

// adding
import AddMark from './routes/add/AddMark.svelte'
import AddDraftMark from './routes/add/AddDraftMark.svelte'
import AddTruancy from './routes/add/AddTruancy.svelte'

// modifying
import ModifyDraftMark from './routes/add/ModifyDraftMark.svelte'
import DefinitivateDraftMark from './routes/add/DefinitivateDraftMark.svelte'
import MotivateTruancy from './routes/add/MotivateTruancy.svelte'

// profile
import Profile from './routes/profile/Profile.svelte'
import ChangePassword from './routes/profile/ChangePassword.svelte'
import ChangePasscode from './routes/profile/ChangePasscode.svelte'

// timetable
import Timetable from './routes/timetable/Timetable.svelte'

export default {
    '/': Home,
    
    '/signup/basic': Basic,
    '/signup/phone': Phone,
    '/signup/verify-code': VerifyCode,
    '/signup/password': Password,
    '/signup/passcode': Passcode,
    
    '/login': Login,
    '/login/verify-code': VerifyLoginCode,
    '/login/update': Update,

    '/teacher/:gradeKey': Subject,
    '/teacher/:gradeKey/:subjectKey/:studentKey': Student,

    '/teacher/:gradeKey/:subjectKey/:studentKey/add/mark': AddMark,
    '/teacher/:gradeKey/:subjectKey/:studentKey/add/draftmark': AddDraftMark,
    '/teacher/:gradeKey/:subjectKey/:studentKey/add/truancy': AddTruancy,

    '/teacher/:gradeKey/:subjectKey/:studentKey/modify/:id': ModifyDraftMark,
    '/teacher/:gradeKey/:subjectKey/:studentKey/definitivate/:id': DefinitivateDraftMark,
    '/teacher/:gradeKey/:subjectKey/:studentKey/motivate/:id': MotivateTruancy,

    '/profile': Profile,
    '/profile/change-password': ChangePassword,
    '/profile/change-passcode': ChangePasscode,

    '/timetable': Timetable,
};