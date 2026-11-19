# SMART WORKSPACE — ADMIN PORTAL & SYSTEM CONTROL SPECIFICATION

> **Tài liệu đặc tả kỹ thuật chi tiết** cho toàn bộ **6 màn hình Admin Portal** (Hệ thống quản trị hạ tầng, RBAC, Đa tổ chức, Audit Log AI, Cấu hình RAG và Multi-Agent Prompt Studio).
> **Tham chiếu gốc**: Kế thừa 100% Design Tokens, Logo Cloudinary động (`<BrandLogoMark />`) và `AppIcons` từ `markdown/UI_DESIGN_SYSTEM_AND_SPECS.md`.

---

## 1. QUY TẮC KHÓA CỨNG TOÀN CỤC (NON-NEGOTIABLE RULES)

1. **Khóa Thư Viện Icon Tập Trung (`AppIcons.tsx`)**:
   * **Cấm tuyệt đối** tự ý vẽ thẻ `<svg>` thủ công, dùng emoji, hoặc import rời rạc từ `lucide-react` trong bất kỳ file trang/component nào.
   * Mọi icon trên cả 6 trang Admin bắt buộc phải gọi từ object `AppIcons` trong `src/components/icons/AppIcons.tsx` với nét vẽ cố định `strokeWidth={1.5}` và kích thước chuẩn `16px`.
2. **Logo Cấp Phát Động Qua Cloudinary SDK (`<BrandLogoMark />`)**:
   * Header của Admin Sidebar và các vị trí thương hiệu đều dùng `<BrandLogoMark />` kết nối `BrandContext` (`GET /api/v1/system/branding`).
   * **Tính năng quản trị Logo (Tích hợp trong Admin Settings / Organization)**: Khi Admin tải lên hoặc cập nhật logo mới thông qua `POST /api/v1/admin/branding/logo`, `BrandContext` tự động gọi `refreshBranding()` để cập nhật logo ngay lập tức trên toàn bộ User Workspace, Auth và Admin Portal mà không cần reload trang.
3. **Đồng Nhất Bảng Màu & Hình Học Moodboard**:
   * **Bề mặt**: Nền chính `#F8FAFC` (`surface-canvas`), Sidebar `#F1F5F9` (`surface-sidebar`), thẻ/bảng `#FFFFFF` (`surface-card`), viền mảnh `1px solid #E2E8F0`.
   * **Bo góc**: `rounded-lg` (`8px`) cho thẻ KPI, bảng dữ liệu, khung code/prompt; `rounded-md` (`6px`) cho nút bấm, input, badge, thanh trượt và mục menu active.
   * **Màu nhấn**:
     * **Royal Indigo (`#4F46E5`)**: Nút hành động chính, mục Sidebar đang active, thanh trượt cấu hình, checkbox quyền hạn, biểu đồ đường chi phí.
     * **Teal (`#0D9488`)**: Trạng thái `ONLINE`, `200 OK`, `Auto-saved`, `Đã Đồng Bộ Vector`, chấm xanh `Làm mới: 5s`.
     * **Rose Crimson (`#BE123C`)**: Cảnh báo quá tải, lỗi `504 GATEWAY TIMEOUT`, trạng thái `ĐÃ ĐÓNG BĂNG`, vượt hạn ngạch Token (`Hết hạn ngạch`).
   * **Typography**: `Roboto` cho tiêu đề/nhãn tiếng Việt; `Roboto Mono` cho toàn bộ thông số kỹ thuật (`182ms`, `99.4%`, `28,450`, `POST /v1/ai/...`, `#WS-104`, `v2.4.0-prod`).

---

## 2. KHUNG GIAO DIỆN ADMIN SHELL DÙNG CHUNG (`AdminLayout.tsx`)

Tất cả 6 màn hình Admin dùng chung 1 layout vỏ bọc duy nhất:

