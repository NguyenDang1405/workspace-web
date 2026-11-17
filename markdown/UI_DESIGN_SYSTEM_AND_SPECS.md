# SMART WORKSPACE — DESIGN SYSTEM & FRONTEND ARCHITECTURE SPECIFICATION

> **Tài liệu quy chuẩn kỹ thuật (Single Source of Truth)** dành cho AI Coding Agent (Antigravity / Cursor / Claude Code). Mọi component, trang chức năng và API tích hợp bắt buộc tuân thủ 100% các quy tắc trong tài liệu này.

---

## 1. PHONG CÁCH & HÌNH HỌC BỀ MẶT (MODERN B2B SAAS)

- **Thẩm mỹ chủ đạo**: Corporate Modern / Linear & Vercel style — sắc sảo, tối giản, ưu tiên đường kẻ mảnh và phân cấp chữ rõ ràng thay vì hiệu ứng đổ bóng dày hay bo tròn bầu bĩnh.
- **Quy chuẩn Bo Góc (Corner Radius)**:
  - **Cards, Panels, Tables, Modals**: `rounded-lg` (`8px`).
  - **Buttons, Inputs, Dropdowns, Badges, Active Sidebar Items**: `rounded-md` (`6px`).
  - *Lưu ý*: Không dùng nút `rounded-full` to bản hay thẻ `rounded-2xl` (ngoại trừ khung nền trang Auth Split-Screen hoặc thanh pill chuyển đổi tab nếu theo đúng mockup Auth).
- **Đường viền mảnh (Hairline Borders)**:
  - Sử dụng `1px solid #E2E8F0` (`border-slate-200`) để phân tách các bề mặt, cột và hàng bảng. Hạn chế tối đa `box-shadow`.

---

## 2. HỆ THỐNG MÀU SẮC (COLOR TOKENS)

| Nhóm Token | Tên Biến | Mã Hex | Mục Đích Sử Dụng |
| :--- | :--- | :--- | :--- |
| **Backgrounds** | `surface-canvas` | `#F8FAFC` | Nền không gian làm việc chính (Main Workspace). |
| | `surface-sidebar` | `#F1F5F9` | Nền thanh điều hướng trái (`260px`). |
| | `surface-card` | `#FFFFFF` | Nền Card, Bảng dữ liệu, Top App Bar, Form Auth. |
| **Borders** | `surface-border` | `#E2E8F0` | Đường viền mảnh mặc định (`1px solid`). |
| | `surface-border-active` | `#CBD5E1` | Viền thẻ mục đang chọn trên Sidebar. |
| **Typography** | `ink-primary` | `#0F172A` | Tiêu đề lớn, chữ đậm, tên thương hiệu, active text. |
| | `ink-body` | `#334155` | Nội dung văn bản tiêu chuẩn. |
| | `ink-muted` | `#64748B` | Nhãn phụ, mô tả ngắn, breadcrumbs. |
| **Primary Accent** | `brand-indigo` | `#4F46E5` | **Màu nhấn chính**: Nút CTA chính, icon Sidebar active, thanh tiến độ, highlight tab/card được chọn. |
| | `brand-cyan` | `#06B6D4` | Màu chuyển sắc gradient cùng `#4F46E5` cho Logo 3D Mobius và đồ họa nền trang Auth. |
| **Critical Accent** | `brand-crimson` | `#BE123C` | **Màu cảnh báo**: Chuỗi đường găng CPM (`is_critical_path = true`), cảnh báo xung đột lịch, lỗi validation. |
| | `brand-crimson-bg` | `#FFF1F2` | Nền nhãn cảnh báo mảnh (kèm viền `#FFE4E6`). |
| **Semantic Pass** | `brand-teal` | `#0D9488` | Trạng thái hoàn tất (`DONE`), vượt qua kiểm thử SAST/FSM, chấm online `Làm mới: 5s`. |

> **Quy tắc tiết chế màu**: Tất cả badge trạng thái thường, avatar phụ và tag phân loại đều dùng tông Slate trung tính (`bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]`). Chỉ dùng `#4F46E5` và `#BE123C` làm 2 điểm nhấn có chủ đích.

---

## 3. HỆ THỐNG KIỂU CHỮ (TYPOGRAPHY HIERARCHY)

