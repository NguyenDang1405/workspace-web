# ANALYTICS, DAILY STANDUP & MONTE CARLO SIMULATION SPECS (MODULE 5)
**Dự án:** Smart Workspace — B2B SaaS & Academic Project Management Platform  
**Phạm vi:** 2 Màn hình báo cáo tự động & phân tích rủi ro dự báo (Frame 22, Frame 23)  
**Tài liệu tham chiếu gốc:** `markdown/UI_DESIGN_SYSTEM_AND_SPECS.md`

---

## 1. CÁC CHỈ THỊ SỬA LỖI NGHIÊM TRỌNG TỪ MOCKUP (BẮT BUỘC SỬA KHI CODE)

Khi chuyển từ 2 ảnh thiết kế sang mã nguồn thực tế, AI Coding Agent **BẮT BUỘC** phải tự động khắc phục toàn bộ các lỗi hiển thị trên mockup sau đây:

1. **Sửa lỗi lệch Active Sidebar & Breadcrumbs (Cả Frame 22 & Frame 23)**:
   - Trên cả 2 ảnh mockup, Sidebar đang highlight nhầm mục 2 (`Bảng Công Việc (Kanban)`) và Breadcrumbs ghi nhầm là `Bảng Công Việc (Kanban) / Chi Tiết Tác Vụ #TASK-01`.
   - **Chỉ thị sửa**: Cả 2 trang đều thuộc **Phân hệ 5**, bắt buộc phải highlight mục 6 trên Sidebar là **`Hồ Sơ Năng Lực & Báo Cáo`** (`AppIcons.navAnalytics`, icon màu `#4F46E5`, nền `#FFFFFF`, viền `1px solid #CBD5E1`).
   - Sửa Breadcrumbs chuẩn xác theo từng trang:
     - Frame 22: `Hồ Sơ Năng Lực & Báo Cáo / Bản Tin Scrum & Tổng Kết Học Tập`
     - Frame 23: `Hồ Sơ Năng Lực & Báo Cáo / Mô Phỏng Rủi Ro Monte Carlo & Chỉ Số Flow`
2. **Sửa lỗi thiếu Logo 3D "SW" trên Sidebar Header**:
   - Trên cả 2 ảnh mockup, chữ `"Smart Workspace"` ở góc trên cùng bên trái đang bị thiếu khối icon logo bên cạnh.
   - **Chỉ thị sửa**: Bắt buộc render `<BrandLogoMark />` (cấp phát động từ Cloudinary SDK qua `useBrand()`) nằm bên trái tiêu đề `"Smart Workspace"`.
3. **Sửa lỗi cắt chữ (Text Truncation) trên Tooltip Biểu Đồ (Frame 23)**:
   - Trong ảnh Frame 23, 2 nhãn tooltip màu đỏ trên biểu đồ đang bị cắt mất chữ (`P85: 16/1` và `2.4d: Xung đôn`).
   - **Chỉ thị sửa**: Mở rộng chiều rộng tooltip (`whitespace-nowrap px-2.5 py-1`) để hiển thị trọn vẹn nội dung: **`P85: 16/12/2026`** và **`2.4d: Xung đột lịch`**.
4. **Chuẩn hóa Badge & Màu sắc theo Design System**:
   - Đổi các badge hình tròn/oval bầu bĩnh (`V2.4 AUTO-GEN`, `PROD v2.4`, vòng tròn `3 MỤC`, `2 CẢNH BÁO`, `XUNG ĐỘT`) về đúng chuẩn hình học Modern B2B SaaS: **`rounded-md` (`6px`)**, padding gọn gàng (`px-2 py-0.5`), text nằm trên **1 dòng duy nhất** (`whitespace-nowrap`).
   - Đổi khung nền xanh cyan nhạt của hộp *Khuyến nghị Agent* (Frame 22) và thanh footer biểu đồ Monte Carlo (Frame 23) về nền trung tính chuẩn `#FAFAFA` hoặc `#F8FAFC` với viền mảnh `1px solid #E2E8F0`.
