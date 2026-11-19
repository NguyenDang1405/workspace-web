# TASK DETAIL, PR VERIFICATION & ACADEMIC SUBMISSION SPECS (MODULE 4)
**Dự án:** Smart Workspace — B2B SaaS & Academic Project Management Platform  
**Phạm vi:** 3 Màn hình xử lý & nghiệm thu tác vụ chuyên sâu (Frame 19, Frame 20, Frame 21)  
**Tài liệu tham chiếu gốc:** `markdown/UI_DESIGN_SYSTEM_AND_SPECS.md`

---

## 1. CÁC CHỈ THỊ SỬA LỖI MÀU SẮC, BỐ CỤC & TEXT TỪ MOCKUP (BẮT BUỘC SỬA KHI CODE)

Khi chuyển từ 3 ảnh thiết kế sang mã nguồn thực tế, AI Coding Agent **BẮT BUỘC** phải tự động khắc phục các điểm sai lệch trên mockup sau đây:

1. **Sửa lỗi tràn ngang (Horizontal Overflow) trên Ngăn Kéo Chi Tiết (Frame 19)**:
   - Trong ảnh thiết kế Frame 19, các phần tử bên phải của ngăn kéo trượt (`Drawer`) đang bị cắt mất mép phải (như chỉ số phần trăm thanh tiến độ Checklist, hộp *Gợi ý từ AI Lập Lịch* và nút chính *Chuyển Sang Chờ Duyệt (Review) →*)[cite: 33].
   - **Chỉ thị sửa**: Thiết lập chiều rộng ngăn kéo responsive (`w-full max-w-[680px]`, `overflow-x-hidden`, `px-6`), đảm bảo toàn bộ thanh tiến độ `5 / 8 Bước (62%)`, nội dung hộp *Gợi ý từ AI Lập Lịch* và 2 nút ở Footer hiển thị trọn vẹn 100% bên trong khung ngăn kéo[cite: 33].
   - Xóa các nhãn meta thừa như `• PHÂN HỆ 4: ĐIỀU HÀNH & LẬP LỊCH` trên thanh công cụ phụ của Kanban nền[cite: 33].
2. **Sửa lỗi khoảng trống thừa & Chuẩn hóa màu sắc trên Màn hình PR Diff (Frame 20)**:
   - Trong ảnh Frame 20, khung trình xem Code Diff bên trái đang có khoảng trắng trống quá lớn phía dưới dòng 53[cite: 35]. **Chỉ thị sửa**: Cho khung Code Diff co giãn tự nhiên theo nội dung (`h-auto` hoặc lấp đầy cân đối với cột phải), bỏ khoảng trống thừa[cite: 35].
   - **Sửa màu badge**: Đổi badge `ĐẠT CHUẨN MERGE` (nền tím bo tròn to) về đúng chuẩn Modern SaaS (`rounded-md`, nền `#EEF2FF`, viền `1px solid #C7D2FE`, chữ `#4F46E5`, text nằm gọn 1 dòng)[cite: 35]. Đổi thẻ `Khuyến Nghị Tối Ưu Nhỏ` và `Task Liên Quan` từ nền tím nhạt sang nền trung tính `#FAFAFA` / `#F8FAFC` với viền `1px solid #E2E8F0`[cite: 35].
   - **Sửa Breadcrumbs Frame 21**: Trên ảnh Frame 21, tiêu đề chính là `#TASK-06` nhưng Breadcrumbs lại ghi nhầm là `#TASK-01`[cite: 34] — bắt buộc sửa lại Breadcrumbs thành `Bảng Công Việc (Kanban) / Nộp Sản Phẩm #TASK-06`.
3. **Chuẩn hóa Checkbox & Màu Accent (Frame 21)**:
   - Trên ảnh Frame 21, 3 ô checkbox trong mục *Tiêu chí tự kiểm tra chất lượng (Self-Audit)* đang dùng màu xanh dương sáng khác tông[cite: 34] — bắt buộc chuẩn hóa về màu **Royal Indigo (`#4F46E5`)** đồng nhất với toàn hệ thống.
   - Đổi badge `2 / 2 ĐÃ NHẬN XÉT` (góc phải khung Peer-Review) từ hình viên thuốc bầu bĩnh sang chuẩn `rounded-md` (`6px`), text nằm trên 1 dòng[cite: 34].
4. **Khóa Icon & Logo Động**:
   - Mọi icon trên cả 3 màn hình bắt buộc gọi từ `AppIcons` (`src/components/icons/AppIcons.tsx`, `strokeWidth={1.5}`).
   - Toàn bộ vị trí logo ở Sidebar đều sử dụng `<BrandLogoMark />` cấp phát động từ Cloudinary SDK (`useBrand()`).

