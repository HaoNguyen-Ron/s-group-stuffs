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
    + khi dùng scss nếu cần nên chuyển về biến css:
        vd: $hehe: #d3d3

            :root{
                --haha: #d3d3d3
                --hehe: [$hehe]
            }

