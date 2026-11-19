# EXECUTION, SCHEDULING & WBS SPECIFICATIONS (MODULES 2, 3 & 4)
**Dự án:** Smart Workspace — B2B SaaS & Academic Project Management Platform  
**Phạm vi:** 7 Màn hình vận hành lõi (Kanban FSM, Adaptive Calendar, Conflict Matrix, DAG Network, Gantt Chart, WBS Backlog, SRS Diff & CPM Impact)  
**Tài liệu tham chiếu gốc:** `markdown/UI_DESIGN_SYSTEM_AND_SPECS.md`

---

## 1. CÁC CHỈ THỊ SỬA LỖI MÀU SẮC, TEXT & BỐ CỤC TỪ MOCKUP (BẮT BUỘC SỬA KHI CODE)

Khi chuyển từ 7 ảnh thiết kế sang mã nguồn thực tế, AI Coding Agent **BẮT BUỘC** phải tự động khắc phục các lỗi hiển thị trên mockup sau đây:

1. **Xóa sạch nhãn Meta-Text & ký tự lỗi font**:
   - Trên màn hình **Lịch Biểu Thích Ứng** (`Adaptive Calendar`): Xóa bỏ chuỗi `[Bấm để xử lý (Frame 15B)]` và `(Frame 15B)` trong banner cảnh báo và thẻ xung đột màu đỏ[cite: 28, 29]; thay bằng nút hành động chuẩn *"Xử lý ngay →"* dẫn tới trang `/calendar/conflicts`.
   - Loại bỏ toàn bộ các ký tự hộp chữ nhật lỗi font (`[]`) xuất hiện cạnh icon cảnh báo hoặc bên trong nút bấm (như trong ảnh Kanban[cite: 25] và Lịch biểu[cite: 28]).
2. **Dọn dẹp vật thể đồ họa thừa trên Đồ thị DAG**:
   - Trên màn hình **Sơ Đồ Mạng Đồ Thị (DAG)**: Xóa bỏ hình oval màu xám lạc chỗ nằm đè phía trên node `#TASK-02`[cite: 32]. Đảm bảo đường nối cạnh phải của `#TASK-04` kết thúc gọn gàng trong khung canvas (không bị cắt cụt sát mép phải)[cite: 32].
3. **Chuẩn hóa bảng màu & Sửa lỗi lệch màu cục bộ**:
   - **Ma trận xung đột lịch** (`Conflict Matrix`): Trong Phương án C, đổi badge màu vàng cam `Rủi ro: Đệm an toàn giảm`[cite: 30] sang hệ màu quy chuẩn (`#FFF1F2` bg, `1px solid #FFE4E6`, chữ `#BE123C` cho mức rủi ro hoặc `#F1F5F9` bg, chữ `#475569` cho trạng thái trung tính) — cấm dùng màu vàng ngoài hệ thống.
   - **Bảng điều hành Kanban FSM**: Đổi tag `• CPM CRITICAL` trong thẻ `#TASK-01` về đúng quy chuẩn (`#FFF1F2` bg, `1px solid #FFE4E6`, chữ `#BE123C`, không dùng nền đỏ sẫm gây gắt mắt)[cite: 25].
   - **Lịch Biểu Thích Ứng**: Đồng nhất thẻ `SLACK BUFFER` và `NIGHT SHIFT` / `TASK AI TỰ ĐỘNG` về đúng 4 nhóm màu chú thích:
     - `BUSY_CLASS` (Lịch cố định): `#F1F5F9` bg, `1px solid #CBD5E1`, chữ `#334155`[cite: 28, 29].
     - `AI ALLOCATED` (Task AI phân bổ): `#EEF2FF` bg, `1px solid #C7D2FE`, chữ `#4F46E5`[cite: 28, 29].
     - `CONFLICT / CRITICAL` (Xung đột lịch): `#FFF1F2` bg, `1.5px dashed #BE123C`, chữ `#BE123C`[cite: 28, 29].
     - `SLACK BUFFER` (Khung rảnh dự phòng): `#F0FDFA` bg, `1px solid #99F6E4`, chữ `#0D9488`[cite: 28, 29].
