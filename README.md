# Auto Report Script

Script tự động báo cáo bài viết trên mạng xã hội.

## Cách sử dụng

Có 3 cách để chạy script này trên trình duyệt:

### Cách 1: Sử dụng Bookmarklet (Đơn giản nhất)

1. Tạo một bookmark mới trong trình duyệt
2. Đặt tên là "Auto Report"
3. Trong phần URL/Địa chỉ, dán toàn bộ nội dung từ file `embedded-bookmarklet.txt`
4. Lưu bookmark
5. Khi bạn muốn báo cáo các bài viết, mở trang web và nhấp vào bookmark "Auto Report"

### Cách 2: Sử dụng Console

1. Mở trang web bạn muốn báo cáo
2. Mở Developer Console bằng cách nhấn F12 hoặc Ctrl+Shift+I
3. Sao chép và dán toàn bộ nội dung từ file `browser-runner.js` vào console
4. Nhấn Enter để thực thi

### Cách 3: Nhúng Script trực tiếp

```javascript
const script = document.createElement('script');
script.src = 'https://raw.githubusercontent.com/PS22859/auto_report/main/auto-report.js';
document.body.appendChild(script);
```

## Lưu ý

Script này tìm kiếm các bài viết trên trang web và tự động báo cáo chúng với lý do "Thông tin sai sự thật, lừa đảo hoặc gian lận" → "Gian lận hoặc lừa đảo". 

javascript:(function(){const script=document.createElement('script');script.src='https://raw.githubusercontent.com/PS22059/auto_report/main/auto-report.js';document.body.appendChild(script);})(); 