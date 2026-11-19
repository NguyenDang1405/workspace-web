# SMART WORKSPACE — AI INGESTION, DECOMPOSITION & DISPATCH SPECIFICATION

> **Tài liệu đặc tả kỹ thuật chi tiết** cho toàn bộ **5 màn hình thuộc Phân Hệ 1 (Khởi Tạo & Phân Rã AI)**:
> 1. Trung Tâm Nạp Tài Liệu & Khởi Tạo Đồ Án (Document Ingestion Hub)
> 2. Đối Soát Nguồn Bóc Tách (AI Parsing Inspector & Source Traceability)
> 3. Ma Trận Xử Lý & Điều Phối AI (Multi-Agent Processing Matrix)
> 4. Đối Soát Kế Hoạch & Gán Tác Vụ Thông Minh (PM Dispatch Matrix)
> 5. Kích Hoạt Lộ Trình Học Tập & Làm Đồ Án Cá Nhân (Academic Roadmap Activation)
>
> **Tham chiếu gốc**: Kế thừa 100% Design Tokens, Logo Cloudinary động (`<BrandLogoMark />`) và `AppIcons` từ `markdown/UI_DESIGN_SYSTEM_AND_SPECS.md`.

---

## 1. CHỈ THỊ SỬA LỖI MÀU SẮC & TEXT TỪ MOCKUP (MANDATORY UI CORRECTIONS)

Khi chuyển đổi 5 ảnh thiết kế đính kèm thành code thực tế, AI Coding Agent **BẮT BUỘC** thực hiện các điều chỉnh chuẩn hóa sau để khắc phục các lỗi sai lệch màu sắc và chữ thừa xuất hiện trên ảnh mẫu:

1. **Chuẩn hóa Tông Màu Indigo & Teal (Cấm dùng màu tím nhạt / đỏ cam sai chuẩn)**:
   * **Sửa màu Tím nhạt (`#6366F1` / `#7C3AED`) trên ảnh mẫu**: Toàn bộ nút hành động chính, thanh tiến độ (`62%`, `98.4%`), badge bước đang chọn (`Bước 1`, `#US-04`, `Tất cả (14)`), và đường viền active BẮT BUỘC dùng đúng mã **Royal Indigo (`#4F46E5`)**.
   * **Sửa màu Cảnh báo / Lỗi PDF**: Trong ảnh *Document Ingestion Hub*, icon tệp PDF `De_Cuong_Do_An_Tot_Nghiep_K2026.pdf` đang dùng màu đỏ san hô nhạt — hãy chuẩn hóa về nền `#FFF1F2`, viền `1px solid #FFE4E6`, icon màu **Rose Crimson (`#BE123C`)**.
   * **Sửa màu Trạng thái Hoàn tất**: Các badge `"Đã quét Text Layer"`, `"Hoàn tất (1.2s • 14 Stories, 42 Tasks)"`, `"Đã trích xuất: 14 User Stories • 42 Sub-tasks"` dùng chuẩn nền `#F0FDF4`, viền `1px solid #CCFBF1`, chữ **Teal (`#0D9488`)**.
   * **Sửa màu Thẻ Tác nhân AI (`Ingestion Agent`)**: Trong ảnh *Document Ingestion Hub*, icon robot đang bị tô nền tím đậm — chuyển về nền trung tính `#F1F5F9`, viền `1px solid #E2E8F0`, icon `AppIcons.adminAgent` (`cpu`) màu `#4F46E5` nét mảnh `1.5px`.