4. **Sửa lỗi tràn khung (Overflow) & Cắt chữ (Truncation)**:
   - **Thanh lọc Backlog WBS**: Giữ dòng thống kê `3 Epics • 8 Stories • 24 Tasks • 68 SP` nằm gọn hoàn toàn bên trong khung trắng của thanh Filter Bar (không bị tràn lòi ra ngoài mép phải như ảnh mockup)[cite: 31].
   - **Biểu đồ Gantt**: Đảm bảo cột tên tác vụ bên trái hiển thị đầy đủ hoặc có `truncate` kèm `title` tooltip rõ ràng (tránh bị đè chữ giữa tên task và cột `24h (+4h)` như ở dòng `#TASK-01`)[cite: 26].
   - **SRS Diff**: Căn lề trái bình thường cho đoạn highlight thêm mới màu Indigo trong cột `FR-04 [SỬA ĐỔI]` (sửa lỗi bị thụt đầu dòng bất thường trên mockup)[cite: 27].
5. **Khóa Icon & Logo**:
   - Mọi icon bắt buộc gọi qua `AppIcons` (`src/components/icons/AppIcons.tsx`, `strokeWidth={1.5}`).
   - Mọi vị trí logo ở Sidebar đều dùng `<BrandLogoMark />` cấp phát động từ Cloudinary SDK (`useBrand()`).

---

## 2. ĐẶC TẢ CHI TIẾT 7 MÀN HÌNH VẬN HÀNH

### Màn hình 1: Bảng Công Việc (Kanban) & FSM Transition Workflow (`/kanban`)
- **Sidebar Active**: Mục 2 — `Bảng Công Việc (Kanban)` (`AppIcons.navKanban`, màu `#4F46E5`)[cite: 25].
- **Header & Thanh Thống Kê**:
  - Tiêu đề: *"Bảng Điều Hành FSM Workflow"* + badge `CPM Synced` (`#EEF2FF` bg, `#4F46E5`)[cite: 25].
  - Bộ lọc: Ô tìm kiếm tác vụ + các nút filter tương tác (`Tất cả (24)`, `Đường Găng CPM (5)`, `Của Tôi`) + nút chính `+ Thêm Công Việc` (`#4F46E5`)[cite: 25].
  - Hàng 4 thẻ chỉ số nhanh: `Tổng số công việc: 24 Tasks`, `Độ trôi găng (Slack = 0): 5 Critical`, `Tỷ lệ hoàn thành Sprint: 58.3%`, `Quy tắc FSM Guard: Kích hoạt nghiêm ngặt`[cite: 25].
- **Bảng Kanban 5 Cột (`BACKLOG`, `TODO`, `IN PROGRESS`, `REVIEW`, `DONE`)**:
  - Hỗ trợ kéo thả (Drag & Drop) hoặc click chuyển trạng thái giữa các cột[cite: 25].
  - Thẻ thuộc đường găng (`#TASK-01`) hiển thị viền `#4F46E5` hoặc `#BE123C`, badge `CPM CRITICAL`, thanh tiến độ WBS (`65%`)[cite: 25].
  - **Cơ chế FSM Transition Guard (Modal nổi góc phải dưới)**: Khi kéo thẻ sang cột `REVIEW` (ví dụ `#TASK-02`), bật hộp thoại kiểm tra 3 điều kiện tiên quyết (*Task tiền nhiệm hoàn thành*, *Branch Git pass CI*, *Không có Deadlock DAG*) kèm 2 nút `Hủy Bỏ` và `Chấp Nhận Chuyển → REVIEW` (`#4F46E5`)[cite: 25].

---

### Màn hình 2: Sơ Đồ Mạng Đồ Thị (DAG) & Đường Găng CPM (`/dag-gantt?view=dag`)
- **Sidebar Active**: Mục 4 — `Đồ Thị Mạng DAG & Gantt` (`AppIcons.navDagGantt`, màu `#4F46E5`)[cite: 32].
- **Thanh điều khiển trên cùng**:
  - Tiêu đề *"Sơ Đồ Mạng Đồ Thị (DAG) & Đường Găng CPM"*[cite: 32].
  - Cụm chuyển chế độ xem: `[ Sơ Đồ DAG (Active) | Biểu Đồ Gantt ]` + nút chính `Tính Lại Đường Găng` (`#4F46E5`)[cite: 32].
  - Thanh chú thích: Đường liền nét `#BE123C` (*Chuỗi Đường Găng `is_critical_path = true, Slack = 0h`*), đường đứt nét `#94A3B8` (*Nhánh Phụ Thuộc Thường `Slack > 0h`*), badge `184 Giờ • 6 Nút Trọng Yếu`[cite: 32].
