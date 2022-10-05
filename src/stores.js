import {writable} from 'svelte/store';

export const d = new Date();

const days = [7, 1, 2, 3, 4, 5, 6]

// timetable stuff
export const timetable = writable({});
export const school = writable({});
// export const today = writable(days[d.getDay()])
export const today = writable(1)
// export const now = writable(d.getHours() + 1 + d.getMinutes() / 100)
export const now = writable(8.05)


// authentication and authorization
export const token = writable("");
export const info = writable("");

// administrative
export const students = writable({});
export const subjects = writable({});
export const grades = writable({});

// core
export const marks = writable({});
export const draftMarks = writable({});
export const truancies = writable({});

// dialog boxes
export const showMotivate = writable(false);
export const selectedTruancy = writable("");