* **Left Admin Sidebar (`260px`, `#F1F5F9`, `border-r 1px solid #E2E8F0`)**:
  * **Brand Header**: `<BrandLogoMark />` + `"Smart Workspace"` (`16px Bold #0F172A`) + vạch phân cách `1px solid #E2E8F0`.
  * **6 Mục Điều Hướng Cố Định** (`13px`, `whitespace-nowrap`, mục active có nền `#FFFFFF`, viền `1px solid #CBD5E1`, `rounded-md`, chữ `#0F172A` đậm và icon `#4F46E5`):
    1. `Giám Sát Tài Nguyên & Server` $\rightarrow$ `AppIcons.adminMonitor` (`activity`)
    2. `Người Dùng & Phân Quyền RBAC` $\rightarrow$ `AppIcons.adminRbac` (`shield-check`)
    3. `Tổ Chức & Đa Không Gian` $\rightarrow$ `AppIcons.adminOrg` (`building-2`)
    4. `Nhật Ký & Độ Trễ AI (Audit Log)` $\rightarrow$ `AppIcons.adminAudit` (`file-clock`)
    5. `Cấu Hình Thuật Toán & RAG` $\rightarrow$ `AppIcons.adminRag` (`database`)
    6. `Điều Phối Multi-Agent & Prompt` $\rightarrow$ `AppIcons.adminAgent` (`cpu`)
  * **Sidebar Footer**: Hiển thị phiên bản hệ thống `v2.4.0-prod` (`Roboto Mono 11px #64748B`) bên trái và trạng thái `• Online` (`#0D9488`) bên phải.
* **Top App Bar (`h-14`, `#FFFFFF`, `border-b 1px solid #E2E8F0`)**:
  * **Trái**: Breadcrumbs `"Admin Portal  >  [Tên Mục Đang Chọn]"`.
  * **Phải**: Tag `Làm mới: 5s` + Nút `Xuất CSV` + Vạch đứng `1px` + Avatar `ĐN` + `"Đặng Hồng Nguyên"` (kèm nhãn phụ `"System Administrator"`).

---

## 3. ĐẶC TẢ CHI TIẾT 6 MÀN HÌNH ADMIN PORTAL

### Màn hình 1: Xung Nhịp Hạ Tầng & Dịch Vụ AI (`/admin/pulse`)
* **Header**: Tiêu đề `"Xung Nhịp Hạ Tầng & Dịch Vụ AI"` + Badge trạng thái góc phải `"• 2 Nodes Online • Tải hệ thống: 46.3%"` (`Roboto Mono`).
* **Lưới 4 Thẻ Giám Sát (`grid-cols-1 lg:grid-cols-2 gap-4`)**:
  1. **Máy Chủ Nghiệp Vụ: `workspace-api`** (`ONLINE` `#0D9488`):
     * 2 ô con: `CPU Usage: 24.5%` (thanh tiến độ `#0D9488`) và `RAM: 32%` (thanh tiến độ `#4F46E5`).
     * Footer thẻ: `WebSockets: 142` | `Uptime: 99.98%`.
  2. **Máy Chủ Trí Tuệ Nhân Tạo: `ai-service`** (`ONLINE` `#0D9488`):
     * 2 ô con: `GPU Load: 68.2%` (thanh tiến độ cảnh báo vàng/cam) và `VRAM: 67.5%` (thanh tiến độ `#4F46E5`).
     * Footer thẻ: `Latency: 210ms` (badge `#EEF2FF`) | `Queue: 0`.
  3. **Tiêu Thụ OpenAI API & Chi Phí** (`Tháng 10/2024`):
     * 3 ô con: `Input Tokens: 412,800`, `Output Tokens: 138,450`, `Chi phí tháng: $42.80 / $100` (badge `Trong ngưỡng an toàn` `#0D9488`).
     * Biểu đồ đường tích lũy 14 ngày (`#4F46E5`) kèm đường nét đứt ngang màu Cyan (`#06B6D4`) đánh dấu `Ngưỡng cảnh báo ($8/ngày)`.
  4. **Trạng Thái Vector Store & Database**:
     * Ô 1: `Active Vector Records (pgvector): 28,450 records` + badge `HNSW Index • 8.4ms`.
     * Ô 2: `Connection Pool (Prisma): 22 / 100 Active` (`Idle: 78` • `Tối ưu`).
     * Nút hành động đáy thẻ: `"Kiểm Tra Chỉ Mục (Verify HNSW)"` (`1px solid #E2E8F0`, chữ `#4F46E5`).

