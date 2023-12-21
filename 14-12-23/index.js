const fs = require('fs')
const path = require('path')
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

const filePath = path.resolve(__dirname, 'docs', 'danh-sach.txt');

const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' }, (err) => {
    if (err) {
        console.log('««««« err »»»»»', err);
    }
});

const transformedData = fileContent.split('\r\n').map(student => {
    const [name, age, title] = student.split(',');
    return {
        name: name,
        age: parseInt(age, 10),
        title: title
    };
});

const listFilePath = path.resolve(__dirname, 'docs', 'list.txt');
fs.writeFileSync(listFilePath, JSON.stringify(transformedData, null, 2), { encoding: 'utf8' });

function askContinueQuestion() {
    rl.question('Continue? (yes/no): ', (confirm) => {
        if (confirm === 'yes') {
            askQuestion();
        } else if (confirm === 'no') {
            rl.close();
        } else {
            console.log('Invalid input. Please enter "yes" or "no".');
            askContinueQuestion();
        }
    });
}
function askQuestion() {
    rl.question('Please choose your operation(read| find| create| update| delete): ', (operate) => {
        const validOperations = ['read', 'find', 'create', 'update', 'delete'];

        if (!validOperations.includes(operate)) {
            console.log('Invalid input. Please enter correctly.');
            askQuestion();
        } else {
            switch (operate) {
                case 'find':
                    rl.question('Find student name here: ', (fillName) => {
                        const studentData = transformedData.filter(line => line.name.toLowerCase() === fillName.toLowerCase());

                        if (studentData.length > 0) {
                            studentData.forEach(student => {
                                console.log(`Name: ${student.name},\nAge: ${student.age},\nTitle: ${student.title}`);
                            });
                        } else {
                            console.log('Student not found.');
                        }

                        askContinueQuestion();
                    });
                    break;

                case 'read':
                    transformedData.map(student => (
                        console.log(`Name: ${student.name}, Age: ${student.age}, Title: ${student.title}`)
                    ));

                    askContinueQuestion();

                    break;
                case 'create':
                    let newStudent = {
                        name: '',
                        age: '',
                        title: ''
                    }
                    rl.question('Fill student name: ', (fillName) => {
                        newStudent.name = fillName;

                        rl.question('Fill student age: ', (fillAge) => {
                            newStudent.age = fillAge;

                            rl.question('Fill student title: ', (fillTitle) => {
                                newStudent.title = fillTitle;

                                transformedData.push(newStudent);

                                fs.writeFileSync(
                                    path.resolve('./docs/danh-sach.txt'),
                                    transformedData.map(student => `${student.name},${student.age},${student.title}`).join('\r\n'),
                                    {
                                        encoding: 'utf8'
                                    }
                                );

                                console.log('New student added successfully.');

                                askContinueQuestion();
                            });
                        });
                    });

                    break;
                case 'update':
                    rl.question('Please choose an incoming updated student name: ', (fillName) => {
                        const filteredStudent = transformedData.find(line => line.name.toLowerCase() === fillName.toLowerCase());

                        if (filteredStudent) {
                            rl.question(`Update name (${filteredStudent.name}): `, (updatedName) => {
                                rl.question(`Update age (${filteredStudent.age}): `, (updatedAge) => {
                                    rl.question(`Update title (${filteredStudent.title}): `, (updatedTitle) => {

                                        filteredStudent.name = updatedName || filteredStudent.name;
                                        filteredStudent.age = updatedAge || filteredStudent.age;
                                        filteredStudent.title = updatedTitle || filteredStudent.title;

                                        fs.writeFileSync(
                                            path.resolve('./docs/danh-sach.txt'),
                                            transformedData.map(student => `${student.name},${student.age},${student.title}`).join('\r\n'),
                                            {
                                                encoding: 'utf8'
                                            }
                                        );

                                        console.log('Student information updated successfully.');

                                        askContinueQuestion();
                                    });
                                });
                            });
                        } else {
                            console.log('Student not found.');
                            askQuestion();
                        }
                        askContinueQuestion();
                    });
                    break;
                case 'delete':
                    rl.question('Please choose a student name to delete: ', (fillName) => {
                        const filteredData = transformedData.filter(student => student.name.toLowerCase() !== fillName.toLowerCase());

                        if (filteredData.length < transformedData.length) {
                            transformedData = filteredData;

                            fs.writeFileSync(
                                path.resolve('./docs/danh-sach.txt'),
                                transformedData.map(student => `${student.name},${student.age},${student.title}`).join('\r\n'),
                                {
                                    encoding: 'utf8'
                                }
                            );

                            console.log('Student deleted successfully.');
                        } else {
                            console.log('Student not found.');
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