2. **Xóa Bỏ Văn Bản Thừa / Meta-Text Của Prototype**:
   * **Xóa nhãn tên Frame trên nút bấm**:
     * Nút `"Xác Nhận & Chạy Ma Trận Xử Lý AI (Frame 11)"` $\rightarrow$ Sửa thành **`"Xác Nhận & Chạy Ma Trận Xử Lý AI →"`**.
     * Nút `"Chuyển Tiếp Tới Bảng Đối Soát (Frame 12)"` $\rightarrow$ Sửa thành **`"Chuyển Tiếp Tới Bảng Đối Soát →"`**.
     * Dòng ghi chú dưới nút `"Kích Hoạt Phân Rã & Đối Soát Nguồn →"` có chữ `(Frame 10B)` $\rightarrow$ Sửa thành **`"Hệ thống sẽ chuyển sang giao diện đối soát nguồn bóc tách sau khi quét xong."`**.
   * **Xóa nhãn `"M3 Light Parser"`**: Trong thẻ *Tài Liệu Nguồn (SRS & Specification Source)* của màn hình 1, đổi badge `"M3 Light Parser"` thành **`"PDF / DOCX Parser"`**.
   * **Xóa Breadcrumb trùng lặp**: Ở màn hình 1, xóa dòng breadcrumb phụ `"Khởi Tạo & Phân Rã AI > Nạp Tài Liệu Nguồn"` nằm ngay trên tiêu đề H1 (vì đã có trên Top App Bar).
   * **Sửa ký tự icon lỗi (`⍰`)**: Các ô vuông ký tự lỗi xuất hiện cạnh chữ `"Đối soát tự động"` hoặc trong nút bấm trên ảnh mẫu phải được thay thế hoàn toàn bằng icon chuẩn từ `AppIcons.tsx` (`strokeWidth={1.5}`).

3. **Khóa Thư Viện Icon & Logo Động Cloudinary**:
   * Cả 5 màn hình đều dùng chung **User Workspace Sidebar (`260px`)** với mục 1 **`Khởi Tạo & Phân Rã AI`** (`AppIcons.navAiDecompose`) ở trạng thái **ACTIVE** (`#FFFFFF` bg, `1px solid #CBD5E1`, `rounded-md`, chữ `#0F172A` đậm, icon `#4F46E5`).
   * Logo ở góc trên Sidebar bắt buộc gọi `<BrandLogoMark />` kết nối với `BrandContext` (cấp phát động từ Cloudinary SDK).

---

## 2. ĐẶC TẢ CHI TIẾT 5 MÀN HÌNH (PHÂN HỆ 1: KHỞI TẠO & PHÂN RÃ AI)

### Màn hình 1: Trung Tâm Nạp Tài Liệu & Khởi Tạo Đồ Án (`/ai-decompose/ingest`)
* **Top App Bar**: Breadcrumbs `"Khởi Tạo & Phân Rã AI  >  Trung Tâm Nạp Tài Liệu (Document Ingestion Hub)"`.
* **Header & Stepper 3 Bước**:
  * Trái: Tiêu đề `"Khởi Tạo & Phân Rã AI: Nạp Tài Liệu Nguồn"` + mô tả *"Tải lên đề cương môn học, tài liệu SRS hoặc mục tiêu để AI tự động bóc tách User Stories và lập lịch đường găng CPM."*
  * Phải: Stepper 3 bước ngang: `[ • Bước 1: Nạp Tài Liệu ]` (Active `#4F46E5`) $\rightarrow$ `[ Bước 2: Đối Soát Nguồn ]` $\rightarrow$ `[ Bước 3: Duyệt Điều Phối ]`.
* **Khối Giữa (2 Cột `grid-cols-12 gap-4`)**:
  * **Cột Trái (Span 7) — Tài Liệu Nguồn (SRS & Specification Source)**:
    * Segmented Tabs: `[ Tệp PDF Đề Cương / SRS ]` (Active), `[ Markdown / DOCX ]`, `[ Soạn Thảo Văn Bản Tự Do ]`.
    * Vùng Dropzone nét đứt (`1.5px dashed #CBD5E1`, `rounded-lg`): Hỗ trợ kéo thả `.PDF, .MD, .DOCX` tối đa `25MB`, nút `"Chọn tệp từ máy tính"`.
    * Card tệp đã nạp: `De_Cuong_Do_An_Tot_Nghiep_K2026.pdf` (`3.4 MB • 28 Trang • 100% OCR Hoàn Tất`) + Badge `"Đã quét Text Layer"` (`#0D9488`) + nút xóa `X`.
    * Box tóm tắt trích xuất sơ bộ: *"AI đã trích xuất sơ bộ 14 Chương mục và 42 Yêu cầu chức năng (FR) từ tài liệu nạp..."*.
    * Thanh chỉ số `Độ tin cậy cấu trúc tài liệu (OCR Index): 98.4%` + 3 ô thông số dưới đáy: `TOKEN VECTOR: 38,410`, `CHƯƠNG TRÌNH LỌC: Semantic`, `NGÔN NGỮ: VI / EN`.
  * **Cột Phải (Span 5) — Bảng Cài Đặt Thông Số Phân Rã**:
    * Radio Cards chọn **Độ Sâu Phân Rã Task**:
      1. `Chi Tiết (Granular WBS)` (Active: viền `1.5px solid #4F46E5`, badge `Khuyên dùng`).
      2. `Mức Cao (High-Level Epics)` (`Milestones`).
    * Input `Thời Gian Hoàn Thành Mong Muốn`: `20/12/2026` (badge `Sprint 1 - 4`).
    * Input `Dự phòng độ trôi đường găng (Slack Buffer)`: `15%`.
    * Card `Tác Nhân AI Xử Lý`: `Ingestion Agent` (`vLLM Local Llama` • `K=24 Embeddings` • trạng thái `• Online` `#0D9488`).
    * Nút CTA chính: `"Kích Hoạt Phân Rã & Đối Soát Nguồn →"` (`#4F46E5`).
