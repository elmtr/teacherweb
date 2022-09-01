import Home from './routes/Home.svelte';
import Basic from './routes/signup/Basic.svelte'
import Phone from './routes/signup/Phone.svelte'
import VerifyCode from './routes/signup/VerifyCode.svelte'
import Password from './routes/signup/Password.svelte'
import Passcode from './routes/signup/Passcode.svelte'
import Login from './routes/login/Login.svelte'
import VerifyLoginCode from './routes/login/VerifyCode.svelte'
import Update from './routes/login/Update.svelte'
import Students from './routes/teacher/Students.svelte'
import Student from './routes/teacher/Student.svelte'
import AddMark from './routes/add/AddMark.svelte'
import AddDraftMark from './routes/add/AddDraftMark.svelte'
import ModifyDraftMark from './routes/add/ModifyDraftMark.svelte'
import AddTruancy from './routes/add/AddTruancy.svelte'
import MotivateTruancy from './routes/add/MotivateTruancy.svelte'

export default {
    '/': Home,
    '/login/update': Update,

    '/signup/basic': Basic,
    '/signup/phone': Phone,
    '/signup/verify-code': VerifyCode,
    '/signup/password': Password,
    '/signup/passcode': Passcode,

    '/teacher/:subjectID': Students,
    '/teacher/:subjectID/:studentID': Student,

    '/teacher/:subjectID/:studentID/add/mark': AddMark,
    '/teacher/:subjectID/:studentID/add/draftmark': AddDraftMark,
    
    '/teacher/:subjectID/:studentID/add/truancy': AddTruancy,
    '/teacher/:subjectID/:studentID/modify/:id': ModifyDraftMark,
    '/teacher/:subjectID/:studentID/motivate/:id': MotivateTruancy,

    '/login': Login,
    '/login/verify-code': VerifyLoginCode,
};
