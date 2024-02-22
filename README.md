# s-group-stuffs

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

/**------------------------------------------------------------------------------------------------ */

A) js Date():
. Daylight saving ( các hệ điều hành đêu xử lý ) => gây ra conflict nếu tự handle hàm,...

. GG chrome tính date theo hệ điều hành của pc, nhưng trình duyệt khác cho user thay đổi -> conflict
    => Nên hỏi kỹ tester giao việc để lấy thông tin cụ thể (browsers, operating sys, timezone...)
    => Nên gửi cả timezone của mình đến BE: Date().getUTCDate

. Khi làm việc với Datepicker: nên chỉ lấy value date (DD), nhưng vẫn có thể format giá trị, hiển thị nếu muốn lấy hết:
    + date-format, value-format: là một hàm, cần truyền 1 giá trị ngày tháng năm và format cần biến đổi(vd: DD/MM/YYYY, dd/mm/yyyy,...)
        vd: datejs(<date-parameter>).format('DD/MM/YYYY)

. Các thư viện xử lý date: 
    + day.js (nhẹ nhất, chỉ bao gồm các hàm tối thiểu)
    + movement.js (quá nặng, có nhiều hàm k xài đến, kèm nhiều đa ngôn ngữ, không có khả năng tách từng phương thức, components,...)
    + date-fns (có khả năng import từng hàm cần thiết, nhiều hàm)
    + Vcalendar (vue: có khả năng custom tốt)

. date object in js (ngày tháng năm bắt đầu bằng số 0 trong js):
    + date.getDay()
    + date.getMoth()
    => Nên check xem new Date(<date-parameter>) cố hỗ trợ kiểu date đố hay k trước khi sử dụng
    => tool sensor trong gg chrome: tiện lợi khi làm đa ngôn ngữ (làm việc với nc nào thì giả lập)

. intl.DateTimeFormat('de-DE').format(new Date()) 
    -> 1.1.2024
  ...(en-US) 
    -> 1/1/2024


B) Biến của scss và css
    + biến css khi khai báo ở root: vẫn sẽ còn trong source code
    + khi dùng scss nếu cần nên chuyển về giá trị thực sự của css:
        vd: $hehe: #d3d3

            :root{
                --haha: #d3d3d3
                --hehe: [$hehe]
            }


C) multilingual code: i18n, getText

getText
 <translate>
$getText... : 

//-----------------------------------node--------------------------------------------//

D) path
__dirname
relative path and absolute path 

just add: import path from 'path' in any file that relates to direction

E) fs, rl, writefile


F) search engine : 
+ algolia : using AI and algorithm to handle fast res, including data friendly and fuzzy search
+ fuse.js : fuzzy search
+ typescript: tsc (default) or esno (npm)

const : ngắn k cho user sử dụng toán tử gán
let: có scope, nếu ra khỏi scope đó nó sẽ bị xóa
var: 


G) Vòng for là một mệnh đề

H) Sau khi code html, css vue (có v-if, v-show) sẽ chạy qua một fuction render trả về giá trị (là một biểu thức):
    . v-for: _renderList ~ map()


//-----------------------------------vue--------------------------------------------//

.V modal: 2 ways binding: compiler sẽ phiên dịch sang 2 phía: parent bind cho children và children sẽ bắn (emit) sự kiện lên parent để thay đổi giá trị mà parent đã bind 

.3 thứ quan trọng để suy xét 1 framework FE: Reactivity, Lifecycle, Redering

. v-for: Compile ra map()


    

