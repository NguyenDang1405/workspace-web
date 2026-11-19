import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const PrVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { prId = 'PR-42' } = useParams<{ prId?: string }>();

  const handleApproveAndDone = () => {
    navigate('/kanban');
  };

  return (
    <div className="space-y-6 max-w-[1520px] mx-auto pb-12">
      {/* Header Pull Request */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#F1F5F9] border border-[#E2E8F0] text-[#334155]">
              GITHUB WEBHOOK • #{prId}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C]">
              CPM CRITICAL • #TASK-01
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#F0FDF4] border border-[#CCFBF1] text-[#0D9488]">
              <AppIcons.verifiedCheck size={11} />
              CI Passing
            </span>
          </div>

          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            feat(cpm): tối ưu thuật toán Kahn Topological Sort và xác thực RBAC
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#64748B]">
            <span className="text-[#4F46E5] font-semibold">feature/dag-cpm-engine</span>
            <span>&rarr;</span>
            <span className="font-semibold text-[#0F172A]">main</span>
            <span>•</span>
            <span>
              Commit <strong className="text-[#4F46E5]">8f4c21a</strong> bởi{' '}
              <strong className="text-[#0F172A]">Đặng Hồng Nguyên</strong> (14 phút trước)
            </span>
          </div>
        </div>

        {/* Nút Hành Động */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/kanban')}
            className="h-9 text-xs border-[#E2E8F0] text-[#64748B] hover:bg-slate-50 gap-1.5"
          >
            <AppIcons.refresh size={13} />
            <span>Yêu Cầu Sửa Lại</span>
          </Button>

          <Button
            size="sm"
            onClick={handleApproveAndDone}
            className="h-9 px-4 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs transition-colors"
          >
            <AppIcons.verifiedCheck size={14} />
            <span>Phê Duyệt PR &amp; Chuyển DONE</span>
          </Button>
        </div>
      </div>

      {/* Grid 2 Cột: 8 : 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* CỘT TRÁI (8 Cột) — Trình Xem Git Code Diff (H-AUTO KHÔNG KHOẢNG TRỐNG THỪA) */}
        <div className="lg:col-span-8 rounded-lg border border-[#E2E8F0] bg-white shadow-xs overflow-hidden">
          {/* Header File Info */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] py-2.5 px-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <AppIcons.codeDiff size={15} className="text-[#4F46E5]" />
              <span className="font-bold text-[#0F172A]">app/services/cpm_scheduler.py</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-200 text-[#475569]">
                modified
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span className="font-bold text-[#0D9488]">+18 dòng</span>
              <span className="font-bold text-[#BE123C]">-6 dòng</span>
              <span className="text-slate-400">|</span>
              <span className="text-[#64748B]">Python 3.11</span>
            </div>
          </div>

          {/* Diff Legend Subbar */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-slate-50/70 py-1.5 px-4 text-[11px] font-mono text-[#64748B]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#0D9488]" />
                <span>Thêm mới / Cập nhật RBAC</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#BE123C]" />
                <span>Xóa / Loại trừ lỗ hổng SQL</span>
              </div>
            </div>
            <span className="text-slate-400">Khối @ -41,13 +41,13 @</span>
          </div>

          {/* Khung Hiển Thị Mã Code Diff (ĐÃ BỎ KHOẢNG TRỐNG THỪA THEO CHỈ THỊ) */}
          <div className="font-mono text-xs leading-relaxed overflow-x-auto divide-y divide-slate-100 bg-[#FAFAFA]">
            {/* Dòng 41 */}
            <div className="grid grid-cols-12 py-1 px-3 hover:bg-slate-100/60">
              <span className="col-span-1 text-slate-400 select-none text-right pr-3">41</span>
              <span className="col-span-11 pl-2 text-slate-700">
                def compute_critical_path(workspace_id: UUID, tasks: list[TaskNode]):
              </span>
            </div>

            {/* Dòng 42 (Xóa) */}
            <div className="grid grid-cols-12 py-1 px-3 bg-[#FFF1F2] text-[#BE123C]">
              <span className="col-span-1 text-rose-400 select-none text-right pr-3">42</span>
              <span className="col-span-11 pl-2 flex items-center gap-2">
                <strong className="select-none">-</strong>
                <span className="line-through">_graph = build_adjacency_list(tasks)</span>
              </span>
            </div>

            {/* Dòng 43 (Xóa) */}
            <div className="grid grid-cols-12 py-1 px-3 bg-[#FFF1F2] text-[#BE123C]">
              <span className="col-span-1 text-rose-400 select-none text-right pr-3">43</span>
              <span className="col-span-11 pl-2 flex items-center gap-2">
                <strong className="select-none">-</strong>
                <span className="line-through">return topological_pass(graph)</span>
              </span>
            </div>

            {/* Dòng 44 (Thêm RBAC) */}
            <div className="grid grid-cols-12 py-1 px-3 bg-[#F0FDF4] text-[#0D9488]">
              <span className="col-span-1 text-emerald-400 select-none text-right pr-3">44</span>
              <span className="col-span-11 pl-2 flex items-center gap-2 font-medium">
                <strong className="select-none">+</strong>
                <span>if not verify_workspace_ownership(workspace_id):</span>
              </span>
            </div>

            {/* Dòng 45 (Thêm RBAC) */}
            <div className="grid grid-cols-12 py-1 px-3 bg-[#F0FDF4] text-[#0D9488]">
              <span className="col-span-1 text-emerald-400 select-none text-right pr-3">45</span>
              <span className="col-span-11 pl-2 flex items-center gap-2 font-medium">
                <strong className="select-none">+</strong>
                <span>    raise PermissionError(&quot;RBAC: Truy cập trái phép workspace&quot;)</span>
              </span>
            </div>

            {/* Dòng 46 (Thêm) */}
            <div className="grid grid-cols-12 py-1 px-3 bg-[#F0FDF4] text-[#0D9488]">
              <span className="col-span-1 text-emerald-400 select-none text-right pr-3">46</span>
              <span className="col-span-11 pl-2 flex items-center gap-2 font-medium">
                <strong className="select-none">+</strong>
                <span>    graph = build_adjacency_list(tasks, detect_cycles=True)</span>
              </span>
            </div>

            {/* Dòng 47 (Thêm Forward Backward Pass) */}
            <div className="grid grid-cols-12 py-1 px-3 bg-[#F0FDF4] text-[#0D9488]">
              <span className="col-span-1 text-emerald-400 select-none text-right pr-3">47</span>
              <span className="col-span-11 pl-2 flex items-center gap-2 font-medium">
                <strong className="select-none">+</strong>
                <span>    es, ef, ls, lf = run_forward_backward_pass(graph)</span>
              </span>
            </div>

            {/* Dòng 48 (Thêm Critical Path Slack == 0) */}
            <div className="grid grid-cols-12 py-1 px-3 bg-[#F0FDF4] text-[#0D9488]">
              <span className="col-span-1 text-emerald-400 select-none text-right pr-3">48</span>
              <span className="col-span-11 pl-2 flex items-center gap-2 font-bold">
                <strong className="select-none">+</strong>
                <span>    return [t for t in tasks if (ls[t.id] - es[t.id]) == 0]</span>
              </span>
            </div>

            {/* Dòng 49, 50 (Context) */}
            <div className="grid grid-cols-12 py-1 px-3 hover:bg-slate-100/60">
              <span className="col-span-1 text-slate-400 select-none text-right pr-3">49</span>
              <span className="col-span-11 pl-2 text-slate-400">...</span>
            </div>
            <div className="grid grid-cols-12 py-1 px-3 hover:bg-slate-100/60">
              <span className="col-span-1 text-slate-400 select-none text-right pr-3">50</span>
              <span className="col-span-11 pl-2 text-slate-700">
                async def sync_dag_to_client(session_id: str, payload: dict):
              </span>
            </div>

            {/* Dòng 51 (Xóa SQL Injection) */}
            <div className="grid grid-cols-12 py-1 px-3 bg-[#FFF1F2] text-[#BE123C]">
              <span className="col-span-1 text-rose-400 select-none text-right pr-3">51</span>
              <span className="col-span-11 pl-2 flex items-center gap-2">
                <strong className="select-none">-</strong>
                <span className="line-through">query = f&quot;SELECT * FROM nodes WHERE session = &apos;&#123;session_id&#125;&apos;&quot;</span>
              </span>
            </div>

            {/* Dòng 52 (Vá SQL Parameterized) */}
            <div className="grid grid-cols-12 py-1 px-3 bg-[#F0FDF4] text-[#0D9488]">
              <span className="col-span-1 text-emerald-400 select-none text-right pr-3">52</span>
              <span className="col-span-11 pl-2 flex items-center gap-2 font-medium">
                <strong className="select-none">+</strong>
                <span>query = text(&quot;SELECT * FROM nodes WHERE session = :sid&quot;)</span>
              </span>
            </div>

            {/* Dòng 53 (Vá SQL Parameterized) */}
            <div className="grid grid-cols-12 py-1 px-3 bg-[#F0FDF4] text-[#0D9488]">
              <span className="col-span-1 text-emerald-400 select-none text-right pr-3">53</span>
              <span className="col-span-11 pl-2 flex items-center gap-2 font-medium">
                <strong className="select-none">+</strong>
                <span>return await db.execute(query, &#123;&quot;sid&quot;: session_id&#125;)</span>
              </span>
            </div>
          </div>

          {/* Chân Khung Code Diff */}
          <div className="border-t border-[#E2E8F0] p-3 bg-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#0D9488] font-medium">
              <AppIcons.verifiedCheck size={14} />
              <span>Không có xung đột mã nguồn (Mergeable clean)</span>
            </div>
            <button
              type="button"
              className="text-[#4F46E5] font-mono hover:underline text-[11px]"
            >
              Xem trọn vẹn tệp (84 dòng) &rarr;
            </button>
          </div>
        </div>

        {/* CỘT PHẢI (4 Cột) — Thẩm Định Chất Lượng AI */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Thẩm Định Chất Lượng AI */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-md bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
                  <AppIcons.navAiDecompose size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#0F172A]">Thẩm Định Chất Lượng AI</h3>
                  <p className="text-[10px] text-[#64748B]">Quy trình thẩm định tự động</p>
                </div>
              </div>

              {/* Badge ĐẠT CHUẨN MERGE - ĐÃ SỬA THEO CHỈ THỊ (rounded-md, 1 dòng) */}
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] whitespace-nowrap">
                ĐẠT CHUẨN MERGE
              </span>
            </div>

            {/* Điểm Chất Lượng Mã Nguồn */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#0F172A]">Điểm Chất Lượng Mã Nguồn</span>
                <span className="font-mono text-2xl font-bold text-[#4F46E5]">92 / 100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#4F46E5] rounded-full w-[92%]" />
              </div>
            </div>

            {/* 2 Ô Chỉ Số */}
            <div className="grid grid-cols-2 gap-2 text-center font-mono">
              <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-2">
                <div className="text-[10px] text-[#64748B] uppercase">ĐỘ PHỨC TẠP</div>
                <div className="text-xs font-bold text-[#0F172A] mt-0.5">O(V + E)</div>
              </div>
              <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-2">
                <div className="text-[10px] text-[#64748B] uppercase">TEST COVERAGE</div>
                <div className="text-xs font-bold text-[#0D9488] mt-0.5">94.5% &uarr;</div>
              </div>
            </div>

            {/* Phân Tích Bảo Mật SAST */}
            <div className="border-t border-[#E2E8F0] pt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <AppIcons.adminRbac size={13} className="text-[#0D9488]" />
                  Phân Tích Bảo Mật (SAST)
                </span>
                <span className="font-mono text-[11px] font-bold text-[#0D9488]">2/2 Passed</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="rounded-md border border-[#CCFBF1] bg-[#F0FDF4]/80 p-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[#0D9488] font-bold text-[11px]">
                    <span>• ĐÃ KHẮC PHỤC • SQL INJECTION</span>
                    <AppIcons.check size={13} />
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Dòng 52 đã chuyển sang <strong className="text-[#0F172A]">Parameterized Query (:sid)</strong>, loại bỏ hoàn toàn nguy cơ chèn mã SQL vào bảng nodes.
                  </p>
                </div>

                <div className="rounded-md border border-[#CCFBF1] bg-[#F0FDF4]/80 p-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[#0D9488] font-bold text-[11px]">
                    <span>• RBAC OWNERSHIP PASS</span>
                    <AppIcons.check size={13} />
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Đã kiểm tra quyền sở hữu workspace_id trước khi phân tích đường găng CPM.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Khuyến Nghị Tối Ưu Nhỏ (ĐÃ CHUẨN HÓA MÀU TRUNG TÍNH) */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
              <AppIcons.sliders size={14} className="text-[#4F46E5]" />
              <span>Khuyến Nghị Tối Ưu Nhỏ</span>
            </div>

            <div className="space-y-2 text-xs text-[#334155]">
              <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-2.5 flex items-start gap-2">
                <span className="text-[#4F46E5] font-bold mt-0.5">•</span>
                <p className="leading-relaxed text-[11px]">
                  Bổ sung type hint trả về <code className="text-[#4F46E5] bg-white px-1 py-0.2 rounded border">list[TaskNode]</code> cho hàm compute_critical_path ở dòng 41.
                </p>
              </div>

              <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-2.5 flex items-start gap-2">
                <span className="text-[#4F46E5] font-bold mt-0.5">•</span>
                <p className="leading-relaxed text-[11px]">
                  Cân nhắc cache kết quả run_forward_backward_pass trong Redis (TTL 30s) cho đồ thị &gt; 200 node.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1 text-[#64748B]">
              <span>AI Bot v2.4 sẵn sàng auto-merge</span>
              <button type="button" className="text-[#4F46E5] hover:underline">
                Báo cáo chi tiết &rarr;
              </button>
            </div>
          </div>

          {/* Card 3: Task Liên Quan (ĐÃ CHUẨN HÓA MÀU TRUNG TÍNH) */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-[#4F46E5] flex items-center justify-center">
                <AppIcons.navKanban size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Task Liên Quan</h4>
                <p className="text-[11px] text-[#64748B]">TASK-01: Thuật toán Kahn &amp; Phân quyền</p>
              </div>
            </div>

            <span className="px-2 py-1 rounded text-[10px] font-mono font-bold bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5]">
              IN REVIEW
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrVerificationPage;
