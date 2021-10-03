import { Course } from './course.js';
import { StudentInfo } from './studentInfo.js';

import { dataCourses } from './dataCourses.js';
import { studentInfo } from './dataStudentInfo.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentInfoBody: HTMLElement = document.getElementById("studentInfo")!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const inputSearchMin: HTMLInputElement = <HTMLInputElement>document.getElementById("search-min")!;
const inputSearchMax: HTMLInputElement = <HTMLInputElement>document.getElementById("search-max")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits()

renderCoursesInTable(dataCourses);
renderStudentInfoInTable(studentInfo)

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderCoursesInTable(courses: Course[]): void {
    console.log('Desplegando cursos');
    courses.forEach((course) => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
        coursesTbody.appendChild(trElement);
    });
}

function renderStudentInfoInTable(studentInfo: StudentInfo): void {
    console.log('Desplegando informacion estudiante');

    let inner: [string, string][] = [["<td>Codigo</td>", `<td>${studentInfo.code}</td>`],
    ["Cedula", `<td>${studentInfo.dni}</td>`],
    ["Edad", `<td>${studentInfo.age}</td>`],
    ["Direccion", `<td>${studentInfo.address}</td>`],
    ["Telefono", `<td>${studentInfo.telephone}</td>`]];

    inner.forEach(e => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = e[0] + e[1];
        studentInfoBody.appendChild(trElement);
    });
}

function applyFilterByName() {
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter(c =>
        c.name.match(nameKey));
}

function applyFilterByCredits() {
    let minText: string = inputSearchMin.value;
    let maxText: string = inputSearchMax.value;

    let min: number = (minText == null) ? 0 : Number(minText);
    let max: number = (maxText == null) ? 999 : Number(maxText);
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function searchCourseByCredits(minCredits: number, maxCredits: number, courses: Course[]) {
    return courses.filter(c => minCredits <= c.credits && c.credits <= maxCredits);
}

function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
}

function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);

        }
    }
}