---

## 2. ĐẶC TẢ CHI TIẾT 3 MÀN HÌNH XỬ LÝ TÁC VỤ

### Màn hình 1: Chi Tiết Tác Vụ & Khay Trượt Hướng Dẫn Thích Ứng AI (Frame 19)
- **Ngữ cảnh hiển thị**: Mở dạng ngăn kéo trượt bên phải (`Slide-over Drawer`) đè lên không gian bảng Kanban (`/kanban?task=TASK-01`)[cite: 33].
- **Header Ngăn Kéo**:
  - Mã `#TASK-01` (`Roboto Mono Bold`), tag `CPM CRITICAL` (`#FFF1F2` bg, `#BE123C`), tag `IN_PROGRESS` (`#F1F5F9` bg, `#334155`), nút đóng `X`[cite: 33].
  - Tiêu đề: *"Hiện thực hóa thuật toán tính toán đường găng DAG CPM"*[cite: 33].
  - Dòng metadata: Avatar `ĐN` *"Đặng Hồng Nguyên"* • `24h (5 SP)` • `Slack: 0h` (`#BE123C` Bold) • `Phụ thuộc: #TASK-00 (Đã xong)`[cite: 33].
- **Nội dung bên trong Ngăn Kéo**:
  1. **Khối Mục Tiêu Công Việc & Tiêu Chí Nghiệm Thu**: Khung `#FAFAFA`, viền `1px solid #E2E8F0`, `rounded-lg`, hiển thị mô tả kỹ thuật đầy đủ (không cắt chữ)[cite: 33].
  2. **Checklist Hướng Dẫn Động (AI Adaptive Guidance)**:
     - Header kèm thanh tiến độ mini (`#4F46E5`) và chỉ số `5 / 8 Bước (62%)`[cite: 33].
     - **4 nhóm phân loại tương tác được** (click để tick/untick checkbox `#4F46E5` và tự động cập nhật phần trăm tiến độ):
       - *YÊU CẦU TIÊN QUYẾT* (2 bước đã hoàn tất, gạch ngang chữ mờ)[cite: 33].
       - *TRIỂN KHAI* (2 bước đã xong, 1 bước đang focus in đậm)[cite: 33].
       - *KIỂM THỬ* (1 bước đã xong, 1 bước chưa làm)[cite: 33].
       - *BẢO MẬT* (1 bước chưa làm)[cite: 33].
  3. **Hộp Gợi Ý Từ AI Lập Lịch**: Khung cảnh báo nhẹ giải thích tác động trễ đường găng (`Slack = 0`) nếu chậm tiến độ[cite: 33].
- **Footer Ngăn Kéo**: Ghi chú đồng bộ Kanban bên trái + 2 nút `Cập Nhật Tiến Độ` và `Chuyển Sang Chờ Duyệt (Review) →` (`#4F46E5`)[cite: 33].

---

### Màn hình 2: Thẩm Định Pull Request & So Sánh Code Diff AI (Frame 20 — Dành cho IT)
- **Route / Ngữ cảnh**: `/kanban/pr-review/PR-42` (Sidebar Active: `Bảng Công Việc (Kanban)`)[cite: 35].
- **Header Pull Request**:
  - Badges: `GITHUB WEBHOOK • PR #42`, `CPM CRITICAL • #TASK-01` (`#BE123C`), `CI Passing` (`#0D9488`)[cite: 35].
  - Tiêu đề: *"feat(cpm): tối ưu thuật toán Kahn Topological Sort và xác thực RBAC"*[cite: 35].
  - Nhánh Git: `feature/dag-cpm-engine` → `main` • `Commit 8f4c21a bởi Đặng Hồng Nguyên (14 phút trước)`[cite: 35].
  - Nút hành động: `Yêu Cầu Sửa Lại` (Outlined) và `Phê Duyệt PR & Chuyển DONE` (`#4F46E5`)[cite: 35].