- **Font Chính (UI & Tiếng Việt)**: `Roboto` (hoặc `Inter`), hỗ trợ đầy đủ dấu tiếng Việt sắc nét.
  - **Page Title (H1)**: `20px` (`1.25rem`), `font-bold` (`700`), `#0F172A`, `tracking-tight`.
  - **Auth Headline**: `24px` (`1.5rem`), `font-bold` (`700`), `#0F172A`.
  - **Card / Section Header (H2)**: `14px`–`16px`, `font-bold` (`700`), `#0F172A`.
  - **Body & Table Cell**: `13px` (`0.8125rem`), `font-normal` (`400`) hoặc `font-medium` (`500`), `#334155`.
  - **Sidebar Item**: `13px`, `font-medium` (`500`), bắt buộc nằm trên **1 dòng duy nhất** (`whitespace-nowrap`).
- **Font Kỹ Thuật (Monospace)**: `Roboto Mono` — **Bắt buộc** cho toàn bộ:
  - Mã công việc (`#TASK-01`, `#US-04`, `EPIC-01`, `#PR-42`).
  - Chỉ số thuật toán CPM (`ES`, `EF`, `LS`, `LF`, `Slack`).
  - Thời lượng giờ (`24h`, `184h`), điểm Story Points (`13 SP`), phần trăm tiến độ (`92%`), và các đoạn code Git Diff.

---

## 4. KIẾN TRÚC LOGO CẤP PHÁT ĐỘNG QUA CLOUDINARY SDK (BẮT BUỘC)

**Yêu cầu cốt lõi**: Tuyệt đối **KHÔNG fix cứng (hardcode)** bất kỳ URL ảnh logo nào ở Frontend. Logo hệ thống phải được cấp phát động thông qua **Cloudinary API Key/Secret ở Backend** để khi Admin cập nhật logo mới trong trang **Admin Settings**, toàn bộ mọi nơi trong ứng dụng (Sidebar User, Sidebar Admin, Trang Đăng nhập/Đăng ký) tự động cập nhật ngay lập tức.

### 4.1. Luồng Kiến Trúc Backend (`workspace-api`)
- **Biến môi trường (`.env`)**:
  ```env
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  CLOUDINARY_SYSTEM_LOGO_PUBLIC_ID=smart-workspace/brand/system-logo
  ```
- **API 1 — Lấy Logo Hệ Thống Hiện Tại (`GET /api/v1/system/branding`)**:
  - Backend dùng Cloudinary Admin SDK (`cloudinary.api.resource(CLOUDINARY_SYSTEM_LOGO_PUBLIC_ID)`) gọi bằng `api_key` và `api_secret` để truy vấn asset mới nhất trên Cloudinary.
  - Trả về JSON: `{ "logoUrl": "<secure_url>?v=<version>", "brandName": "Smart Workspace", "updatedAt": "..." }`.
  - Nếu chưa có asset trên Cloudinary, trả về `logoUrl: null`.
- **API 2 — Cập Nhật Logo Từ Trang Admin (`POST /api/v1/admin/branding/logo`)**:
  - Nhận file ảnh upload từ Admin Settings, gọi `cloudinary.uploader.upload()` ghi đè lên đúng `public_id` cố định với cờ `overwrite: true, invalidate: true` để xóa cache CDN cũ ngay lập tức.

### 4.2. Luồng Kiến Trúc Frontend (`BrandContext` & `<BrandLogoMark />`)
- **`src/contexts/BrandContext.tsx`**:
  - Gọi `GET /api/v1/system/branding` khi ứng dụng khởi chạy để lưu `logoUrl` vào Global State.
  - Cung cấp hàm `refreshBranding()` và `updateLogo(file)` để trang Admin Settings kích hoạt cập nhật toàn cục không cần reload trang.
- **`<BrandLogoMark />` (`src/components/icons/AppIcons.tsx`)**:
  - Component duy nhất render logo trên toàn bộ dự án (`28x28px`, `w-7 h-7 object-contain rounded-md shrink-0`).
  - Tự động đọc `logoUrl` từ `useBrand()`. Nếu API đang tải hoặc `logoUrl` trống/lỗi mạng (`onError`), tự động fallback về khối vector **3D Mobius Ribbon** gradient `#4F46E5` $\rightarrow$ `#06B6D4` (không chứa chữ bên trong).

---

## 5. HỆ THỐNG ICON CHUẨN (`lucide-react` — `1.5px` STROKE)