* **Khối Đáy — Tiến Trình Đọc Hiểu Đa Tác Nhân (Telemetry Stream)**:
  * Thanh 4 bước ngang: `1. Nạp Tài Liệu & OCR (Hoàn thành 28/28 trang)` $\rightarrow$ `2. Bóc Tách & Gắn Nhãn WBS (Đang chờ kích hoạt)` $\rightarrow$ `3. Khớp Nối Phụ Thuộc (DAG)` $\rightarrow$ `4. Tính Đường Găng CPM`.

---

### Màn hình 2: Đối Soát Nguồn Bóc Tách (`/ai-decompose/traceability`)
* **Top App Bar**: Breadcrumbs `"Khởi Tạo & Phân Rã AI  >  Bước 2: Đối Soát Nguồn Bóc Tách (Traceability Inspector)"`.
* **Thanh Công Cụ Tài Liệu Nguồn**:
  * Tên file `De_Cuong_Do_An_Tot_Nghiep_K2026.pdf` + Badge `"Đã trích xuất: 14 User Stories • 42 Sub-tasks"` (`#0D9488`) + Nút `"Đối soát tự động (Auto-Trace)"` + Nút `"Tải Lại Bóc Tách"`.
* **Khối Split-View 2 Cột (`grid-cols-12`)**:
  * **Cột Trái (Span 7) — Trình Xem Tài Liệu Gốc & Highlight Trích Xuất**:
    * Header: Badge `TRANG 04 / 28` (`Roboto Mono`) + `"Mục 3.2: Đặc tả kiến trúc Multi-Agent & Thuật toán CPM"`.
    * Hiển thị đoạn văn bản gốc 3.1, khối trích dẫn được highlight viền trái/khung màu `#4F46E5` với nhãn `"Căn cứ trích xuất cho #US-04 • Khớp 94.2%"`, và đoạn văn bản 3.3 bên dưới.
  * **Cột Phải (Span 5) — Danh Sách User Stories Đã Bóc Tách**:
    * 3 Chip lọc tương tác: `[ Tất cả (14) ]` (Active `#4F46E5`), `[ Độ tin cậy > 90% ]`, `[ Cần rà soát (2) ]` (viền `#FFE4E6`, chữ `#BE123C`).
    * Danh sách thẻ User Story (click chọn thẻ nào thì cột trái tự động cuộn & highlight đúng đoạn văn bản gốc tương ứng):
      * `#US-04` (`Topological CPM Solver` • `Độ tin cậy: 94.2%` • Active viền `#4F46E5` • Badge `"Đang trỏ tới: Trang 4 - Đoạn 3.2"`).
      * `#US-05` (`Talent Matchmaker` • `Độ tin cậy: 91.5%`).
      * `#US-06` (`SRS Ingestion Worker` • Badge cảnh báo `#FFF1F2` / `#BE123C`: `"Độ tin cậy: 78.4% (Cần rà soát)"`).
