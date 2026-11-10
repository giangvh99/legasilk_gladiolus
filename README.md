# Legasilk - Website Trải Nghiệm & Hướng Dẫn Dệt Kẹp Sách Lụa Vạn Phúc
> **Dự án Khởi nghiệp Team Gladiolus — Cuộc thi Star Award 2026**  
> *"Làng nghề trong tầm tay em / A village you can weave"*

---

## 🌟 Giới Thiệu Dự Án

**Legasilk** là bộ kit thủ công DIY (Do-It-Yourself) dành cho học sinh tiểu học (6–11 tuổi) để tự tay dệt nên một chiếc kẹp sách (bookmark) xinh xắn từ lụa tơ tằm Vạn Phúc truyền thống. Bộ kit kết nối di sản văn hóa nghìn năm với phương pháp giáo dục trải nghiệm xúc giác (hands-on experiential learning), giúp trẻ em rời xa màn hình số và bám sát Chương trình Giáo dục Phổ thông 2018 (môn Hoạt động trải nghiệm & Giáo dục địa phương lớp 3).

Trang web này được xây dựng hoàn chỉnh dưới dạng **Static Web (HTML5/CSS3/JavaScript thuần)**, sẵn sàng để đưa lên **GitHub Pages** chỉ với vài thao tác đơn giản.

---

## 🎨 Điểm Nổi Bật Của Website

1. **Màu sắc rực rỡ như lụa gấm:**
   - Gam màu ngọc lụa truyền thống: Đỏ Ruby (`#FF3366`), Vàng Tơ Tằm (`#FFB703`), Xanh Ngọc Lục Bảo (`#00D2B4`), Tím Gấm (`#8338EC`), phối cùng nền kem lụa ấm áp (`#FFFDF9`).
2. **Chi tiết hoạt hình đáng yêu cho học sinh tiểu học:**
   - Linh vật **"Bé Tằm Tí Hon"** (Silky the Silkworm) đội nón lá xinh xắn, cầm thoi dệt và dải lụa ngũ sắc.
   - Các nút bấm dạng 3D cartoon bo tròn mềm mại, chuyển động bập bênh thân thiện.
   - Hộp thoại bí kíp mách nước cho bé tại từng bước dệt.
3. **Trạm học tương tác - Trọng tâm Video Hướng Dẫn:**
   - Nhúng trực tiếp video hướng dẫn thực tế chính thức của Legasilk từ YouTube (ID: `45Z-nhVSojE`).
   - Khung phát video chuẩn 16:9 sắc nét, âm thanh sống động, tương thích hoàn hảo trên cả máy tính và điện thoại.
   - Bảng 4 bước cốt lõi tương ứng trong video giúp học sinh và giáo viên dễ dàng theo dõi.
   - Cẩm nang tóm tắt in nhanh 1 trang A4 (`window.print()`) dành cho giáo viên và phụ huynh.
4. **Song ngữ Tiếng Việt / Tiếng Anh (Bilingual Switcher):**
   - Chuyển đổi ngôn ngữ tức thì với 1 cú click (giữ trạng thái qua `localStorage`), dịch toàn bộ 100% nội dung trang web.
5. **Cảm hứng Làng Lụa Vạn Phúc & Infographic Vòng đời Tơ Tằm:**
   - Hình ảnh cổng làng Vạn Phúc, phố ô lụa sắc màu, dấu ấn lịch sử Bác Hồ viết Lời kêu gọi Toàn quốc kháng chiến (12/1946).
   - Infographic 4 bước: *Trồng dâu nuôi tằm -> Kén tằm nhả tơ -> Ươm tơ nhuộm màu -> Bé tự dệt kẹp sách*.
6. **Bảng tính giá & Chiết khấu trường học:**
   - Tự động tính tiền và mức giảm giá (20% - 30%) khi đặt số lượng lớn cho trường học hoặc lớp học.

---

## 📁 Cấu Trúc Thư Mục

