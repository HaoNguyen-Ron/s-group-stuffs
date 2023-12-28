import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { StudentData } from "./student";
const { stdin: input, stdout: output } = process;

const rl = readline.createInterface({ input, output });

const filePath = path.resolve(__dirname, "docs", "danh-sach.txt");

const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

let transformedData = fileContent
  .split("\r\n")
  .filter(Boolean)
  .map((student) => {
    const [id, name, age, role] = student.split(",");
    return {
      id: parseInt(id, 10),
      name: name,
      age: parseInt(age, 10),
      role: role,
    };
  });

function checkEmptyList() {
  if (transformedData.length === 0) {
    console.log("There is no student");
    return false;
  }
  return true;
}

function askContinueQuestion() {
  rl.question("Continue?: \n1.Yes \n2.No \n", (confirm) => {
    const validOperations = ["1", "2"];

    if (!validOperations.includes(confirm)) {
      console.log("Invalid input. Please enter correctly.");

      askContinueQuestion();
    } else if (Number(confirm) === 1) {
      askQuestion();
    } else if (Number(confirm) === 2) {
      rl.close();
    } else {
      console.log('Invalid input');
      askContinueQuestion();
    }
  });
}

function findById() {
  rl.question("Find student id here: ", (fillId) => {
    const studentData = transformedData.find(
      (student) => student.id === Number(fillId)
    );

    if (studentData) {
      console.log(
        `Id:${studentData.id},\nName: ${studentData.name},\nAge: ${studentData.age},\nRole: ${studentData.role}`
      );
    } else {
      console.log("Student not found.");
      askContinueQuestion();
    }

    askContinueQuestion();
  });
}

function findByName() {
  rl.question("Find student name here: ", (fillName) => {
    const studentData = transformedData.filter(
      (student) => student.name.toLowerCase() === fillName.toLowerCase()
    );

    if (studentData.length === 1) {
      studentData.forEach((student) => {
        console.log(
          `Id:${student.id},\nName: ${student.name},\nAge: ${student.age},\nRole: ${student.role}`
        );
      });
    } else if (studentData.length > 1) {
      rl.setPrompt(
        "There are identical value, please using `Find Id` method \n"
      );
      rl.prompt();

      console.log("");

      studentData.forEach((student) => {
        console.log(
          `Id:${student.id},\nName: ${student.name},\nAge: ${student.age},\nRole: ${student.role}`
        );

        console.log("");
      });

      console.log("");

      findById();
    } else {
      console.log("Student not found.");
      askContinueQuestion();
    }

    askContinueQuestion();
  });
}

