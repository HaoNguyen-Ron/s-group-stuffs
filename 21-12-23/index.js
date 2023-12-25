"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var readline = require("readline");
var student_1 = require("./student");
var input = process.stdin, output = process.stdout;
var rl = readline.createInterface({ input: input, output: output });
var filePath = path.resolve(__dirname, "docs", "danh-sach.txt");
var fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
var transformedData = fileContent.split("\r\n").map(function (student) {
    var _a = student.split(","), id = _a[0], name = _a[1], age = _a[2], role = _a[3];
    return {
        id: parseInt(id, 10),
        name: name,
        age: parseInt(age, 10),
        role: role,
    };
});
var listFilePath = path.resolve(__dirname, "docs", "arrayList.txt");
fs.writeFileSync(listFilePath, JSON.stringify(transformedData, null, 2), {
    encoding: "utf8",
});
function askContinueQuestion() {
    rl.question("Continue? (yes/no): ", function (confirm) {
        if (confirm === "yes") {
            askQuestion();
        }
        else if (confirm === "no") {
            rl.close();
        }
        else {
            console.log('Invalid input. Please enter "yes" or "no".');
            askContinueQuestion();
        }
    });
}
function askQuestion() {
    var _this = this;
    rl.question("Please choose your operation below: \n1.read \n2.find \n3.create \n4.update \n5.delete \n", function (operate) {
        var validOperations = ["1", "2", "3", "4", "5"];
        if (!validOperations.includes(operate)) {
            console.log("Invalid input. Please enter correctly.");
            askQuestion();
        }
        else {
            switch (operate) {
                case "1":
                    // transformedData.map((student) =>
                    //     console.log(
                    //         `Id:${student.id},\nName: ${student.name},\nAge: ${student.age},\nTitle: ${student.role}`
                    //     )
                    // );
                    try {
                        var data = fs.readFileSync(filePath, "utf-8");
                        console.log(data);
                    }
                    catch (err) {
                        console.error(err);
                    }
                    askContinueQuestion();
                    break;
                case "2":
                    rl.question("Find student id here: ", function (fillName) {
                        var studentData = transformedData.filter(function (student) { return student.id === Number(fillName); });
                        if (studentData.length > 0) {
                            studentData.forEach(function (student) {
                                console.log("Id:".concat(student.id, ",\nName: ").concat(student.name, ",\nAge: ").concat(student.age, ",\nRole: ").concat(student.role));
                            });
                        }
                        else {
                            console.log("Student not found.");
                        }
                        askContinueQuestion();
                    });
                    break;
                // case 3 original
                // case "3":
                //     let initialId = 1;
                //     let newStudent: StudentData = {
                //         id: initialId,
                //         name: "",
                //         age: 0,
                //         role: "",
                //     };
                //     rl.question("Fill student name: ", (fillName) => {
                //         newStudent.name = fillName;
                //         rl.question("Fill student age: ", (fillAge) => {
                //             newStudent.age = Number(fillAge);
                //             rl.question("Fill student title: ", (fillTitle) => {
                //                 newStudent.role = fillTitle;
                //                 initialId++;
                //                 transformedData.push(newStudent);
                //                 fs.writeFileSync(
                //                     path.resolve("./docs/danh-sach.txt"),
                //                     transformedData
                //                         .map(
                //                             (student) =>
                //                                 `${student.name},${student.age},${student.role}`
                //                         )
                //                         .join("\r\n"),
                //                     {
                //                         encoding: "utf8",
                //                     }
                //                 );
                //                 console.log("New student added successfully.");
                //                 askContinueQuestion();
                //             });
                //         });
                //     });
                //     break;
                //case 3 with no callback hell:
                case "3":
                    var newStudentId_1 = transformedData.length + 1;
                    var addStudent = function () { return __awaiter(_this, void 0, void 0, function () {
                        var askQuestion, fillName, fillAge, fillRole, newStudent;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    askQuestion = function (question) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve) {
                                                    rl.question(question, function (answer) {
                                                        resolve(answer);
                                                    });
                                                })];
                                        });
                                    }); };
                                    return [4 /*yield*/, askQuestion("Fill student name: ")];
                                case 1:
                                    fillName = _a.sent();
                                    return [4 /*yield*/, askQuestion("Fill student age: ")];
                                case 2:
                                    fillAge = _a.sent();
                                    return [4 /*yield*/, askQuestion("Fill student role: ")];
                                case 3:
                                    fillRole = _a.sent();
                                    newStudent = new student_1.StudentData(newStudentId_1, fillName, fillRole, parseInt(fillAge));
                                    transformedData.push(newStudent);
                                    fs.writeFileSync(path.resolve("./docs/danh-sach.txt"), transformedData
                                        .map(function (student) {
                                        return "".concat(student.id, ",").concat(student.name, ",").concat(student.age, ",").concat(student.role);
                                    })
                                        .join("\r\n"), {
                                        encoding: "utf8",
                                    });
                                    console.log("New student added successfully.");
                                    askContinueQuestion();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    addStudent();
                    break;
                //   case "4":
                //     rl.question(
                //       "Please choose an incoming updated student name: ",
                //       (fillName) => {
                //         const filteredStudent = transformedData.find(
                //           (line) => line.name.toLowerCase() === fillName.toLowerCase()
                //         );
                //         if (filteredStudent) {
                //           rl.question(
                //             `Update name (${filteredStudent.name}): `,
                //             (updatedName) => {
                //               rl.question(
                //                 `Update age (${filteredStudent.age}): `,
                //                 (updatedAge) => {
                //                   rl.question(
                //                     `Update title (${filteredStudent.role}): `,
                //                     (updatedTitle) => {
                //                       filteredStudent.name =
                //                         updatedName || filteredStudent.name;
                //                       filteredStudent.age = Number(
                //                         updatedAge || filteredStudent.age
                //                       );
                //                       filteredStudent.role =
                //                         updatedTitle || filteredStudent.role;
                //                       fs.writeFileSync(
                //                         path.resolve("./docs/danh-sach.txt"),
                //                         transformedData
                //                           .map(
                //                             (student) =>
                //                               `${student.name},${student.age},${student.role}`
                //                           )
                //                           .join("\r\n"),
                //                         {
                //                           encoding: "utf8",
                //                         }
                //                       );
                //                       console.log(
                //                         "Student information updated successfully."
                //                       );
                //                       askContinueQuestion();
                //                     }
                //                   );
                //                 }
                //               );
                //             }
                //           );
                //         } else {
                //           console.log("Student not found.");
                //           askQuestion();
                //         }
                //         askContinueQuestion();
                //       }
                //     );
                //     break;
                case "4":
                    var updateStudent = function () { return __awaiter(_this, void 0, void 0, function () {
                        var askQuestion, fillName, filteredStudent, updatedName, updatedAge, updatedTitle;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    askQuestion = function (prompt) {
                                        return new Promise(function (resolve) {
                                            rl.question(prompt || "", function (answer) {
                                                resolve(answer);
                                            });
                                        });
                                    };
                                    return [4 /*yield*/, askQuestion("Please choose an incoming updated student id: ")];
                                case 1:
                                    fillName = _a.sent();
                                    filteredStudent = transformedData.find(function (student) { return student.id === Number(fillName); });
                                    if (!(filePath && filteredStudent)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, askQuestion("Update name (".concat(filteredStudent.name, "): "))];
                                case 2:
                                    updatedName = _a.sent();
                                    return [4 /*yield*/, askQuestion("Update age (".concat(filteredStudent.age, "): "))];
                                case 3:
                                    updatedAge = _a.sent();
                                    return [4 /*yield*/, askQuestion("Update title (".concat(filteredStudent.role, "): "))];
                                case 4:
                                    updatedTitle = _a.sent();
                                    filteredStudent.name = updatedName || filteredStudent.name;
                                    filteredStudent.age = Number(updatedAge || filteredStudent.age);
                                    filteredStudent.role = updatedTitle || filteredStudent.role;
                                    fs.writeFileSync(path.resolve("./docs/danh-sach.txt"), transformedData
                                        .map(function (student) {
                                        return "".concat(student.id, ",").concat(student.name, ",").concat(student.age, ",").concat(student.role);
                                    })
                                        .join("\r\n"), {
                                        encoding: "utf8",
                                    });
                                    console.log("Student information updated successfully.");
                                    return [3 /*break*/, 6];
                                case 5:
                                    console.log("Not found.");
                                    _a.label = 6;
                                case 6:
                                    askContinueQuestion();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    updateStudent();
                    break;
                case "5":
                    rl.question("Please choose a student id to delete: ", function (fillName) {
                        var filteredData = transformedData.filter(function (student) { return student.id !== Number(fillName); });
                        if (filteredData.length < transformedData.length) {
                            fs.writeFileSync(path.resolve("./docs/danh-sach.txt"), filteredData
                                .map(function (student) {
                                return "".concat(student.id, ",").concat(student.name, ",").concat(student.age, ",").concat(student.role);
                            })
                                .join("\r\n"), {
                                encoding: "utf8",
                            });
                            console.log("Student deleted successfully.");
                        }
                        else {
                            console.log("Student not found.");
                        }
                        askContinueQuestion();
                    });
                    break;
                default:
                    askContinueQuestion();
                    break;
            }
        }
    });
}
askQuestion();