### Màn hình 2: Quản Lý Tài Khoản & Ma Trận Phân Quyền RBAC (`/admin/rbac`)
* **Header**: Tiêu đề `"Quản Lý Tài Khoản & Ma Trận Phân Quyền (RBAC)"` + Nút chính `"+ Thêm Tài Khoản"` (`#4F46E5`).
* **Thanh Tìm Kiếm & Bộ Lọc**: Ô tìm kiếm + 4 chip lọc tương tác (`Tất cả (1,240)`, `ENTERPRISE (420)`, `INDIVIDUAL (820)`, `Đình chỉ (12)`) + Nút `"Gán Hạn Ngạch AI Hàng Loạt (Bulk Quota)"`.
* **Khối Nội Dung 2 Cột (`grid-cols-12 gap-4`)**:
  * **Cột Trái (Span 7) — Danh Sách Người Dùng & Hạn Ngạch AI**:
    * Bảng 4 cột (`TÀI KHOẢN`, `PHÂN LOẠI`, `VAI TRÒ`, `HẠ NGẠCH AI (TOKEN QUOTA)`):
      * Hiển thị avatar chữ cái đầu, họ tên, email, badge phân loại (`ENTERPRISE`/`INDIVIDUAL`), badge vai trò (`LEADER`, `MEMBER`, `ADMIN`, `INTERN`) và thanh tiến độ sử dụng Token theo màu mức độ (`#4F46E5` bình thường, cam `95% High Load`, `#BE123C` đỏ `30k / 30k (Hết hạn ngạch)`).
  * **Cột Phải (Span 5) — Ma Trận Quyền Hạn Thao Tác (CRUD Authority)**:
    * Badge góc phải `"• Auto-saved"` (`#0D9488`).
    * Bảng checkbox tương tác giữa 4 vai trò (`ADMIN`, `LEADER`, `MEMBER`, `INTERN`) và 2 nhóm quyền (`DỰ ÁN & ĐỒ THỊ DAG`: Tạo/Phân rã SRS, Xem đa góc nhìn, Sửa đường găng, Xóa dự án; `ĐIỀU PHỐI & NGHIỆM THU`: Duyệt giao việc, Thẩm định PR/Bài nộp, Cấu hình Hệ thống/RAG).
    * Nút đáy thẻ: `"Lưu Cấu Hình Phân Quyền (Apply RBAC)"` (`#4F46E5`).

### Màn hình 3: Quản Lý Tổ Chức & Không Gian Làm Việc (`/admin/organizations`)
* **Header**: Tiêu đề `"Quản Lý Tổ Chức & Không Gian Làm Việc (Multi-Workspace)"` + Nút `"+ Thêm Tổ Chức / Workspace"` (`#4F46E5`).
* **Hàng 3 Thẻ KPI**:
  1. `Tổng Số Tổ Chức`: `12 Tổ chức` (`8 Enterprise • 4 Academic`).
  2. `Không Gian Hoạt Động`: `48 Workspaces` (`44 Hoạt động` • `4 Đóng băng`).
  3. `Tài Khoản Liên Kết`: `1,240 Thành viên` (`92% Đã phân bổ Quota`).
