# SMART WORKSPACE — ONBOARDING & TALENT PROFILE SPECIFICATION

> **Tài liệu đặc tả kỹ thuật chi tiết** cho 3 màn hình: **Academic Availability Matrix Onboarding**, **Enterprise Workspace Onboarding**, và **Dynamic Talent Profile & Skill Elo Radar**.
> **Tham chiếu gốc**: Bắt buộc kế thừa 100% quy chuẩn từ `markdown/UI_DESIGN_SYSTEM_AND_SPECS.md`.

---

## 1. QUY TẮC KHÓA CỨNG TOÀN CỤC (NON-NEGOTIABLE RULES)

1. **Khóa Thư Viện Icon Tập Trung (`AppIcons.tsx`)**:
   - **Cấm tuyệt đối** tự ý vẽ thẻ `<svg>` thủ công, dùng emoji, hoặc import rời rạc từ `lucide-react` trong bất kỳ file giao diện/component nào.
   - Mọi icon trên cả 3 màn hình bắt buộc phải gọi thông qua object `AppIcons` tại `src/components/icons/AppIcons.tsx` với nét vẽ cố định `strokeWidth={1.5}` (bổ sung thêm key chuẩn từ `lucide-react` vào `AppIcons.tsx` nếu thiếu, giữ nguyên độ dày nét).
2. **Logo Cấp Phát Động Qua Cloudinary SDK (`<BrandLogoMark />`)**:
   - Mọi vị trí hiển thị logo ở Header của cả 3 màn hình đều phải dùng duy nhất `<BrandLogoMark />` kết nối với `BrandContext` (lấy link động từ API Backend Cloudinary SDK `GET /api/v1/system/branding`, tuyệt đối không fix cứng URL ảnh).
3. **Đồng Nhất Bảng Màu & Hình Học Moodboard**:
   - **Bề mặt**: Nền chính `#F8FAFC` (`surface-canvas`), thẻ/bảng `#FFFFFF` (`surface-card`), viền mảnh `1px solid #E2E8F0` (không dùng bóng đổ dày).
   - **Bo góc**: `rounded-lg` (`8px`) cho thẻ chứa, lưới thời khóa biểu, khung biểu đồ radar; `rounded-md` (`6px`) cho nút bấm, ô nhập liệu, badge trạng thái.
   - **Màu nhấn**:
     - **Royal Indigo (`#4F46E5`)**: Nút CTA chính, bước Stepper đang active, vùng vẽ biểu đồ Radar, thẻ phương pháp luận được chọn.
     - **Teal (`#0D9488`)**: Khung giờ rảnh AI (`FREE_TIME`), trạng thái hợp lệ/hoàn tất, chỉ số Elo tăng (`+24 Elo`).
     - **Rose Crimson (`#BE123C`)**: Nút xóa toàn bộ, cảnh báo trễ hạn `SLA Violation`, chỉ số Elo giảm (`-8 Elo`).
   - **Typography**: `Roboto` cho tiêu đề/văn bản tiếng Việt; `Roboto Mono` cho toàn bộ khung giờ (`07:00 - 09:00`), mã task (`#PRJ-104`), điểm Elo (`1,745`), hệ số độ khó (`1.5x`) và tỷ lệ phần trăm.

---

## 2. ĐẶC TẢ CHI TIẾT 3 MÀN HÌNH

### Màn hình 1: Academic Availability Matrix Onboarding
- **Route đề xuất**: `/onboarding/academic`
- **Top Stepper Header (`h-14`, `#FFFFFF`, `border-b 1px solid #E2E8F0`)**:
  - **Trái**: `<BrandLogoMark />` + Tiêu đề `"Smart Workspace"` (`16px Bold #0F172A`) + dòng phụ `"Khảo Sát Lịch Rảnh & Thiết Lập Cá Nhân"` (`12px #64748B`).
  - **Giữa**: Thanh tiến trình 3 bước:
    1. `1. Chọn Vai Trò` (Completed: nền `#F0FDF4`, chữ `#0D9488`, icon `AppIcons.verifiedCheck`).
    2. `2. Thời Khóa Biểu & Giờ Rảnh` (Active: nền `#4F46E5`, chữ `#FFFFFF`, `rounded-md`).
    3. `3. Mục Tiêu Tuần` (Inactive: nền `#F1F5F9`, chữ `#64748B`).
  - **Phải**: Nút `"Lưu nháp & Thoát"` (`1px solid #E2E8F0`, `rounded-md`) + Avatar tròn tối màu `ĐN` + `"Đặng Hồng Nguyên"`.
- **Thanh Công Cụ Chọn Cọ Vẽ & Mục Tiêu Tuần (`#FFFFFF`, `rounded-lg`, `1px solid #E2E8F0`)**:
  - **Bên trái (`CHẾ ĐỘ CHỌN CỌ VẼ`)**: 3 nút chuyển đổi trạng thái tương tác được:
    - `Giờ học trên lớp (BUSY_CLASS)` (Active: viền `#4F46E5`, nền `#EEF2FF`, badge `"Đang chọn"`).
    - `Giờ rảnh làm bài (FREE_TIME)` (Chấm tròn `#0D9488`).
    - `Nghỉ ngơi / Cá nhân` (Chấm tròn `#64748B`).
  - **Bên phải (`Mục tiêu tự học tuần`)**: Badge hiển thị động `18 Giờ / Tuần` (`Roboto Mono`) kèm 4 nút chọn nhanh: `12h`, `18h (Active)`, `24h`, `Tùy chỉnh`.
- **Lưới Thời Khóa Biểu Tương Tác (`Thứ 2` $\rightarrow$ `Chủ Nhật`, 6 ca từ `07:00` đến `23:00`)**:
  - Header lưới: Nút `"Áp dụng mẫu tuần chẵn/lẻ"`, nút `"Xóa toàn bộ"` (`#FFF1F2` bg, `#BE123C` text), và thống kê tổng hợp thời gian thực: `22h Giờ học` • `26h Giờ rảnh khả dụng` (`Roboto Mono`).
  - **Tương tác ô lưới**: Click hoặc kéo chọn qua các ô để gán trạng thái theo cọ vẽ đang chọn:
    - Ô `BUSY_CLASS`: Nền `#EEF2FF`, viền `#C7D2FE`, chữ `#4F46E5` (*"• Học trên lớp — Cơ sở dữ liệu (P.A201)"*).
    - Ô `FREE_TIME`: Nền `#F0FDF4`, viền `#CCFBF1`, chữ `#0D9488` (*"Khung rảnh AI — Tự học 2 giờ"*).
    - Ô `Nghỉ ngơi`: Nền `#F1F5F9`, chữ `#64748B`.
    - Ô trống: Viền nét đứt `1px dashed #CBD5E1`, chữ `"+ Thêm ca"`.
- **Action Footer Bar**: Banner gợi ý AI Engine bên trái + Nút `"Quay Lại"` + Nút chính `"Tiếp Tục: Thiết Lập Mục Tiêu Đồ Án →"` (`#4F46E5`).

---

### Màn hình 2: Enterprise Workspace Onboarding
- **Route đề xuất**: `/onboarding/enterprise`
- **Top Stepper Header**: `<BrandLogoMark />` + `"Smart Workspace / Thiết Lập Tổ Chức & Phương Pháp Luận Doanh Nghiệp"` | Thanh 3 bước (`1. Định Danh Doanh Nghiệp` [Done] $\rightarrow$ `2. Không Gian & Phương Pháp Luận` [Active `#4F46E5`] $\rightarrow$ `3. Tích Hợp Git & AI Service`) | Nút `"Lưu nháp & Thoát"` + User `ĐN` `"Đặng Hồng Nguyên (Workspace Admin)"`.
- **Khối Trên (2 Cột `grid-cols-1 lg:grid-cols-2 gap-4`)**:
  - **Cột Trái — Thông Tin Tổ Chức (`#FFFFFF`, `rounded-lg`, `1px solid #E2E8F0`)**:
    - Input `Tên Công Ty / Tổ Chức *` (Mặc định: `"FPT Software Corp"`).
    - Input `Mã Định Danh Không Gian (Workspace Slug) *`: Tự động sinh tiền tố `https://` + slug nhập tay (`fpt-software`) + hậu tố `.smartworkspace.ai` (`Roboto Mono`), kèm icon `AppIcons.verifiedCheck` màu `#0D9488`.
    - Dropdown `Quy Mô Đội Ngũ Dự Kiến`: `"50 - 200 Kỹ sư & PM"`.
  - **Cột Phải — Phương Pháp Luận Quản Trị & Điều Phối (`#FFFFFF`, `rounded-lg`, `1px solid #E2E8F0`)**:
    - 2 thẻ chọn tương tác (Radio Cards):
      1. **Agile Scrum Framework** (Active mặc định: viền `1.5px solid #4F46E5`, phụ đề `#4F46E5` *"Khuyên dùng cho Engineering Teams"*, 3 tags kỹ thuật: `CPM Critical Path`, `Sprint Planning`, `Velocity Analytics`).
      2. **Kanban Thuần (Continuous Flow)** (Inactive: viền `1px solid #E2E8F0`, phụ đề `#64748B` *"Quy trình vận hành liên tục"*).
- **Khối Dưới — Mời Kỹ Sư & Thành Viên Dự Án (`#FFFFFF`, `rounded-lg`, `1px solid #E2E8F0`)**:
  - Header có badge đếm động: `Đã chọn: 27 thành viên` (`Roboto Mono`).
  - Chia 2 cột:
    - **Cách 1 (Tải file danh sách hàng loạt)**: Vùng kéo thả nét đứt (`.csv, .xlsx`, tối đa `15MB`), link tải file mẫu, và thẻ file đã tải lên (`FPT_Dev_Team_Sprint1.csv` • `24 thành viên` • badge `Hợp lệ` `#0D9488`).
    - **Cách 2 (Nhập email thủ công)**: Hàng nhập gồm input email + dropdown vai trò (`Thành viên (Member)` / `Trưởng nhóm (Leader)`) + nút `+ Thêm` (`#4F46E5`). Bên dưới là danh sách thành viên đã thêm có thể đổi vai trò hoặc bấm `X` để xóa.
- **Action Footer Bar**: Icon khóa bảo mật RBAC + thông báo phân quyền bên trái | Nút `"Quay Lại"` + Nút chính `"Hoàn Tất Thiết Lập & Vào Không Gian →"` (`#4F46E5`).

---

### Màn hình 3: Dynamic Talent Profile & Skill Elo Radar
- **Route đề xuất**: `/profile/skill-elo` (hoặc tích hợp tab trong mục `Hồ Sơ Năng Lực & Báo Cáo`)
- **Top App Bar**: `<BrandLogoMark />` + Breadcrumbs `"Hồ Sơ Cá Nhân > Năng Lực & Xếp Hạng Kỹ Thuật (Skill Elo)"` | Tag `Làm mới: 5s` (chấm xanh `#0D9488`) + Nút `Xuất CSV` + Avatar `ĐN` `"Đặng Hồng Nguyên"`.
- **Thẻ Hồ Sơ & Điểm Elo Tổng Hợp (`#FFFFFF`, `rounded-lg`, `1px solid #E2E8F0`)**:
  - **Trái**: Avatar vuông bo góc tối màu `ĐN` (chấm online `#0D9488`), Tên `"Đặng Hồng Nguyên"`, badge `"Khoa CNTT - ĐH Bách Khoa"`, chức danh `"Kỹ sư Phần mềm • Full-Stack & AI Systems"`.
  - **Giữa**: Chỉ số Elo lớn `1,745` (`Roboto Mono 28px Bold #0F172A`) + nhãn `"Điểm Năng Lực Skill Elo"`, đi kèm 2 badge: `TIER: GOLD RANK` và `Top 4.2% Kỹ sư trong Workspace`.
  - **Phải**: `34 Tác Vụ` (`Roboto Mono Bold`) + `"Đã nghiệm thu chính thức"`.
- **Khối Giữa (2 Cột `grid-cols-12 gap-4`)**:
  - **Cột Trái (Span 5) — Biểu Đồ Radar 6 Trục Kỹ Thuật**:
    - Vẽ biểu đồ Radar sắc nét bằng SVG/Recharts với vùng phủ màu Indigo (`#4F46E5` fill opacity `0.15`, stroke `2px solid #4F46E5`) qua 6 đỉnh:
      1. `AI & Vector RAG` (`92/100`)
      2. `Thuật Toán DAG & CPM` (`85/100`)
      3. `DevOps & CI/CD` (`68/100`)
      4. `Kiểm Thử & QA` (`74/100`)
      5. `Frontend & Mobile` (`82/100`)
      6. `Backend Architecture` (`88/100`)
    - Thanh ghi chú đáy thẻ: `Mô hình đo lường: Bayesian Elo Updating (K=24)` (`Roboto Mono`).
  - **Cột Phải (Span 7) — Lịch Sử Thăng Hạng Qua Từng Tác Vụ**:
    - Segmented Filter Tab hoạt động được: `[ Tất cả | Dự Án Lõi | Code Review PR ]`.
    - Bảng dữ liệu 5 cột (`THỜI GIAN`, `TÁC VỤ HOÀN THÀNH`, `ĐỘ KHÓ (W)`, `BIẾN ĐỘNG`, `ĐIỂM MỚI`):
      - Ví dụ tăng điểm: `#PRJ-104` • Độ khó `Khó (1.5x)` • Biến động `+24 Elo` (`#F0FDF4` bg, `#0D9488` text) • Điểm mới `1,745`.
      - Ví dụ trừ điểm SLA: `#PRJ-082` (`SLA Violation (-2 ngày)`) • Độ khó `Cơ bản (0.8x)` • Biến động `-8 Elo` (`#FFF1F2` bg, `#BE123C` text) • Điểm mới `1,691`.
    - Nút đáy bảng: `"Xem Toàn Bộ Lịch Sử 34 Tác Vụ →"`.
- **Hàng Dưới Cùng — 3 Thẻ Chỉ Số Chất Lượng (`grid-cols-3 gap-4`)**:
  1. `Đánh giá Code Quality`: `98.4 / 100` (`A+ Clean Architecture`).
  2. `Thời gian giải quyết tác vụ`: `1.4 ngày / TB` (`Nhanh hơn 38% trung bình`).
  3. `Độ tin cậy Thuật Toán`: `99.1%` (`0 regressions detected`).