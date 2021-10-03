import { dataCourses } from './dataCourses.js';
import { studentInfo } from './dataStudentInfo.js';
var coursesTbody = document.getElementById('courses');
var studentInfoBody = document.getElementById("studentInfo");
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputSearchMin = document.getElementById("search-min");
var inputSearchMax = document.getElementById("search-max");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentInfoInTable(studentInfo);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInfoInTable(studentInfo) {
    console.log('Desplegando informacion estudiante');
    var inner = [["<td>Codigo</td>", "<td>" + studentInfo.code + "</td>"],
        ["Cedula", "<td>" + studentInfo.dni + "</td>"],
        ["Edad", "<td>" + studentInfo.age + "</td>"],
        ["Direccion", "<td>" + studentInfo.address + "</td>"],
        ["Telefono", "<td>" + studentInfo.telephone + "</td>"]];
    inner.forEach(function (e) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = e[0] + e[1];
        studentInfoBody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function applyFilterByCredits() {
    var minText = inputSearchMin.value;
    var maxText = inputSearchMax.value;
    var min = (minText == null) ? 0 : Number(minText);
    var max = (maxText == null) ? 999 : Number(maxText);
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(minCredits, maxCredits, courses) {
    return courses.filter(function (c) { return minCredits <= c.credits && c.credits <= maxCredits; });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