* **Thanh Tìm Kiếm & Bộ Lọc**: Ô tìm kiếm + 4 chip lọc (`Tất cả (48)`, `Doanh Nghiệp (32)`, `Học Viện & Đồ Án (16)`, `Đang Đóng Băng (4)`).
* **Khối 2 Cột (`grid-cols-12 gap-4`)**:
  * **Cột Trái (Span 5) — Cấu Trúc Cây Phân Cấp**:
    * Cây thư mục mở rộng/thu gọn được (`FPT Software Corp [ENTERPRISE]` $\rightarrow$ `Khối Automotive & AI Hub` $\rightarrow$ `Project Autonomous-Nav #WS-082`; `Đại Học Bách Khoa - ĐHĐN [ACADEMIC]` $\rightarrow$ `Khoa CNTT` $\rightarrow$ `Smart Workspace Core #WS-104`).
  * **Cột Phải (Span 7) — Danh Sách Không Gian Hoạt Động**:
    * Bảng 5 cột (`WORKSPACE / MÃ`, `CHỦ SỞ HỮU`, `THÀNH VIÊN & QUOTA`, `TRẠNG THÁI`, `THAO TÁC`).
    * Hỗ trợ thao tác `"Chuyển Quyền"`, `"Mở Đóng Băng"` và `"Xóa"` (`#BE123C`) cho workspace bị đóng băng (`#WS-012`).
    * *(Tích hợp khu vực cài đặt Brand Logo Cloudinary cho tổ chức / hệ thống tại modal cấu hình khi bấm thêm/sửa tổ chức).*

### Màn hình 4: Nhật Ký Kiểm Toán & Đo Lường Độ Trễ AI (`/admin/audit-log`)
* **Header**: Tiêu đề `"Nhật Ký Kiểm Toán & Đo Lường Độ Trễ AI (AI Service Audit)"` + Nút `"Ping AI Service"` (`#4F46E5`).
* **Hàng 3 Thẻ KPI**:
  1. `ĐỘ TRỄ TRUNG BÌNH (AVG LATENCY)`: `182ms` (`↓ 14ms so với giờ trước` `#0D9488`, `P95: 340ms • P99: 610ms`).
  2. `TỶ LỆ THÀNH CÔNG (REQUEST SUCCESS RATE)`: `99.4%` (`Target: 99.0%`, `28,410 lượt gọi thành công hôm nay`).
  3. `SỰ CỐ & FALLBACK (ISSUES DETECTED)`: `16 lỗi` (`#BE123C`, `0.06% tổng lượt`, `12 Timeout • 4 Token Exceeded`).
* **Bảng Nhật Ký Chi Tiết (6 Cột)**:
  * Thanh tìm kiếm Request ID/Endpoint + 5 tab lọc (`Tất cả (28,426)`, `Thành công 200 OK (28,410)`, `Timeout (12)`, `Token Exceeded (4)`, `Fallback Triggered (8)`) + Nút `"Xuất Log Kiểm Toán (CSV)"`.
  * Cột bảng (`Roboto Mono`): `THỜI GIAN`, `ENDPOINT API` (`POST /v1/ai/cpm/calculate-dag`, `POST /v1/ai/rag/parse-srs`...), `TÁC VỤ NGHIỆP VỤ`, `MODEL XỬ LÝ` (`vLLM / Qwen-2.5`, `OpenAI / GPT-4o-mini`, `Fallback -> GPT-4o`), `ĐỘ TRỄ` (`124ms`, `5,200ms (Vượt ngưỡng)` màu `#BE123C`), `TRẠNG THÁI HTTP` (`200 OK`, `504 GATEWAY TIMEOUT`, `200 OK (FALLBACK)`).