* **Action Footer Bar**: Icon check `#0D9488` `"Đã xác nhận 13/14 User Stories hợp lệ..."` | Nút `"Chỉnh Sửa Thủ Công"` + Nút chính `"Xác Nhận & Chạy Ma Trận Xử Lý AI →"` (`#4F46E5`).

---

### Màn hình 3: Ma Trận Xử Lý & Điều Phối AI (`/ai-decompose/processing`)
* **Top App Bar**: Breadcrumbs `"Khởi Tạo & Phân Rã AI  >  Bước 3: Ma Trận Xử Lý & Điều Phối AI (Processing Matrix)"`.
* **Card Trung Tâm (`max-w-4xl mx-auto`, `#FFFFFF`, `rounded-lg`, `1px solid #E2E8F0`)**:
  * **Header**: Badge `MULTI-AGENT ORCHESTRATION ENGINE • ĐANG XỬ LÝ` (`#EEF2FF` / `#4F46E5`) bên trái và Badge `• Thời gian chạy: 00:05.6s` (`Roboto Mono` / `#0D9488`) bên phải.
  * **Tiêu đề**: `"Đang Tổng Hợp Đồ Thị Công Việc & Tối Ưu Lịch Trình..."` + phụ đề file `De_Cuong_Do_An_Tot_Nghiep_K2026.pdf`.
  * **Thanh Tiến Độ Tổng Thể**: `"Tiến độ tổng thể: Đang thực thi Bước 2/4"` — `62%` (thanh fill `#4F46E5`).
  * **Khung Console Stream (`ai-service://vllm-orchestrator-stream` | `vLLM Local • Llama-3-8B-Instruct`)**:
    1. `[BƯỚC 1/4]` Bóc tách yêu cầu và trích xuất cấu trúc thực thể $\rightarrow$ Badge `Hoàn tất (1.2s • 14 Stories, 42 Tasks)` (`#0D9488`).
    2. `[BƯỚC 2/4]` Xây dựng đồ thị có hướng DAG và tính toán CPM Critical Path... $\rightarrow$ Badge `Đang chạy (62%)` (`#4F46E5`), hiển thị log terminal bên dưới: Topological Sort hợp lệ, Forward/Backward Pass, phát hiện chuỗi đường găng `Slack = 0: 8 nút trọng yếu (Tổng thời lượng: 184 giờ)`.
    3. `[BƯỚC 3/4]` Quét hồ sơ năng lực thành viên và cân bằng tải công việc... $\rightarrow$ `Đang chờ...`.
    4. `[BƯỚC 4/4]` Tối ưu hóa khung thời gian trên lịch trình cá nhân... $\rightarrow$ `Đang chờ...`.
  * **Footer Telemetry & Actions**: `Tốc độ sinh token: 68.4 tokens/s` | `Bộ nhớ đệm Vector: Đã đồng bộ` | Nút `"Hủy Tiến Trình"` + Nút chính `"Chuyển Tiếp Tới Bảng Đối Soát →"` (`#4F46E5`).

---

### Màn hình 4: Đối Soát Kế Hoạch & Gán Tác Vụ Thông Minh (`/ai-decompose/dispatch`)
* **Top App Bar**: Breadcrumbs `"Khởi Tạo & Phân Rã AI  >  Bước 4: Đối Soát & Phân Bổ Nhân Sự (PM Dispatch)"`.
* **Header & Summary Badges**:
  * Tiêu đề `"Đối Soát Kế Hoạch & Gán Tác Vụ (Dispatch Matrix)"` + Badges góc phải: `• Đã ghép cặp: 14/14 Tasks` và cảnh báo `5 Task trên đường găng CPM` (`#FFF1F2` bg, `#BE123C` text).
* **Thanh Điều Khiển Auto-Reschedule & Bộ Lọc**:
  * Công tắc Toggle (`#4F46E5`): `"Cơ chế điều lịch tự động (Auto-Reschedule)"` (`Bật: Tối ưu theo Slack`).
  * 4 Chip lọc tương tác: `[ Tất cả (14) ]` (Active `#4F46E5`), `[ Đường Găng CPM (5) ]`, `[ Khớp > 90% ]`, `[ Đã Sửa Tay (1) ]`.
