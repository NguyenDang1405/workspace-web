# Design System & App Shell Specification - Smart Workspace

> **Phiên bản:** v2.4 (Material Design 3 Light Edition & Modern B2B SaaS)  
> **Nguồn tham chiếu:** Logo 3D "SW", Bảng tham chiếu Lucide Icons Frame 00, Moodboard hệ thống màu/font.

---

## 1. HỆ THỐNG MÀU SẮC (DESIGN COLOR TOKENS)

### 1.1. Neutral Surfaces (Mặt phẳng nền)
- **Nền Workspace chính**: `#F8FAFC` (`bg-[#F8FAFC]`) - Nền bao phủ toàn bộ vùng làm việc, các trang nội dung.
- **Nền Left Sidebar**: `#F1F5F9` (`bg-[#F1F5F9]`) - Nền sidebar điều hướng bên trái.
- **Nền Card & Top App Bar**: `#FFFFFF` (`bg-white`) - Nền khối thẻ, bảng biểu và thanh điều hướng trên cùng.
- **Viền mảnh phân cách**: `1px solid #E2E8F0` (`border-[#E2E8F0]`) - Cho toàn bộ card, topbar, divider, input border.
- **Viền Sidebar Item Active**: `1px solid #CBD5E1` (`border-[#CBD5E1]`).

### 1.2. Typography Colors (Màu chữ)
- **Chữ chính (Headlines & Labels)**: `#0F172A` (`text-[#0F172A]`) - Dark Slate 900, độ tương phản cao đạt chuẩn WCAG AAA.
- **Chữ phụ & Meta text**: `#64748B` (`text-[#64748B]`) - Slate 500, dùng cho description, subtitle, placeholder.

### 1.3. Khóa Chặt 2 Màu Nhấn (Core Action Palettes)
- **Royal Indigo `#4F46E5`** (Primary):
  - Sử dụng cho: Nút hành động chính (Primary Action), Icon điều hướng khi Active, thanh tiến trình (progress bar), điểm nhấn liên kết.
  - Hover state: `#4338CA`.
- **Rose Crimson `#BE123C`** (Critical / Destructive):
  - Sử dụng cho: Đường găng CPM (Critical Path Method), Cảnh báo xung đột lịch biểu (Schedule Conflict), trạng thái URGENT/ERROR.
  - Nền badge nhẹ: `#FFF1F2`, viền: `#FECDD3`.

### 1.4. Secondary Functional Accents
- **Teal Success `#0D9488`**: Trạng thái hoàn tất FSM (Pass FSM), Availability, hệ thống Sẵn Sàng (Ready), chấm xanh Làm mới (Refresh).
- **Electric Cyan `#06B6D4`**: Màu chuyển sắc phối hợp cùng Royal Indigo trên logo Mobius và các banner AI.

---

## 2. QUY CHUẨN TYPOGRAPHY

### 2.1. Font Chữ Giao Diện: `Roboto` (Sans-Serif)
- Áp dụng mặc định cho toàn bộ văn bản UI, tiêu đề trang, nhãn trường, menu, nút bấm.
- `Headline Display`: `Roboto Bold 700` (`24px - 32px`, `#0F172A`).
- `Interface Body`: `Roboto Regular 400 / Medium 500` (`13px - 14px`, `#0F172A` / `#64748B`).

### 2.2. Font Kỹ Thuật: `Roboto Mono` (Monospace)
- **BẮT BUỘC** áp dụng class `font-mono` cho các thành phần số liệu kỹ thuật:
  - Mã công việc / Task ID (ví dụ: `#TASK_101`, `#TASK_104`).
  - Số giờ ước tính, thời lượng, Slack time (ví dụ: `4.5h`, `12d`).
  - Điểm Story Points (ví dụ: `3 SP`, `8 SP`).
  - Các thông số thuật toán CPM, độ trễ AI / Latency (ví dụ: `18ms`, `24.5%`, `PASS`).

---

## 3. QUY CHUẨN HÌNH HỌC MODERN B2B SAAS (GEOMETRY & RADIUS)

- **Thẻ, bảng biểu, container, modal**: Khóa cứng `rounded-lg` (`8px`).
- **Nút bấm, ô input, badge, tag, status pill, item menu active**: Khóa cứng `rounded-md` (`6px`).
- **Đổ bóng (Box Shadow)**:
  - **TUYỆT ĐỐI KHÔNG** dùng bóng đổ dày (không dùng `shadow-lg`, `shadow-xl`, `shadow-2xl`).
  - Chỉ sử dụng viền mảnh `1px solid #E2E8F0` kết hợp bóng siêu nhẹ `shadow-xs` (`0 1px 2px 0 rgba(0, 0, 0, 0.04)`).