function askQuestion() {
  rl.question(
    "Please choose your operation below: \n1.read \n2.find \n3.create \n4.update \n5.delete \n",
    (operate) => {
      const validOperations = ["1", "2", "3", "4", "5"];

      if (!validOperations.includes(operate)) {
        console.log("Invalid input. Please enter correctly.");

        askQuestion();
      } else {
        if (operate !== "3" && !checkEmptyList()) {
          askContinueQuestion();
          return;
        }
        switch (operate) {
          /**
           * ------------------------------------Read
           */
          case "1":
            const data = fs.readFileSync(filePath, "utf-8");

            console.log(data);

            askContinueQuestion();

            break;

          /**
           * ------------------------------------Find
           */
          case "2":
            rl.question(
              "Please choose your find method below: \n1.By Id \n2.By name \n",
              (operate) => {
                const validOperations = ["1", "2"];

                if (!validOperations.includes(operate)) {
                  console.log("Invalid input. Please enter correctly.");

                  askQuestion();
                } else if (Number(operate) === 1) {
                  findById();
                } else if (Number(operate) === 2) {
                  findByName();
                }
                askContinueQuestion();
              }
            );
            break;

          /**
           * ------------------------------------Create
           */
          case "3":
            let newStudentId = transformedData.reduce((maxId, student) => {
              return student.id > maxId ? student.id : maxId;
            }, 0);

            const addStudent = async () => {
              const askQuestion = async (question: string): Promise<string> => {
                return new Promise<string>((resolve) => {
                  rl.question(question, (answer) => {
                    resolve(answer);
                  });
                });
              };

              const fillName = await askQuestion("Fill student name: ");
              const fillAge = await askQuestion("Fill student age: ");
              const fillRole = await askQuestion("Fill student role: ");
              newStudentId++;

              const newStudent = new StudentData(
                newStudentId,
                fillName,
                fillRole,
                parseInt(fillAge)
              );

              transformedData.push(newStudent);

              fs.writeFileSync(
                path.resolve("./docs/danh-sach.txt"),
                transformedData
                  .map(
                    (student) =>
                      `${student.id},${student.name},${student.age},${student.role}`
                  )
                  .join("\r\n"),
                {
                  encoding: "utf8",
                }
              );

              console.log("New student added successfully.");

              askContinueQuestion();
            };

            addStudent();

            break;

          /**
           * ------------------------------------Update
           */
          case "4":
            const updateStudent = async () => {
              const askQuestion = (prompt?: string): Promise<string> => {
                return new Promise<string>((resolve) => {
                  rl.question(prompt || "", (answer) => {
                    resolve(answer);
                  });
                });
              };
              const fillName = await askQuestion(
                "Please choose an incoming updated student id: "
              );
              const filteredStudent = transformedData.find(
                (student) => student.id === Number(fillName)
              );

              if (filePath && filteredStudent) {
                const updatedName = await askQuestion(
                  `Update name (${filteredStudent.name}): `
                );
                const updatedAge = await askQuestion(
                  `Update age (${filteredStudent.age}): `
                );
                const updatedTitle = await askQuestion(
                  `Update title (${filteredStudent.role}): `
                );

                filteredStudent.name = updatedName || filteredStudent.name;
                filteredStudent.age = Number(updatedAge || filteredStudent.age);
                filteredStudent.role = updatedTitle || filteredStudent.role;

                fs.writeFileSync(
                  path.resolve("./docs/danh-sach.txt"),
                  transformedData
                    .map(
                      (student) =>
                        `${student.id},${student.name},${student.age},${student.role}`
                    )
                    .join("\r\n"),
                  {
                    encoding: "utf8",
                  }
                );

                console.log("Student information updated successfully.");
              } else {
                console.log("Not found.");
              }

              askContinueQuestion();
            };

            updateStudent();

            break;

          /**
           * ------------------------------------Delete
           */
          case "5":
            rl.question(
              "Please choose a student id to delete: ",
              (fillName) => {
                let filteredData = transformedData.filter(
                  (student) => student.id !== Number(fillName)
                );

                let incomingDeleteStudent = transformedData.find(
                  (student) => student.id === Number(fillName)
                );

                if (
                  incomingDeleteStudent &&
                  filteredData.length < transformedData.length
                ) {
                  console.log(
                    `Id:${incomingDeleteStudent.id},\nName: ${incomingDeleteStudent.name},\nAge: ${incomingDeleteStudent.age},\nRole: ${incomingDeleteStudent.role}`
                  );

                  console.log("");

                  rl.question(
                    "Are you sure to delete this student?: \n1.Yes \n2.No \n",
                    (operate) => {
                      const validOperations = ["1", "2"];

                      if (!validOperations.includes(operate)) {
                        console.log("Invalid input. Please enter correctly.");

                        askQuestion();
                      } else if (Number(operate) === 1) {
                        transformedData = filteredData;

                        fs.writeFileSync(
                          path.resolve("./docs/danh-sach.txt"),
                          filteredData
                            .map(
                              (student) =>
                                `${student.id},${student.name},${student.age},${student.role}`
                            )
                            .join("\r\n"),
                          {
                            encoding: "utf8",
                          }
                        );

                        console.log("Student deleted successfully.");

                        askContinueQuestion();

                      } else if (Number(operate) === 2) {
                        askQuestion();
                      }
                      askContinueQuestion();
                    }
                  );
                } else {
                  console.log("Student not found.");
                }

                askContinueQuestion();
              }
            );

            break;

          default:
            askContinueQuestion();
            break;
        }
      }
    }
  );
}
askQuestion();