- **Bố cục 2 Cột (`grid-cols-12 gap-4`)**:
  - **Cột trái (8 cột — Trình Xem Git Code Diff)**:
    - Thanh tiêu đề tệp: `app/services/cpm_scheduler.py` (`modified`) | `+18 dòng` (`#0D9488`) / `-6 dòng` (`#BE123C`) | `Python 3.11`[cite: 35].
    - Nội dung mã nguồn `Roboto Mono` đánh số dòng từ `41` đến `53`: Dòng xóa (`-`) nền `#FFF1F2` chữ `#BE123C`; dòng thêm (`+`) nền `#F0FDF4` chữ `#0D9488` (hiển thị rõ đoạn vá lỗi SQL Injection sang Parameterized Query và kiểm tra RBAC)[cite: 35].
    - Thanh chân khung: `Không có xung đột mã nguồn (Mergeable clean)` + link `Xem trọn vẹn tệp (84 dòng) →`[cite: 35].
  - **Cột phải (4 cột — Thẩm Định Chất Lượng AI)**:
    - **Điểm Chất Lượng Mã Nguồn**: `92 / 100` (`Roboto Mono Bold #4F46E5`) + thanh tiến độ + 2 ô chỉ số `ĐỘ PHỨC TẠP: O(V + E)` và `TEST COVERAGE: 94.5%`[cite: 35].
    - **Phân Tích Bảo Mật (SAST)**: 2 thẻ xác nhận `ĐÃ KHẮC PHỤC • SQL INJECTION` và `RBAC OWNERSHIP PASS`[cite: 35].
    - **Khuyến Nghị Tối Ưu Nhỏ**: 2 gợi ý cải tiến kỹ thuật (type hint & Redis cache)[cite: 35].
    - **Thẻ Task Liên Quan**: Liên kết nhanh về `TASK-01` (`IN REVIEW`)[cite: 35].

---

### Màn hình 3: Nộp Sản Phẩm Học Thuật & Đánh Giá Chéo (Frame 21 — Dành cho Sinh viên / Phi IT)
- **Route / Ngữ cảnh**: `/kanban/submission/TASK-06` (Sidebar Active: `Bảng Công Việc (Kanban)`)[cite: 34].
- **Header & 4 Thẻ Chỉ Số Nhanh**:
  - Badges: `ACADEMIC ARTIFACT • NON-GIT`, `HẠN CHÓT: 15/11/2026` (`#BE123C`), `Sprint 04` (`#0D9488`)[cite: 34].
  - Tiêu đề: *"Nộp Báo Cáo Tổng Hợp & Tài Liệu Thuyết Trình (#TASK-06)"* + 2 nút `Lưu Bản Nháp` và `Nộp Sản Phẩm & Gửi Duyệt` (`#4F46E5`)[cite: 34].
  - 4 KPI cards: `Trạng thái bàn giao: Đang hoàn tất`, `Dung lượng tệp: 2.4 MB / 50 MB`, `Độ tin cậy Rubric: 96.8%`, `Phản hồi chéo: 2 / 2 Người`[cite: 34].
- **Bố cục 2 Cột (`grid-cols-12 gap-4`)**:
  - **Cột trái (7 cột — Form Nộp Hồ Sơ & Tự Kiểm Tra)**:
    - Tab chọn định dạng tương tác: `[ Tài Liệu Word / PDF | Canva / Slides | Video Thuyết Minh ]`[cite: 34].
    - Vùng kéo thả tệp (`.docx, .pdf, .pptx`) + Thẻ tệp đã tải lên `Bao_Cao_Phan_Tich_He_Thong_v2.docx` (`VERIFIED`, `2.4 MB`, nút xem trước & nút xóa)[cite: 34].
    - Ô nhập liên kết bổ sung (`https://docs.google.com/presentation/d/...`) kèm tag `Quyền xem: Công khai`[cite: 34].
    - Khung nhập *Tóm Tắt Nội Dung Bài Làm & Điểm Nổi Bật* (có bộ đếm `248 / 600 từ`)[cite: 34].
    - Khối *Tiêu chí tự kiểm tra chất lượng (Self-Audit)* với 3 checkbox màu `#4F46E5` (`3/3 TIÊU CHÍ HOÀN TẤT`)[cite: 34].
  - **Cột phải (5 cột — Đánh Giá Chéo Peer-Review)**:
    - Điểm trung bình đồng cấp: `9.2 / 10.0` (chi tiết `Tính chuẩn xác: 9.5`, `Hình thức: 9.0`, `Tiến độ: 9.2`)[cite: 34].
    - 2 thẻ nhận xét từ thành viên nhóm: **Tuấn Lê** (`ĐẠT YÊU CẦU`) và **Hòa Nguyễn** (`GÓP Ý NHỎ`)[cite: 34].
    - Form nhập nhận xét đánh giá chéo mới + nút `Gửi`[cite: 34].
    - Thẻ thông tin *Chính Sách Chấm Tự Động & Lưu Trữ* (mã băm SHA-256)[cite: 34].