TS phải đổi sang JS 
Mún chạy TS trực tiếp phải dùng esno: esno sủ dụng esbuild để transpile TS thành JS chạy trên nodejs => CÓ KHẢ NĂNG BỎ QUA LỖI ts ĐỂ CHẠY TRÊN BROWSER

Js là object-based-langugage :
    . 1 (number) là đc kế thừa(extend) từ object number._pronto_
    . String({}) luôn mặc định trả về:
    < [object Object]
    . Tất cả đối tượng trog js đều có mehod toString() để in ra console

Trong js có ... cách khởi tạo đối tượng:
    1. object initialize expression (object vô danh): {}
    2. object khởi tạo bằng class (đặt tên object theo class => object hữu danh, sử dụng trong java & c++)
    3. {... <tên object>} (hạn chế sử dụng nếu trong object có nested object)
    4. nếu trong object có nested object: 
        a. JSON.parce(JSON.stringtify(<tên object>)) (ảnh hưởng nặng đến performance nếu mãng quá lớn)
        b. Dùng đệ quy (recursion)
        c. Lodash

Tham chiếu và tham trị:(deep clone and shallow clone)
    1.Tham chiếu: TRỎ đến vùng nhớ của object gốc
        const a = {count: 1}

        let b = a (b đang trỏ đến vùng nhớ của a hay a,b đang sử dung chung vùng nhớ của a)

        b.count++ => 2

        a = {count: 2} (dù đang edit b )

Web component:

Build-system: capacitor, quasar, vue native, native script, ionic

Destop app: Electron (vscode)