Cài đặt `lucide-react` và tập trung toàn bộ tại `src/components/icons/AppIcons.tsx` với `strokeWidth={1.5}` và `size={16}`:
- **6 Mục Sidebar User**:
  1. `Khởi Tạo & Phân Rã AI` $\rightarrow$ `Sparkles`
  2. `Bảng Công Việc (Kanban)` $\rightarrow$ `Kanban`
  3. `Lịch Biểu Thích Ứng` $\rightarrow$ `Calendar`
  4. `Đồ Thị Mạng DAG & Gantt` $\rightarrow$ `GitFork`
  5. `Backlog & Yêu Cầu SRS` $\rightarrow$ `Layers`
  6. `Hồ Sơ Năng Lực & Báo Cáo` $\rightarrow$ `BarChart2`
- **6 Mục Sidebar Admin**: `Activity`, `ShieldCheck`, `Building2`, `FileClock`, `Database`, `Cpu`.
- **Thao tác & Trạng thái**: `RefreshCw`, `Download`, `Search`, `AlertTriangle`, `CheckCircle2`, `FileUp`, `SlidersHorizontal`, `Lock`, `Clock`, `Plus`, `ChevronDown`.

---

## 6. ĐẶC TẢ MÀN HÌNH XÁC THỰC (SPLIT AUTHENTICATION: ĐĂNG KÝ & ĐĂNG NHẬP)

Xây dựng màn hình Split-Screen 2 cột (`grid-cols-1 lg:grid-cols-2`) cho phép chuyển đổi mượt mà giữa **Đăng ký** và **Đăng nhập** (đồng bộ state & URL query `/auth?mode=register` và `/auth?mode=login`):

1. **Cột Trái — Khu Vực Form (`#FFFFFF`)**:
   - **Header Thương Hiệu**: `<BrandLogoMark />` (cấp phát động từ `BrandContext`) + `"Smart Workspace"` (`16px Bold #0F172A`) + dòng phụ `"AI Workspace Platform"` (`12px #64748B`).
   - **Segmented Switcher**: Thanh chuyển đổi `[ Đăng ký | Đăng nhập ]` (`#F1F5F9` bg, tab active nền tối `#0F172A` chữ trắng `#FFFFFF`).
   - **Chế độ Đăng ký (`mode = register`)**:
     - Tiêu đề: *"Bắt đầu với Smart Workspace"* + mô tả *"Nền tảng tối ưu kế hoạch và phân bổ công việc thông minh."*
     - **2 Thẻ Chọn Loại Không Gian (Interactive Cards)**:
       - Card 1 (Active mặc định): **"Học tập / Cá nhân"** — *"Tự động xếp lịch theo giờ rảnh"* (viền `#4F46E5`, icon check `#0D9488`).
       - Card 2: **"Doanh nghiệp / Đội ngũ"** — *"Quản lý Sprint & Đồ thị CPM"*.
     - **Inputs**: *Họ và tên*, *Email trường học hoặc công ty*, *Mật khẩu* (có nút ẩn/hiện mật khẩu).
     - **CTA**: Nút `"Tạo tài khoản →"` (`#4F46E5`).
   - **Chế độ Đăng nhập (`mode = login`)**:
     - Tiêu đề: *"Chào mừng trở lại"* + mô tả *"Đăng nhập để tiếp tục theo dõi tiến độ và tối ưu lịch trình."*
     - **Inputs**: *Email trường học hoặc công ty* (kèm badge nhỏ `"Được hỗ trợ SSO"`), *Mật khẩu* (có nút ẩn/hiện).
     - **Tùy chọn**: Checkbox `"Ghi nhớ đăng nhập (30 ngày)"` + liên kết `"Quên mật khẩu?"`.
     - **CTA**: Nút `"Đăng nhập vào Workspace →"` (`#4F46E5`).
   - **OAuth & Điều hướng cuối form**: 2 nút **Google** và **GitHub** ngang hàng, kèm link chuyển đổi nhanh (`"Đã có tài khoản? Đăng nhập"` $\leftrightarrow$ `"Chưa có tài khoản? Đăng ký ngay"`).

2. **Cột Phải — Đồ Họa Thương Hiệu**:
   - Mảng sóng trừu tượng chuyển sắc mượt mà giữa **Royal Indigo (`#4F46E5`)** và **Electric Cyan (`#06B6D4`)** trên nền sáng nhạt, đồng bộ với bản sắc Logo 3D Mobius của hệ thống.
```

---

### Cách sử dụng file này với AI Coding Agent (Antigravity / Cursor):
1. Lưu nội dung trên thành file `UI_DESIGN_SYSTEM_AND_SPECS.md` ở thư mục gốc dự án của bạn.
2. Trong cửa sổ chat của **Antigravity**, gõ lệnh ngắn gọn: