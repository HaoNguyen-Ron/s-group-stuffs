import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { StudentData } from "./student";

const { stdin: input, stdout: output } = process;
const rl = readline.createInterface({ input, output });

const filePath = path.resolve(__dirname, "docs", "danh-sach.txt");

const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

const transformedData = fileContent.split("\r\n").map((student) => {
  const [id, name, age, role] = student.split(",");
  return {
    id: parseInt(id, 10),
    name: name,
    age: parseInt(age, 10),
    role: role,
  };
});

const listFilePath = path.resolve(__dirname, "docs", "arrayList.txt");
fs.writeFileSync(listFilePath, JSON.stringify(transformedData, null, 2), {
  encoding: "utf8",
});

function askContinueQuestion() {
  rl.question("Continue? (yes/no): ", (confirm) => {
    if (confirm === "yes") {
      askQuestion();
    } else if (confirm === "no") {
      rl.close();
    } else {
      console.log('Invalid input. Please enter "yes" or "no".');
      askContinueQuestion();
    }
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
        switch (operate) {
          case "1":
            // transformedData.map((student) =>
            //     console.log(
            //         `Id:${student.id},\nName: ${student.name},\nAge: ${student.age},\nTitle: ${student.role}`
            //     )
            // );

            try {
              const data = fs.readFileSync(filePath, "utf-8");
              console.log(data);
            } catch (err) {
              console.error(err);
            }

            askContinueQuestion();

            break;

          case "2":
            rl.question("Find student id here: ", (fillName) => {
              const studentData = transformedData.filter(
                (student) => student.id === Number(fillName)
              );

              if (studentData.length > 0) {
                studentData.forEach((student) => {
                  console.log(
                    `Id:${student.id},\nName: ${student.name},\nAge: ${student.age},\nRole: ${student.role}`
                  );
                });
              } else {
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
            let newStudentId = transformedData.length + 1;
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

            case "5":
              rl.question("Please choose a student id to delete: ", (fillName) => {
                let filteredData = transformedData.filter(
                  (student) => student.id !== Number(fillName)
                );
            
                if (filteredData.length < transformedData.length) {
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
                } else {
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
    }
  );
}
askQuestion();
