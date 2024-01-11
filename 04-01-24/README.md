TS phải đổi sang JS
Mún chạy TS trực tiếp phải dùng esno: esno sủ dụng esbuild để transpile TS thành JS chạy trên nodejs => CÓ KHẢ NĂNG BỎ QUA LỖI ts ĐỂ CHẠY TRÊN BROWSER

Js là object-based-langugage, ngôn ngữ thông dịch V8 :
. Số 1 (number) là đc kế thừa(extend) từ object number._pronto_
. String({}) luôn mặc định trả về: [object Object]
. Tất cả đối tượng trog js đều có mehod toString() để in ra console

Bản chất của class trong js (vì js không phải OOP mà có lớp: có cách tính chất của OOP):
. có _proto_ (object gốc mà nó kế thừa )
. js chỉ xuay quanh object
. js có kiểu dữ liệu HÀM ( hasOwnProperty )

Thuộc tinh và phương thức:
. Phương thức có thể thực thi đc

Trong js có ... cách khởi tạo đối tượng:

1. Object initialize expression (biểu thức khởi tạo, tạo ra object vô danh): let a = {}

2. Object function constructor : khởi tạo bằng class (đặt tên object theo class => object hữu danh, sử dụng trong java & c++)
   vd:
   class Student {
    constructor(name,age,role) {
        this.name = name;
        this.age = age;
        this.role = role;
   }
   let newStudent = new Student('A',24,'FE')
   }

3. {... <tên object>} (hạn chế sử dụng nếu trong object có nested object)
   Nếu trong object có nested object:
   a. JSON.parce(JSON.stringtify(<tên object>)) (ảnh hưởng nặng đến performance nếu mảng quá lớn và cả tham chiếu nếu mảng lồng mảng)
   b. Dùng đệ quy (recursion)
   c. Lodash

Tham chiếu và tham trị:(deep clone and shallow clone)

1.  Tham trị: TRỎ đến giá trị của biến gốc
2.  Tham chiếu: TRỎ đến vùng nhớ(địa chỉ ) của object gốc
    vd:
    const a = {count: 1}

           let b = a (b đang trỏ đến vùng nhớ của a hay a,b đang sử dung chung vùng nhớ của a)

           b.count++ => 2

           a = {count: 2} (dù đang edit b )

Web component: không yêu cầu công nghệ (giống như thẻ input, box, ... của html)

Build-system: capacitor, quasar, vue native, native script, ionic

Destop app: Electron (vscode)
