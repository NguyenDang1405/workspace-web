# Icon System Rules - Single Source of Truth (SSOT)

## 1. Nguyên Tắc Cốt Lõi (Mandatory)
- **CẤM TUYỆT ĐỐI**: Import trực tiếp từ `lucide-react` trong bất kỳ file UI/Page/Component nào của ứng dụng (ngoại trừ file khai báo duy nhất `src/components/icons/AppIcons.tsx`).
- **BẮT BUỘC**: Mọi icon phải được gọi thông qua object `AppIcons` hoặc component `<BrandLogoMark />` được định nghĩa tập trung tại `src/components/icons/AppIcons.tsx`.
- **CẤM**: Sử dụng các thư viện icon ngoài khác (Heroicons, FontAwesome, Material Icons, hoặc emoji tự do trong UI).

## 2. Thông Số Kỹ Thuật Vector Chuẩn
- Tất cả các icon trong `AppIcons` đều được wrap tự động qua helper `withDefaultSpec`:
  - `strokeWidth = 1.5` (khóa cứng theo design system).
  - Kích thước mặc định `size = 16` (`16x16px` cho Sidebar, Navigation, Button, Form, Table).
  - Có thể override `size={20}` hoặc `size={24}` cho Card Header / Banner đặc biệt khi cần thiết.

## 3. Brand Logo Mark (`<BrandLogoMark />`)
- Render khối biểu tượng 3D Mobius Ribbon kích thước chuẩn `28x28px` (`w-7 h-7 rounded-md`).
- Nền gradient từ **Royal Indigo** (`#4F46E5`) sang **Electric Cyan** (`#06B6D4`).
- Đường vẽ SVG Mobius Ribbon vô cực màu trắng (`strokeWidth="2"`), **tuyệt đối không chứa text bên trong**.

## 4. Bảng Ánh Xạ Nghiệp Vụ Cố Định (Registry Specification)
### 4.1. User Sidebar (6 mục cố định)
- `navAiDecompose`: `Sparkles` ("Khởi Tạo & Phân Rã AI")
- `navKanban`: `Kanban` ("Bảng Công Việc (Kanban)")
- `navCalendar`: `Calendar` ("Lịch Biểu Thích Ứng")
- `navDagGantt`: `GitFork` ("Đồ Thị Mạng DAG & Gantt")
- `navBacklogSrs`: `Layers` ("Backlog & Yêu Cầu SRS")
- `navAnalytics`: `BarChart2` ("Hồ Sơ Năng Lực & Báo Cáo")

### 4.2. Admin Sidebar (6 mục cố định)
- `adminMonitor`: `Activity` ("Giám Sát Tài Nguyên & Server")
- `adminRbac`: `ShieldCheck` ("Người Dùng & Phân Quyền RBAC")
- `adminOrg`: `Building2` ("Tổ Chức & Đa Không Gian")
- `adminAudit`: `FileClock` ("Nhật Ký & Độ Trễ AI (Audit Log)")
- `adminRag`: `Database` ("Cấu Hình Thuật Toán & RAG")
- `adminAgent`: `Cpu` ("Điều Phối Multi-Agent & Prompt")

### 4.3. Top Bar & Common Controls
- `refresh`: `RefreshCw`
- `download`: `Download`
- `search`: `Search`
- `plus`: `Plus`
- `close`: `X`
- `chevronDown`: `ChevronDown`
- `chevronRight`: `ChevronRight`
- `chevronLeft`: `ChevronLeft`
- `override`: `SlidersHorizontal`
- `lock`: `Lock`
- `clock`: `Clock`
- `users`: `Users`
- `trash`: `Trash2`

### 4.4. CPM Status, Git Diff & Academic Artifacts
- `criticalAlert`: `AlertTriangle` (Cảnh báo xung đột / CPM)
- `verifiedCheck`: `CheckCircle2` (Đã kiểm định / Verified)
- `uploadFile`: `FileUp`
- `docWord`: `FileText`
- `codeDiff`: `FileCode`
- `fileVerified`: `FileCheck2`
- `slides`: `Presentation`
- `video`: `Video`

## 5. Quy Chuẩn Màu Sắc Thiết Kế (Color Coding)
- **Icon Sidebar Active**: `#4F46E5` (Royal Indigo)
- **Icon Sidebar Inactive / Controls thường**: `#64748B` hoặc `#475569`
- **Icon Cảnh báo Đường găng CPM / Xung đột lịch**: `#BE123C` (Rose Crimson)
- **Icon Trạng thái Hoàn thành / Active**: `#10B981` / `#059669` (Emerald)