5. **Khóa Icon Tập Trung**:
   - Toàn bộ icon bắt buộc gọi qua `AppIcons` (`src/components/icons/AppIcons.tsx`, `strokeWidth={1.5}`).

---

## 2. ĐẶC TẢ CHI TIẾT 2 MÀN HÌNH PHÂN HỆ 5

### Màn hình 1: Bản Tin Scrum Hàng Ngày & Tổng Kết Học Tập (Frame 22 — `/analytics/standup`)
- **Sidebar Active**: Mục 6 — `Hồ Sơ Năng Lực & Báo Cáo` (`AppIcons.navAnalytics`, màu `#4F46E5`).
- **Header & Chuyển Đổi Chế Độ Xem**:
  - Tiêu đề: *"Bản Tin Scrum Hàng Ngày & Tổng Kết Học Tập"* + tag `V2.4 AUTO-GEN` (`rounded-md`, `#EEF2FF` bg, `#4F46E5`).
  - **Segmented Mode Switcher (Tương tác chuyển đổi 2 chế độ)**:
    - Tab 1 (Mặc định): **`Daily Standup Nhóm`** (hiển thị bảng 3 cột Scrum của cả nhóm).
    - Tab 2: **`Tổng Kết Học Tập Tuần`** (khi click sẽ chuyển đổi mượt mà sang giao diện tổng hợp giờ tự học, tiến độ các môn học và nhiệm vụ đồ án cá nhân trong tuần).
  - Nút hành động chính: `Đồng Bộ & Gửi Báo Cáo` (`#4F46E5`).
- **Thanh Metadata & Biên Tập Lại**:
  - Hiển thị thời gian biên tập (`08:30 • Thứ 5, 12/11/2026 (Tuần 11)`), nguồn dữ liệu (`14 FSM Logs • 3 Git Commits • 2 Calendar Events`) và nút `Biên Tập Lại (Regenerate)`.
- **Bảng Tổng Hợp 3 Cột (`grid-cols-3 gap-4`)**:
  1. **Cột 1 — ĐÃ HOÀN THÀNH HÔM QUA (`3 MỤC`)**:
     - `#TASK-00` (Đặng Hồng Nguyên — `FSM: BACKLOG → DONE`, `100%`).
     - `#PR-42 MERGED` (Đặng Hồng Nguyên — nhánh `feature/dag-cpm-engine`, badge `CI PASS`, `+482 / -65 dòng`).
     - `#TASK-06` (Tuấn Lê — nộp bản thảo Chương 3, badge `Doc v1.2`).
     - Footer cột: Thanh tiến độ Sprint hiện tại (`78%`).
  2. **Cột 2 — KẾ HOẠCH THỰC HIỆN HÔM NAY (`3 MỤC`)**:
     - `#TASK-01` (`CPM CRITICAL` màu `#BE123C`, `4.0h` — Đặng Hồng Nguyên).
     - `#TASK-04` (`5.0h` — Hòa Nguyễn, badge `AI INFRA`, `Mục tiêu: p95 < 850ms`).
     - `#TASK-02` (`3.0h` — Tuấn Lê, badge `CLIENT API`, `Flutter v3.19`).
     - Footer cột: `Tổng tải phân bổ hôm nay: 12.0h / 14.5h khả dụng` (`#4F46E5`).
  3. **Cột 3 — ĐIỂM NGHẼN & RỦI RO / BLOCKERS (`2 CẢNH BÁO` màu `#BE123C`)**:
     - Thẻ 1 (`XUNG ĐỘT LỊCH THI • #TASK-01`, nền `#FFF1F2`/50, viền `#FFE4E6`): Cảnh báo trùng `2.5h` với ca thi Mạng Máy Tính kèm 2 nút tương tác trực tiếp: `Chấp thuận dời lịch` (`#BE123C` solid bg) và `Xem chi tiết`.
     - Thẻ 2 (`BIẾN ĐỘNG SRS V2.0 • FR-15`, badge `PENDING`): Chờ phê duyệt bổ sung Webhook Telegram (`+16h Dev`).
     - Hộp `Khuyến nghị Agent` + Footer `Độ tin cậy dự báo: 96.4%` và nút `Giải quyết nghẽn >`.