* **Bảng Đối Soát 4 Cột (`TÁC VỤ & ĐẶC TẢ KỸ THUẬT`, `NHÂN SỰ ĐỀ XUẤT (AI / MANUAL)`, `ĐỘ PHÙ HỢP (COSINE ELO)`, `CĂN CỨ GHÉP CẶP CỦA AI`)**:
  * Hàng 1: `#TASK-01` + Badge `CPM CRITICAL` (`#BE123C`) | Dropdown chọn nhân sự `ĐN Đặng Hồng Nguyên` | Độ phù hợp `96.4%` (`Elo: 1,745 (Top 1)`, thanh bar `#4F46E5`) | Giải thích AI.
  * Hàng 2: `#TASK-02` (`BACKLOG`) | Dropdown `TL Tuấn Lê` kèm badge `ĐÃ SỬA TAY` | Độ phù hợp `88.2%` (`Gốc: 79.5% • Elo: 1,620`).
  * Hàng 3: `#TASK-03` (`SLACK: 16H`) | Dropdown `HN Hòa Nguyễn` | Độ phù hợp `91.8%` (`Elo: 1,690`).
* **Action Footer Bar**: Nút `"Chạy Lại Khớp Cặp AI"` + Nút chính `"Xác Nhận & Kích Hoạt Dự Án (Activate Plan) →"` (`#4F46E5`).

---

### Màn hình 5: Kích Hoạt Lộ Trình Học Tập & Làm Đồ Án Cá Nhân (`/ai-decompose/personal-roadmap`)
*(Dành cho chế độ Học tập / Cá nhân sau khi chạy xong Ma trận xử lý AI)*
* **Top App Bar**: Breadcrumbs `"Khởi Tạo & Phân Rã AI  >  Kích Hoạt Lộ Trình Học Tập Cá Nhân"`.
* **Hàng 3 Thẻ KPI Tổng Quan (`grid-cols-3 gap-4`)**:
  1. `TỔNG SỐ ĐẦU VIỆC`: `24 Tác Vụ` (`4 Giai đoạn WBS`).
  2. `NGÀY DỰ KIẾN VỀ ĐÍCH`: `18/12/2026` (`Roboto Mono Bold #4F46E5` • `Sớm hơn hạn nộp 7 ngày`).
  3. `THỜI GIAN TỰ HỌC TRUNG BÌNH`: `16.5h / Tuần` (`Khớp 100% mục tiêu cá nhân`).
* **Khối Lộ Trình Các Giai Đoạn Trọng Yếu (Milestone Roadmap)**:
  * 4 Thanh Giai Đoạn xếp dọc:
    * `GIAI ĐOẠN 1`: Bóc Tách & Thiết Kế Kiến Trúc Hệ Thống (`Tuần 1 - Tuần 2` • `6 Tác vụ • 32 Giờ` • `Đã Xếp Vào Giờ Rảnh`).
    * `GIAI ĐOẠN 2` (Highlight đường găng `#FFF1F2` bg, `1px solid #FFE4E6`): Hiện Thực Hóa Thuật Toán Lõi DAG + Badge `ĐƯỜNG GĂNG CPM` (`#BE123C`) (`Tuần 3 - Tuần 5` • `10 Tác vụ • 54 Giờ`).
    * `GIAI ĐOẠN 3`: Tích Hợp Giao Diện Mobile & Test Case (`Tuần 6` • `5 Tác vụ • 24 Giờ`).
    * `GIAI ĐOẠN 4`: Hoàn Thiện Báo Cáo & Slide Bảo Vệ (`Tuần 7` • `3 Tác vụ • 14 Giờ` • `Sẵn Sàng Nghiệm Thu`).
  * Thanh đồng bộ lịch cá nhân: Icon lịch `#4F46E5` `"Đồng bộ hóa 2 chiều với Google Calendar (nguyen.dang@university.edu.vn)"` + badge `"Tự động khóa khung giờ học cố định"`.
* **Action Footer Bar**: Icon check `#0D9488` `"Không cần phê duyệt từ bên thứ ba. Kế hoạch này là của riêng bạn và sẵn sàng thực thi."` | Nút chính `"Kích Hoạt Vào Lịch Biểu Của Tôi →"` (`#4F46E5`).