- **Canvas Đồ Thị Tương Tác**:
  - Render các node tác vụ (`#TASK-00`, `#TASK-01`, `#TASK-02`, `#TASK-04`...) kết nối bằng đường cong Bezier có điểm neo tròn[cite: 32].
  - Node đường găng (`Slack = 0h`) có viền `1.5px solid #BE123C`, badge `CRITICAL` và ô `SLACK 0h` nền `#FFF1F2`[cite: 32].
  - Mỗi node hiển thị bảng 4 thông số `Roboto Mono`: `ES` (Early Start), `EF` (Early Finish), `LS` (Late Start), `LF` (Late Finish) và `SLACK`[cite: 32].
  - Góc trái dưới: Bộ điều khiển thu phóng (`- 100% +` và nút Fit-to-screen)[cite: 32]. Góc phải dưới: Khung `MINI-MAP` thu nhỏ hiển thị tổng quan đồ thị[cite: 32].

---

### Màn hình 3: Biểu Đồ Tiến Độ Gantt CPM (`/dag-gantt?view=gantt`)
- **Sidebar Active**: Mục 4 — `Đồ Thị Mạng DAG & Gantt` (`AppIcons.navDagGantt`, màu `#4F46E5`)[cite: 26].
- **Header & Chế độ xem**:
  - Cụm chuyển đổi `[ Sơ Đồ DAG | Biểu Đồ Gantt (Active) ]` + Dropdown `Thang đo: Theo Tuần` + nút `Tính Lại Đường Găng` (`#4F46E5`)[cite: 26].
  - Banner mô phỏng trực tiếp (khi kéo giãn thanh tác vụ): *"Đang mô phỏng: Kéo giãn #TASK-01 (+4h) → Đường găng dịch chuyển +4h"* (`#FFF1F2` bg, chữ `#BE123C`)[cite: 26].
- **Timeline Gantt Tương Tác (`T1` đến `T6`)**:
  - Trục thời gian đánh dấu đường dọc `Hôm nay` màu `#4F46E5`[cite: 26].
  - Thanh tác vụ đường găng (`#TASK-00`, `#TASK-01`, `#TASK-04`, `#TASK-09`) dùng màu `#BE123C`, hỗ trợ tay nắm kéo giãn thời lượng trực tiếp trên thanh `#TASK-01` kèm tooltip đen `Kéo giãn +4h`[cite: 26].
  - Thanh tác vụ thường (`#TASK-02`) dùng màu `#4F46E5` kèm phần đệm sọc chéo `Slack: 12h`[cite: 26].
  - Thanh tác vụ nối với nhau bằng đường mũi tên phụ thuộc vuông góc[cite: 26].
- **Thanh hành động & 3 Thẻ Chỉ Số Dưới Cùng**:
  - Dòng cảnh báo mốc hoàn thành dự kiến (`18/12/2026`) + 2 nút `Hoàn Tác Thay Đổi` và `Lưu & Cập Nhật Lịch Biểu` (`#4F46E5`)[cite: 26].
  - 3 thẻ KPI: `Độ Dài Đường Găng Hiện Tại (80 Giờ Công)`, `Chỉ Số Độ Trễ Rủi Ro SPI (0.96 / 1.00)`, `Khoảng Trôi Toàn Phần Total Float (12h Còn Lại)`[cite: 26].

---

### Màn hình 4: Lịch Biểu Dự Án & Thời Khóa Biểu Thích Ứng (`/calendar`)
- **Sidebar Active**: Mục 3 — `Lịch Biểu Thích Ứng` (`AppIcons.navCalendar`, màu `#4F46E5`)[cite: 28, 29].
- **Header & Bộ điều khiển tuần**:
  - Tiêu đề *"Lịch Biểu Dự Án & Thời Khóa Biểu Thích Ứng"*[cite: 28, 29].
  - Cụm chuyển `[ Tuần (Week) | Tháng (Month) ]` + Bộ chọn tuần `< 10/11 - 16/11/2026 (Tuần 11) >` + nút `Đồng bộ Google Calendar`[cite: 28, 29].
  - Banner cảnh báo xung đột bên phải chú thích: *"Phát hiện 1 Xung Đột Lịch: Thi Giữa Kỳ đè lên #TASK-01 — Xử lý ngay →"* (click mở màn hình Ma trận xung đột lịch)[cite: 28, 29].