- **Banner Tóm Tắt Nhịp Độ Cá Nhân (Dưới cùng)**:
  - Hiển thị tiến độ tuần của *Đặng Hồng Nguyên* (`18.5h / 24h`, `1 ca thi môn học`, `+14% so với tuần 10`) kèm nút chuyển nhanh `Chuyển sang chế độ Tổng Kết Học Tập Tuần →`.

---

### Màn hình 2: Mô Phỏng Rủi Ro Monte Carlo & Chỉ Số Dòng Chảy (Frame 23 — `/analytics/monte-carlo`)
- **Sidebar Active**: Mục 6 — `Hồ Sơ Năng Lực & Báo Cáo` (`AppIcons.navAnalytics`, màu `#4F46E5`).
- **Header & Bộ Điều Khiển Mô Phỏng**:
  - Tiêu đề: *"Mô Phỏng Rủi Ro Monte Carlo & Chỉ Số Dòng Chảy (Flow Metrics)"* + tag `PROD v2.4`.
  - Bộ chọn số vòng lặp tương tác (`1,000`, `5,000`, `10,000 iterations`) + nút chính `Chạy Lại Mô Phỏng` (`#4F46E5` — khi bấm sẽ tạo hiệu ứng tính toán lại phân phối xác suất).
- **Hàng 4 Thẻ KPI (`grid-cols-4 gap-4`)**:
  1. `XÁC SUẤT ĐẠT HẠN (P85)`: **`16/12/2026`** (`#4F46E5`, badge `85% Tin cậy` — Sớm hơn 2 ngày so với mốc bảo vệ 18/12).
  2. `ĐANG XỬ LÝ (WIP COUNT)`: **`6 / 8 Tasks`** (badge `Giới hạn an toàn`).
  3. `TỐC ĐỘ HOÀN THÀNH (THROUGHPUT)`: **`1.8 Tasks/ngày`** (badge `+12.5%` màu `#0D9488`).
  4. `THỜI GIAN CHU KỲ (CYCLE TIME)`: **`1.6 Ngày`** (badge `P95: 3.4d` màu `#BE123C`).
- **Khối 2 Biểu Đồ Phân Tích Chuyên Sâu (`grid-cols-12 gap-4`)**:
  - **Biểu đồ trái (7 cột — Phân Phối Xác Suất Hoàn Thành Dự Án Monte Carlo 10,000 Lần)**:
    - Biểu đồ kết hợp Cột Histogram tần suất (`08/12` đến `18/12` màu `#4F46E5`, các cột vượt hạn `20/12`, `22/12` màu `#BE123C`) và đường cong tích lũy **S-curve** (`0%` → `100%`).
    - Đường gióng dọc đứt nét màu `#BE123C` tại mốc `16/12` với tooltip hiển thị trọn vẹn **`P85: 16/12/2026`** và nhãn mốc **`HẠN: 18/12`**.
    - Khung kết luận bên dưới: *"Kết quả mô phỏng: 85% kịch bản hoàn thành trước 16/12 • Rủi ro trễ hạn sau 18/12 là 6.2%."*
  - **Biểu đồ phải (5 cột — Biểu Đồ Dòng Chảy WIP & Cycle Time 14 Ngày Qua)**:
    - Biểu đồ cột đôi (`WIP Tasks` và `Throughput` tông xám Slate) kết hợp đường xu hướng `Cycle Time (d)` màu `#4F46E5` từ `T2` đến `CN`.
    - Điểm đỉnh đột biến tại ngày `T5` tô màu `#BE123C` kèm tooltip hiển thị trọn vẹn **`2.4d: Xung đột lịch`**.
    - Khung kết luận bên dưới: *"Độ ổn định luồng (Flow Efficiency): 84% • Không ùn ứ tại Review"* + badge `P50 Cycle: 1.4d`.