### Màn hình 5: Cấu Hình Thuật Toán & Kho Tri Thức RAG (`/admin/rag-config`)
* **Header**: Tiêu đề `"Cấu Hình Thuật Toán & Kho Tri Thức Dùng Chung (RAG Repository)"` + Nút `"Lưu Cấu Hình Thuật Toán"` (`#4F46E5`).
* **Khối 2 Cột (`grid-cols-12 gap-4`)**:
  * **Cột Trái (Span 6) — Tài Liệu Nạp Dùng Chung (Global Documents)**:
    * Nút `"+ Tải Lên Tài Liệu (PDF/MD)"` (`#4F46E5`) + Vùng kéo thả nét đứt (`.PDF, .MD, .DOCX`, tối đa `25MB`).
    * Danh sách tệp đã nạp:
      * `IEEE-830-SRS-Standard-Template.pdf` (`1.8 MB • 850 Vectors indexed` • badge `Đã Đồng Bộ Vector` `#0D9488`).
      * `Engineering-Definition-of-Done-v2.md` (`420 KB • 850 Vectors` • badge `Đã Đồng Bộ Vector`).
      * `Software-Architecture-Guidelines.pdf` (`3.1 MB • Đang chunking 80% (640 / 800 chunks)` với thanh tiến độ cam và nút hủy `X`).
    * Footer thẻ: `HNSW Vector Index Status: 4,270 chunks active in pgvector` + nút `"Xây dựng lại chỉ mục (Rebuild Index)"`.
  * **Cột Phải (Span 6) — Cấu Hình Thuật Toán AI & Tham Số RAG**:
    * Thanh trượt (Sliders) tương tác thời gian thực:
      * `Chunk Size (Kích thước phân đoạn)`: `512 tokens` (kèm ô số đồng bộ).
      * `Chunk Overlap (Độ chồng lặp ngữ cảnh)`: `64 overlap`.
      * Dropdown `Mô Hình Nhúng (Embedding Model)`: `text-embedding-3-small (1,536 dim)`.
      * `Top-K Vectors Retrieved`: `5`.
    * Box ngưỡng tương đồng: `Cosine Distance < 0.22` (`Tương đương: Similarity > 0.78` • badge `Khuyên Dùng`).
    * Công tắc Toggle bật/tắt: `Tìm Kiếm Kết Hợp (Hybrid Search)` (Active `#4F46E5`).

### Màn hình 6: Điều Phối Đa Tác Nhân & Quản Trị Prompt Hệ Thống (`/admin/multi-agent`)
* **Header**: Tiêu đề `"Điều Phối Đa Tác Nhân & Quản Trị Prompt Hệ Thống (Multi-Agent Studio)"` + Nút `"Triển Khai Cấu Hình (Deploy Pipeline)"` (`#4F46E5`).
* **Hàng 3 Thẻ Chọn Agent (`grid-cols-3 gap-4`)**:
  1. `SRS Decomposer Agent` (Active: viền `1.5px solid #4F46E5`, badge `Active v2.4`, `98.4% Accuracy`).
  2. `DAG CPM Scheduler Agent` (`Standby`, `Target: Critical Path`).
  3. `Talent Matchmaker Agent` (`Standby`, `Target: Skill Matrix`).
  *(Cho phép click chuyển đổi qua lại giữa 3 Agent để nạp System Prompt và Hyperparameters tương ứng).*
* **Khối 2 Cột (`grid-cols-12 gap-4`)**:
  * **Cột Trái (Span 7) — Trình Biên Tập Prompt Hệ Thống (System Prompt Editor)**:
    * Badge đếm token động góc phải: `Tokens: 642 / 4,096` (`Roboto Mono`).
    * Khung soạn thảo code/prompt có đánh số dòng (`01` $\rightarrow$ `14`), syntax highlight từ khóa (`You are`, `INPUT:`, `OUTPUT SPECIFICATION:`, `Directed Acyclic Graph (DAG)`, `INVEST criteria`) và schema JSON.
    * 2 nút đáy thẻ: `"Khôi Phục Mặc Định (Reset)"` và `"Chạy Thử Nghiệm Prompt (Playground Run)"` (`#4F46E5`).
  * **Cột Phải (Span 5) — Tham Số Siêu Cấu Hình & Bộ Định Tuyến (`vLLM-Engine-v0.6`)**:
    * Dropdown `Mô hình xử lý chính (Local Inference)`: `vLLM Worker: Qwen-2.5-Coder-7B-Instruct`.
    * Box cấu hình Fallback với công tắc Toggle (`#4F46E5`): `"Tự động Fallback sang OpenAI khi cụm quá tải (>3s)"` $\rightarrow$ `OpenAI GPT-4o-mini (Cloud API) [Backup]`.
    * 3 thanh trượt Hyperparameters: `Temperature` (`0.20`), `Max Output Tokens` (`2,048 Tokens`), `Top-P Sampling` (`0.90`).
    * 2 Checkbox kiểm soát đầu ra: `Bắt buộc Structured JSON Schema (vLLM Guided Decoding)` và `Tự động trích lọc tài liệu RAG tương đồng trước khi nạp Prompt`.