```text
star-award-2026/
├── index.html                   # Trang chủ chính với đầy đủ 5 sections
├── .nojekyll                    # Đảm bảo GitHub Pages nhận đầy đủ assets
├── README.md                    # Tài liệu hướng dẫn sử dụng và triển khai
├── css/
│   └── style.css                # Toàn bộ CSS phong cách hoạt hình & màu lụa
├── js/
│   ├── i18n.js                  # Bộ từ điển song ngữ Tiếng Việt & English
│   └── main.js                  # Điều khiển video, chuyển ngôn ngữ, tính giá, form
└── assets/
    └── images/
        ├── legasilk-logo.jpg    # Logo chính thức thương hiệu Legasilk
        ├── kit-bundle.jpg       # Ảnh chụp thực tế bộ sản phẩm Dệt Ước Mơ Legasilk
        ├── van-phuc-village.jpg # Ảnh thực tế cổng Làng Lụa Vạn Phúc & phố ô sắc màu
        ├── hero-mascot.svg      # Linh vật Bé Tằm đội nón lá dệt lụa
        ├── silk-lifecycle.svg   # Infographic vòng đời tơ tằm cho bé
        ├── bookmark-samples.svg # Bộ sưu tập 4 mẫu kẹp sách hoa xinh và quả trám
        ├── mascot-tip.svg       # Avatar Bé Tằm cho bong bóng lời thoại mẹo nhỏ
        ├── video-thumb-1.svg    # Thumbnail minh họa Video Bài 1
        ├── video-thumb-2.svg    # Thumbnail minh họa Video Bài 2
        ├── video-thumb-3.svg    # Thumbnail minh họa Video Bài 3
        └── video-thumb-4.svg    # Thumbnail minh họa Video Bài 4
```

> **Lưu ý:** Tất cả ảnh minh họa đều là file SVG vector sắc nét độc quyền, được thiết kế riêng cho dự án, hoạt động 100% offline mà không phụ thuộc vào đường link ảnh ngoài, không bao giờ lo bị lỗi ảnh hay chết link.

---

## 🚀 Hướng Dẫn Đưa Lên GitHub Pages (Từng Bước)

Chỉ mất khoảng **2 - 3 phút** để trang web của bạn hiển thị trực tuyến:

### Bước 1: Khởi tạo và đẩy code lên GitHub
Mở terminal (PowerShell / Git Bash) tại thư mục dự án và chạy:

```bash
# 1. Khởi tạo Git repo
git init

# 2. Thêm tất cả file
git add .

# 3. Tạo commit đầu tiên
git commit -m "Initial commit for Legasilk website"

# 4. Đổi tên nhánh sang main
git branch -M main

# 5. Kết nối với repo trên GitHub của bạn (thay username và repo-name của bạn)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Đẩy code lên GitHub
git push -u origin main
```

### Bước 2: Bật tính năng GitHub Pages
1. Mở trình duyệt, truy cập vào repository trên GitHub: `https://github.com/<your-username>/<your-repo-name>`
2. Nhấn vào tab **Settings** (ở thanh menu phía trên).
3. Ở menu bên trái, tìm và chọn mục **Pages**.
4. Tại mục **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`
   - **Branch**: Chọn nhánh `main` và thư mục `/ (root)`
   - Nhấn **Save**.
5. Đợi khoảng 1 - 2 phút, GitHub sẽ hiển thị đường link trang web của bạn, có dạng:
   👉 **`https://<your-username>.github.io/<your-repo-name>/`**

---

## 🎬 Video Hướng Dẫn Chính Thức
Video hướng dẫn thực tế trọn bộ các bước dệt kẹp sách Legasilk được phát trực tiếp từ kênh YouTube chính thức của dự án:
👉 **https://www.youtube.com/watch?v=45Z-nhVSojE**

---

## 🏆 Đơn Vị Phát Triển
- **Dự án:** Legasilk — Bộ Kit Dệt Kẹp Sách Lụa Vạn Phúc Cho Trẻ Em
- **Đội thi:** Gladiolus
- **Cuộc thi:** Star Award 2026
- **Liên hệ:** `contact.legasilk@gmail.com`