- **Lưới Lịch Tuần (Thứ 2 → Chủ Nhật, khung giờ 08:00 – 21:00)**:
  - Cột `HÔM NAY` (Thứ 4 - 12/11) có header viền `#4F46E5`[cite: 28, 29].
  - Hiển thị các khối sự kiện theo đúng 4 nhóm màu đã chuẩn hóa: `BUSY_CLASS` (Kiến Trúc Phần Mềm), `AI ALLOCATED` (`#TASK-08`, `#TASK-11`), `SLACK BUFFER` (Thứ 7 08:30 - 11:00), và khối cảnh báo viền đứt `#BE123C` tại Thứ 4 (13:30 - 17:00) báo hiệu trùng `2.5h` giữa *Thi Giữa Kỳ* và `#TASK-01 CPM Critical`[cite: 28, 29].
- **Footer Summary Bar**:
  - Trái: *"Tổng thời gian đã lên lịch trong tuần: 28.5 Giờ (Giờ học: 12h • Task đồ án AI: 16.5h)"*[cite: 28, 29].
  - Phải: Badge `Mức tải tuần: 78% (Tối ưu, còn 7.5h rảnh dự phòng)` (`#F0FDFA` bg, chữ `#0D9488`)[cite: 28, 29].

---

### Màn hình 5: Ma Trận Giải Quyết Xung Đột Lịch Thông Minh (`/calendar/conflicts`)
- **Sidebar Active**: Mục 3 — `Lịch Biểu Thích Ứng` (`AppIcons.navCalendar`, màu `#4F46E5`)[cite: 30].
- **Thẻ Đối Chiếu Xung Đột (2 Cột)**:
  - Header thẻ: *"Phát Hiện Xung Đột Lịch & Đề Xuất Điều Chỉnh Tự Động"* + badge `1 XUNG ĐỘT TRỌNG YẾU` (`#FFF1F2` bg, `#BE123C`)[cite: 30].
  - **Cột trái (`SỰ KIỆN CỐ ĐỊNH - BUSY_CLASS`)**: *Thi Giữa Kỳ: Mạng Máy Tính & An Toàn Thông Tin* (`Thứ 4, 12/11/2026 • 13:30 - 16:30 (3 giờ)`) — Đồng bộ từ Google Calendar[cite: 30].
  - **Cột phải (`CPM CRITICAL TASK`)**: `#TASK-01: Hiện thực hóa thuật toán tính toán đường găng DAG CPM` (`14:00 - 18:00 (Trùng 2.5 giờ)` màu `#BE123C`) kèm khung cảnh báo trễ chuỗi đường găng `1.5 ngày`[cite: 30].
- **3 Phương Án Khắc Phục Tối Ưu (Radio Cards Tương Tác)**:
  - Cho phép người dùng click chọn 1 trong 3 kịch bản:
    1. **Phương Án A (Mặc định chọn - viền `#4F46E5`)**: *Dời Sang Khung Rảnh Cuối Tuần* — Badge `KHUYẾN NGHỊ (AI SCORE: 98%)`, tags `Tác động hạn chót: 0 ngày`, `Tải cá nhân: +2.5h cuối tuần`[cite: 30].
    2. **Phương Án B**: *Tái Phân Bổ Task Cho Kỹ Sư Tương Đương Elo* — Badge `ĐỘ PHÙ HỢP: 89%`, chuyển cho Tuấn Lê (`Elo: 1,680`)[cite: 30].
    3. **Phương Án C**: *Kích Hoạt Độ Trôi (Slack Time Buffer)* — Badge `TIÊU THỤ: 60% SLACK`, tags `Slack còn lại: 1.5h`, `Đệm an toàn giảm`[cite: 30].
- **Footer Hành Động**: Nút `Bỏ Qua / Tự Xử Lý Sau` và nút chính `Áp Dụng Phương Án Đã Chọn →` (`#4F46E5`)[cite: 30].

---

