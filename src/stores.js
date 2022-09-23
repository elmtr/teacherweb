import {writable} from 'svelte/store';

const d = new Date();

// timetable stuff
export const timetable = writable({});
export const school = writable({});
export const today = writable(d.getDay())
export const now = writable(d.getHours() + d.getMinutes() / 100)

// authentication and authorization
export const token = writable("");
export const info = writable("");

// administrative
export const students = writable({});
export const subjects = writable({});
export const grades = writable({});

// core
export const draftMarks = writable([]);
export const marks = writable({});
export const truancies = writable([]);