- **Hình dáng nút bấm**:
  - **CẤM** sử dụng nút dạng viên thuốc to bản `rounded-full` cho các nút bấm hành động trong workspace. Tất cả nút bấm phải dùng `rounded-md` (`6px`).

---

## 4. BỘ ICON TẬP TRUNG (SSOT ICON REGISTRY)

### 4.1. Quy định cấm import rời rạc
- **CẤM TUYỆT ĐỐI**: `import { ... } from 'lucide-react'` ở bất kỳ file component, page, hoặc layout nào.
- **BẮT BUỘC**: Mọi icon phải import và sử dụng từ `AppIcons` tại `@/components/icons/AppIcons`.

### 4.2. Vector Spec Chuẩn
- Mọi icon đều bọc qua helper `withDefaultSpec`:
  - `strokeWidth = 1.5`
  - `size = 16` (`16x16px` cho sidebar, nút bấm, controls, bảng biểu).
- Màu sắc tuân thủ:
  - Icon Sidebar Active: `#4F46E5`.
  - Icon Sidebar Inactive / Controls thường: `#64748B`.
  - Icon CPM / Cảnh báo: `#BE123C`.

### 4.3. Brand Logo Mark (`<BrandLogoMark />`) & Cloudinary SDK Architecture
- **Kích thước chuẩn**: `28x28px` (`w-7 h-7 rounded-md`).
- **Kiến trúc quản lý Logo động qua Cloudinary SDK**:
  - **Backend (`workspace-api`)**:
    - Quản lý qua 4 biến môi trường trong `.env`:
      - `CLOUDINARY_CLOUD_NAME`
      - `CLOUDINARY_API_KEY`
      - `CLOUDINARY_API_SECRET`
      - `CLOUDINARY_SYSTEM_LOGO_PUBLIC_ID` (mặc định: `smart-workspace/brand/system-logo`).
    - Cloudinary Service (`src/lib/cloudinary.ts`): Sử dụng Cloudinary SDK v2 method `cloudinary.url()` sinh dynamic URL an toàn kèm transformation tối ưu (`width: 112, height: 112, crop: 'fit', quality: 'auto', fetch_format: 'auto'`).
    - API Endpoint: `GET /api/system/brand` (đã whitelist trong middleware không cần token) trả về `{ success: true, data: { brandName, logoUrl, publicId, fallbackSvg, isConfigured } }`.
  - **Frontend (`workspace-web`)**:
    - **TUYỆT ĐỐI CẤM**: Hardcode bất kỳ URL ảnh Cloudinary nào (`https://res.cloudinary.com/...`) ở code hay file `.env`.
    - Hook `useBrandLogo` (`src/hooks/use-brand-logo.ts`) lấy `logoUrl` động từ Backend API và cache in-memory.
    - Component `<BrandLogoMark />`:
      - Khi có `logoUrl` từ Cloudinary: Hiển thị ảnh logo động.
      - **Graceful Fallback / Zero Layout Shift**: Khi đang tải, khi ảnh lỗi mạng (`onError`), hoặc khi backend chưa cấu hình Cloudinary: Tự động hiển thị khối vector 3D Mobius Ribbon SVG chữ "S-W" trên nền gradient Royal Indigo (`#4F46E5`) sang Electric Cyan (`#06B6D4`), tuyệt đối không bị giật hay vỡ layout.

### 4.4. 20 Icon Nghiệp Vụ Cố Định (Master Lucide Reference Sheet)
1. `brandLogo`: `<BrandLogoMark />`
2. `refresh`: `RefreshCw` - Làm Mới & Đồng Bộ AI (`#475569`)
3. `download`: `Download` - Xuất Báo Cáo CSV (`#09090B`)
4. `search`: `Search` - Tìm Kiếm Nhanh (`#71717A`)
5. `adminMonitor`: `Activity` - Giám Sát Tài Nguyên
6. `adminRbac`: `ShieldCheck` - Phân Quyền RBAC
7. `adminOrg`: `Building2` - Tổ Chức & Không Gian
8. `adminAudit`: `FileClock` - Nhật Ký Audit Log
9. `adminRag`: `Database` - Thuật Toán & RAG
10. `adminAgent`: `Cpu` - Multi-Agent & Prompt
11. `navAiDecompose`: `Sparkles` - Khởi Tạo & Phân Rã AI
12. `navKanban`: `Kanban` - Bảng Công Việc (Kanban)
13. `navCalendar`: `Calendar` - Lịch Biểu Thích Ứng
14. `navDagGantt`: `GitFork` - Đồ Thị Mạng DAG & Gantt
15. `navBacklogSrs`: `Layers` - Backlog & Yêu Cầu SRS
16. `navAnalytics`: `BarChart2` - Hồ Sơ Năng Lực & Báo Cáo
17. `criticalAlert`: `AlertTriangle` - Đường Găng CPM / Xung Đột (`#BE123C`)
18. `verifiedCheck`: `CheckCircle2` - Hoàn Tất / Pass FSM (`#0D9488`)
19. `uploadFile`: `FileUp` - Nạp Tài Liệu SRS (`#4F46E5`)
20. `override`: `SlidersHorizontal` - Sửa Tay (Override) (`#4F46E5`)
21. `lock`: `Lock` - Ràng Buộc Tiên Quyết (`#64748B`)
22. `clock`: `Clock` - Thời Lượng / Slack Time (`#64748B`)
23. `plus`: `Plus` - Thêm Tác Vụ Mới (`#09090B`)
24. `chevronDown`: `ChevronDown` - Dropdown Mở Rộng (`#71717A`)

