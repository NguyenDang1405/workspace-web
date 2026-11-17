# Smart Workspace Design & Architecture Guidelines

## 1. Icon System Rules & Dynamic Brand Logo (Strict Single Source of Truth)
- **CẤM import trực tiếp từ `lucide-react` trong các file UI/Page.**
- **Mọi icon bắt buộc phải gọi thông qua `AppIcons` tại `src/components/icons/AppIcons.tsx` với `strokeWidth={1.5}` và `size={16}` mặc định.**
- **Logo thương hiệu động:** Quản lý qua Backend Cloudinary SDK (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_SYSTEM_LOGO_PUBLIC_ID`).
- **TUYỆT ĐỐI CẤM**: Hardcode bất kỳ URL Cloudinary nào ở Frontend hay file `.env`.
- **Logo hệ thống bắt buộc sử dụng `<BrandLogoMark />`:** Tự động nạp URL động từ backend API, tự động fallback về vector 3D Mobius Ribbon SVG gradient `#4F46E5` -> `#06B6D4` với Zero Layout Shift khi đang tải hoặc lỗi ảnh.

## 2. Design Tokens & Visual Specs
- **Mặt phẳng & viền:**
  - Nền workspace: `#F8FAFC`
  - Nền sidebar: `#F1F5F9` (rộng cố định `260px`)
  - Nền card/topbar: `#FFFFFF`
  - Viền mảnh: `1px solid #E2E8F0`
  - Chữ chính: `#0F172A`, chữ phụ: `#64748B`
- **Khóa 2 màu nhấn:**
  - Royal Indigo `#4F46E5`: Primary action, icon active, progress bar
  - Rose Crimson `#BE123C`: Đường găng CPM, cảnh báo xung đột
- **Typography:**
  - UI chung: `Roboto`
  - Mã task (`#TASK_101`), số giờ, Story Points (SP), latency, thông số CPM: `Roboto Mono` (`font-mono`)
- **Quy chuẩn hình học Modern B2B SaaS:**
  - Thẻ/bảng: `rounded-lg` (8px)
  - Nút/input/badge/menu active: `rounded-md` (6px)
  - Không dùng bóng đổ dày (dùng `shadow-xs` hoặc `shadow-none`), tuyệt đối không dùng nút `rounded-full` to bản.

## 3. Dynamic Branding & Split Authentication Specs
- **APIs Backend**:
  - `GET /api/v1/system/branding`: Truy vấn secure_url mới nhất từ Cloudinary.
  - `POST /api/v1/admin/branding/logo`: Admin upload logo ghi đè public_id cố định và xóa cache CDN.
- **Frontend**:
  - `BrandContext` (`useBrand()`): Quản lý global state logo và hàm refresh/update.
  - Trang xác thực Split Authentication (`SplitAuthPage`): Bố cục 2 cột hỗ trợ chuyển đổi mượt mà giữa `mode=login` và `mode=register`, sử dụng `<BrandLogoMark />`.
