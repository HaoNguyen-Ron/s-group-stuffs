null là object nhưng object k phải là null

Đối với những framework sử dụng VDOM sẽ là:
    . Object lưu trữ element hoặc một cây DOM (vì vẫn có thể sử dụng createElement trong VNODE)
    . Được bọc trong một container(vì nếu k có container vd: <div id='App'></div> khi sử dụng hàm appendChild() browser sẽ k biết append vào vị trí nào trong file index.html)
    . Tất cả sẽ tham chiếu đến RDOM, tức khi thao tác trên object của VDOM sẽ thay đổi luôn RDOM (HEAP)