---

## 5. CẤU TRÚC APP SHELL

### 5.1. Left Sidebar (`Sidebar.tsx`)
- Chiều rộng cố định: `w-[260px]`, nền `#F1F5F9`, viền phải `border-r border-[#E2E8F0]`.
- **Header**: Cao `56px` (`h-14`), gồm `<BrandLogoMark size={28} />` + chữ `"Smart Workspace"` (`16px Bold #0F172A`) + viền dưới `border-b border-[#E2E8F0]`.
- **6 Mục Điều Hướng User Workspace**: Nằm gọn trên 1 dòng (`whitespace-nowrap truncate`).
- **Trạng thái Active**:
  - Nền: `#FFFFFF`
  - Viền: `1px solid #CBD5E1` (`border border-[#CBD5E1]`)
  - Bo góc: `rounded-md` (`6px`)
  - Chữ: `#0F172A` đậm (`font-semibold`)
  - Icon: Màu `#4F46E5`

### 5.2. Top App Bar (`TopAppBar.tsx`)
- Chiều cao: `h-14` (`56px`), nền `#FFFFFF`, viền dưới `border-b border-[#E2E8F0]`.
- **Bên trái**: Breadcrumbs (`Smart Workspace / <Tên trang>`), chữ `#64748B` với trang hiện tại `#0F172A`.
- **Bên phải**:
  1. Tag `"Làm mới: 5s"` kèm chấm xanh `6px` (`#0D9488`, animate-pulse), bo góc `rounded-md`, font-mono text-xs.
  2. Nút `"Xuất CSV"` (`rounded-md`, border `1px solid #E2E8F0`, icon `AppIcons.download`).
  3. Vạch đứng `1px` (`h-5 w-[1px] bg-[#E2E8F0]`).
  4. Avatar tròn tối màu `"ĐN"` (nền `#0F172A`, text trắng `text-xs font-semibold`) + Tên `"Đặng Hồng Nguyên"` (`text-sm font-medium text-[#0F172A]`).

---

## 6. ĐẶC TẢ MÀN HÌNH XÁC THỰC (SPLIT AUTHENTICATION)
- **Bố cục Split-Screen 2 cột** (`grid-cols-1 lg:grid-cols-2`): Hỗ trợ chuyển đổi mượt mà qua lại giữa 2 chế độ **Đăng ký** (`mode=register`) và **Đăng nhập** (`mode=login`).
- **Cột Trái (Form)**:
  - Header: `<BrandLogoMark />` (dynamic qua `useBrand()`) + "Smart Workspace" (16px bold) + "AI Workspace Platform".
  - Segmented Switcher Pill: `[ Đăng ký | Đăng nhập ]`.
  - Mode Đăng ký: Tiêu đề "Bắt đầu với Smart Workspace", 2 card tương tác chọn loại không gian ("Học tập / Cá nhân" active border `#4F46E5` & checkmark `#0D9488`, "Doanh nghiệp / Đội ngũ"), 3 input (Họ tên, Email, Mật khẩu có toggle mắt), CTA "Tạo tài khoản →" (`#4F46E5`).
  - Mode Đăng nhập: Tiêu đề "Chào mừng trở lại", input Email kèm badge "Được hỗ trợ SSO", input Mật khẩu có toggle mắt, Checkbox "Ghi nhớ đăng nhập (30 ngày)" + link "Quên mật khẩu?", CTA "Đăng nhập vào Workspace →" (`#4F46E5`).
  - Phụ: Phân cách "HOẶC ĐĂNG NHẬP / ĐĂNG KÝ BẰNG", 2 nút OAuth Google và GitHub, liên kết chuyển đổi nhanh và ghi chú pháp lý.
- **Cột Phải (Branding Graphic)**:
  - Mảng sóng trừu tượng 3D Mobius Wave vector chuyển sắc mượt mà giữa Royal Indigo (`#4F46E5`) và Electric Cyan (`#06B6D4`) trên nền sáng nhạt.