### Màn hình 6: Quản Lý Backlog & Phân Cấp WBS (`/backlog`)
- **Sidebar Active**: Mục 5 — `Backlog & Yêu Cầu SRS` (`AppIcons.navBacklogSrs`, màu `#4F46E5`)[cite: 31].
- **Header & Thanh Công Cụ Lọc**:
  - Tiêu đề *"Danh Sách Backlog & Phân Cấp User Story"* + 2 nút `Đồng Bộ Từ SRS` và `+ Tạo Hạng Mục Mới` (`#4F46E5`)[cite: 31].
  - Thanh Filter Bar: Ô tìm kiếm + 3 dropdown (`Phụ trách: Tất cả`, `Trạng thái: Đang mở (18)`, `Story Points: Tất cả (1 - 13 SP)`) + dòng thống kê `3 Epics • 8 Stories • 24 Tasks • 68 SP` căn gọn bên phải trong khung[cite: 31].
- **Bảng Cây Phân Cấp WBS 4 Cột (`CẤU TRÚC PHÂN CẤP`, `TRẠNG THÁI (FSM)`, `PHỤ TRÁCH`, `ĐỘ PHỨC TẠP (SP / GIỜ)`)**:
  - Hỗ trợ đóng/mở (Expand/Collapse) cây 3 cấp: **Epic** (`EPIC-01`, `EPIC-02`) → **User Story** (`#US-04`, `#US-05`) → **Sub-task** (`#TASK-01` có badge `CPM CRITICAL` màu `#BE123C`, `#TASK-04` trạng thái `DONE`)[cite: 31].
  - Footer bảng phân trang: *"Hiển thị 6 / 35 hạng mục trong cây phân cấp WBS"* và điều hướng `Trang 1 / 4`[cite: 31].

---

### Màn hình 7: Đánh Giá Tác Động Thay Đổi Yêu Cầu (SRS Diff & CPM Impact) (`/backlog/srs-diff`)
- **Sidebar Active**: Mục 5 — `Backlog & Yêu Cầu SRS` (`AppIcons.navBacklogSrs`, màu `#4F46E5`)[cite: 27].
- **Header & Thẻ Phiên Bản**:
  - Hiển thị luồng so sánh: `Baseline: SRS_Specs_v1.0.pdf` → `Bản Cập Nhật: SRS_Specs_v2.0.pdf` (`#EEF2FF` bg, `#4F46E5`)[cite: 27].
- **Khối Báo Cáo Đánh Giá Tác Động Từ AI Synthesizer (3 Cột KPI)**:
  - Cột 1: `BIẾN ĐỘNG KHỐI LƯỢNG WBS` — `+3 Task Mới` (`Tổng +32 Giờ công`)[cite: 27].
  - Cột 2 (Viền `#FFE4E6`, nền `#FFF1F2`/30): `ĐỘ DÀI ĐƯỜNG GĂNG CPM` — `+4 Ngày (184h → 216h)` màu `#BE123C`[cite: 27].
  - Cột 3 (Viền `#FFE4E6`, nền `#FFF1F2`/30): `DỰ BÁO NGUY CƠ BÀN GIAO` — `Trễ Hạn 4 Ngày (22/12/2026)` màu `#BE123C`[cite: 27].
- **Bảng So Sánh Diff 2 Cột (`PHIÊN BẢN GỐC — SRS V1.0` vs `PHIÊN BẢN MỚI — SRS V2.0`)**:
  - **Dòng `FR-04 [SỬA ĐỔI]`**: Highlight phần nội dung bổ sung (*2FA TOTP và đồng bộ OAuth2 Google Workspace*) bằng nền `#EEF2FF`, chữ `#4F46E5` căn lề trái chuẩn[cite: 27].
  - **Dòng `FR-15 [THÊM MỚI • CPM CRITICAL]`**: Đánh dấu đường găng mới (`+16h • #TASK-16`), ghi chú `• Tác vụ trọng yếu nằm trên Đường Găng (Slack = 0)` màu `#BE123C`[cite: 27].
  - **Dòng `FR-16 [THÊM MỚI]`**: Tag `SLACK: 8H` (`#F0FDFA` bg, chữ `#0D9488`), `+4h • #TASK-17`[cite: 27].
- **Footer Phê Duyệt**: Nút `Từ Chối Bản v2.0` và nút chính `Phê duyệt thay đổi & Tự động cập nhật lại đồ thị DAG` (`#4F46E5`)[cite: 27].