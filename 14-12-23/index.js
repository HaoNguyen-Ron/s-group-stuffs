const fs = require('fs')
const path = require('path')
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });


// const fileContent = fs.readFileSync(
//     path.resolve('./danh-sach.txt'),
//     {
//         encoding:'utf8'
//     }
// )

// const danhsach = fileContent.split('\n').filter(Boolean).map( list => {
//     const [name, age, title] = list
//     console.log('««««« name, age, »»»»»', name, age, title);
// }
// )

rl.question('Nhập tên nhân viên? ', (answer) => {
    let doContinue = true;
    while (doContinue) {
        console.log(`Tên nhân viên đó là: ${answer}`);

        rl.question('Có muốn tìm tên tiếp không?', (confirm) => {
            if (confirm === 'yes') {
                rl.question('Nhập tên nhân viên? ', (answer) => {
                    console.log(`Tên nhân viên đó là: ${answer}`);
                })
            } else if (confirm === 'no') {
                doContinue = false
            }
        })
    }

    rl.close();
});

