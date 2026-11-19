import React, { useState } from 'react';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const DailyStandupPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'standup' | 'studyDigest'>('standup');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [rescheduledTasks, setRescheduledTasks] = useState<Record<string, boolean>>({});
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setSyncStatus('Đã cập nhật dữ liệu biên tập mới nhất từ GitHub & FSM engine!');
      setTimeout(() => setSyncStatus(null), 4000);
    }, 800);
  };

  const handleApproveReschedule = (taskId: string) => {
    setRescheduledTasks((prev) => ({ ...prev, [taskId]: true }));
    setSyncStatus(`Đã phê duyệt dời lịch ${taskId} sang sáng Thứ 7! Tự động cập nhật CPM Gantt & FSM Guard.`);
    setTimeout(() => setSyncStatus(null), 5000);
  };

  const handleSyncAndSend = () => {
    setSyncStatus('Đang đồng bộ báo cáo Daily Standup lên Jira, GitHub & thông báo Slack kênh #alpha-team...');
    setTimeout(() => {
      setSyncStatus('Đã gửi báo cáo Daily Standup thành công! (ID: #REP-20261112-0830)');
      setTimeout(() => setSyncStatus(null), 4000);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#F8FAFC] p-6 text-[#0F172A] space-y-5">
      {/* Thông báo Sync nếu có */}
      {syncStatus && (
        <div className="flex items-center justify-between rounded-lg border border-teal-200 bg-teal-50 px-4 py-2.5 text-xs text-teal-800 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <AppIcons.verifiedCheck size={16} className="text-[#0D9488]" />
            <span className="font-medium">{syncStatus}</span>
          </div>
          <button
            onClick={() => setSyncStatus(null)}
            className="text-teal-600 hover:text-teal-900 transition-colors"
          >
            <AppIcons.close size={14} />
          </button>
        </div>
      )}

      {/* Header & Chuyển Đổi Chế Độ Xem */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
              Bản Tin Scrum Hàng Ngày & Tổng Kết Học Tập
            </h1>
            <span className="inline-flex items-center rounded-md border border-indigo-200 bg-[#EEF2FF] px-2 py-0.5 text-[11px] font-semibold text-[#4F46E5] uppercase tracking-wide whitespace-nowrap">
              V2.4 AUTO-GEN
            </span>
          </div>
          <p className="mt-1 text-xs text-[#64748B]">
            AI tự động tổng hợp nhật ký trạng thái FSM, biến động PR GitHub và lịch trình học tập cá nhân.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Segmented Switcher */}
          <div className="flex items-center rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] p-1 text-xs">
            <button
              onClick={() => setActiveTab('standup')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
                activeTab === 'standup'
                  ? 'bg-white text-[#4F46E5] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <AppIcons.users size={14} />
              <span>Daily Standup Nhóm</span>
            </button>
            <button
              onClick={() => setActiveTab('studyDigest')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
                activeTab === 'studyDigest'
                  ? 'bg-white text-[#4F46E5] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <AppIcons.calendar size={14} />
              <span>Tổng Kết Học Tập Tuần</span>
            </button>
          </div>

          {/* Action Nút Gửi Báo Cáo */}
          <Button
            onClick={handleSyncAndSend}
            className="gap-2 rounded-md bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#4338CA] transition-colors"
          >
            <AppIcons.send size={14} />
            <span>Đồng Bộ & Gửi Báo Cáo</span>
          </Button>
        </div>
      </div>

      {/* Thanh Metadata & Biên Tập Lại */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#EEF2FF] text-[#4F46E5] shrink-0">
            <AppIcons.navAiDecompose size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#0F172A]">
                Bản biên tập tự động lúc 08:30
              </span>
              <span className="text-xs text-[#64748B]">•</span>
              <span className="text-xs text-[#64748B]">Thứ 5, 12/11/2026 (Tuần 11)</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 font-mono text-[11px] text-[#64748B]">
              <AppIcons.fileVerified size={12} className="text-[#0D9488]" />
              <span>Nguồn: 14 FSM Logs • 3 Git Commits • 2 Calendar Events</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="h-8 gap-1.5 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-xs font-medium text-[#0F172A] hover:bg-slate-100"
          >
            <AppIcons.refresh
              size={13}
              className={`text-[#64748B] ${isRegenerating ? 'animate-spin text-[#4F46E5]' : ''}`}
            />
            <span>{isRegenerating ? 'Đang biên tập...' : 'Biên Tập Lại (Regenerate)'}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A]"
            title="Tùy chỉnh luồng tổng hợp"
          >
            <AppIcons.sliders size={14} />
          </Button>
        </div>
      </div>

      {activeTab === 'standup' ? (
        <>
          {/* Lưới 3 Cột Scrum Daily Standup */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Cột 1: ĐÃ HOÀN THÀNH HÔM QUA */}
            <div className="flex flex-col gap-3 rounded-lg border border-[#E2E8F0] bg-[#F1F5F9]/50 p-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-[#0D9488]">
                    <AppIcons.verifiedCheck size={14} />
                  </div>
                  <h2 className="text-xs font-bold uppercase tracking-wide text-[#0F172A]">
                    Đã Hoàn Thành Hôm Qua
                  </h2>
                </div>
                <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-[#475569]">
                  3 MỤC
                </span>
              </div>

              {/* Task 1 */}
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs space-y-2 hover:border-teal-300 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[#475569] font-medium">
                    <span className="font-semibold text-[#0F172A]">#TASK-00</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold">
                        ĐN
                      </span>
                      Đặng Hồng Nguyên
                    </span>
                  </div>
                  <AppIcons.verifiedCheck size={16} className="text-[#0D9488]" />
                </div>
                <p className="text-xs font-medium text-[#0F172A] leading-relaxed">
                  Hoàn tất bóc tách 14 yêu cầu chức năng SRS và khóa cấu trúc đồ thị phụ thuộc WBS.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 font-mono text-[11px] text-[#64748B]">
                  <span>FSM: BACKLOG → DONE</span>
                  <span className="font-semibold text-[#0D9488]">100%</span>
                </div>
              </div>

              {/* Task 2 */}
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs space-y-2 hover:border-indigo-300 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-semibold text-[#4F46E5]">#PR-42 MERGED</span>
                    <span className="text-[#64748B]">•</span>
                    <span className="text-[11px] text-[#475569]">Đặng Hồng Nguyên</span>
                  </div>
                  <span className="rounded-md border border-teal-200 bg-teal-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#0D9488]">
                    CI PASS
                  </span>
                </div>
                <p className="text-xs font-medium text-[#0F172A] leading-relaxed">
                  Hợp nhất nhánh <code className="rounded bg-slate-100 px-1 py-0.5 text-[#4F46E5] font-mono text-[11px]">feature/dag-cpm-engine</code> (Điểm chất lượng AI: 92/100, vượt qua kiểm thử SAST).
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 font-mono text-[11px] text-[#64748B]">
                  <span className="text-[#0D9488] font-medium">+482 / -65 dòng</span>
                  <span>SAST 2/2 Passed</span>
                </div>
              </div>

              {/* Task 3 */}
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs space-y-2 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[#475569] font-medium">
                    <span className="font-semibold text-[#0F172A]">#TASK-06</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold">
                        TL
                      </span>
                      Tuấn Lê
                    </span>
                  </div>
                  <AppIcons.verifiedCheck size={16} className="text-[#0D9488]" />
                </div>
                <p className="text-xs font-medium text-[#0F172A] leading-relaxed">
                  Nộp bản thảo Chương 3 báo cáo kiến trúc hệ thống và hoàn tất đánh giá chéo nhóm.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 font-mono text-[11px] text-[#64748B]">
                  <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.2 text-[10px] font-semibold text-[#334155]">
                    Doc v1.2
                  </span>
                  <span>Phê duyệt bởi Mentor</span>
                </div>
              </div>

              {/* Footer Cột: Tiến độ Sprint */}
              <div className="mt-auto rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-xs">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#64748B]">Tiến độ Sprint hiện tại:</span>
                  <span className="font-bold text-[#0F172A]">78%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#0F172A] transition-all" style={{ width: '78%' }} />
                </div>
              </div>
            </div>

            {/* Cột 2: KẾ HOẠCH THỰC HIỆN HÔM NAY */}
            <div className="flex flex-col gap-3 rounded-lg border border-[#E2E8F0] bg-[#F1F5F9]/50 p-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[#4F46E5]">
                    <AppIcons.calendar size={14} />
                  </div>
                  <h2 className="text-xs font-bold uppercase tracking-wide text-[#0F172A]">
                    Kế Hoạch Thực Hiện Hôm Nay
                  </h2>
                </div>
                <span className="rounded-md border border-indigo-200 bg-[#EEF2FF] px-2 py-0.5 text-[11px] font-semibold text-[#4F46E5]">
                  3 MỤC
                </span>
              </div>

              {/* Task Hôm nay 1 - CPM Critical */}
              <div className="rounded-lg border-l-4 border-l-[#BE123C] border border-[#E2E8F0] bg-white p-3.5 shadow-xs space-y-2 hover:border-[#BE123C] transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#BE123C]">#TASK-01</span>
                    <span className="rounded-md border border-rose-200 bg-rose-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#BE123C]">
                      CPM CRITICAL
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#475569]">4.0h</span>
                </div>
                <p className="text-xs font-medium text-[#0F172A] leading-relaxed">
                  Hoàn thiện xuất JSON đường găng sang React Flow và kiểm thử biên đồ thị đa nhánh.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-[#64748B]">
                  <span>Phụ trách: <strong className="text-[#0F172A]">Đặng Hồng Nguyên (ĐN)</strong></span>
                  <span className="text-[#BE123C] font-bold">!</span>
                </div>
              </div>

              {/* Task Hôm nay 2 */}
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs space-y-2 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[#475569] font-medium">
                    <span className="font-semibold text-[#0F172A]">#TASK-04</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold">
                        HN
                      </span>
                      Hòa Nguyễn
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#475569]">5.0h</span>
                </div>
                <p className="text-xs font-medium text-[#0F172A] leading-relaxed">
                  Cấu hình container suy luận cục bộ vLLM và đo độ trễ phản hồi API bóc tách văn bản.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 font-mono text-[11px] text-[#64748B]">
                  <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.2 text-[10px] font-semibold text-[#334155]">
                    AI INFRA
                  </span>
                  <span>Mục tiêu: p95 &lt; 850ms</span>
                </div>
              </div>

              {/* Task Hôm nay 3 */}
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs space-y-2 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[#475569] font-medium">
                    <span className="font-semibold text-[#0F172A]">#TASK-02</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold">
                        TL
                      </span>
                      Tuấn Lê
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#475569]">3.0h</span>
                </div>
                <p className="text-xs font-medium text-[#0F172A] leading-relaxed">
                  Kết nối API đồng bộ khung giờ rảnh sinh viên lên giao diện Mobile Onboarding.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 font-mono text-[11px] text-[#64748B]">
                  <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.2 text-[10px] font-semibold text-[#334155]">
                    CLIENT API
                  </span>
                  <span>Flutter v3.19</span>
                </div>
              </div>

              {/* Footer Cột: Tổng tải */}
              <div className="mt-auto rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Tổng tải phân bổ hôm nay:</span>
                  <span className="font-mono font-bold text-[#4F46E5]">12.0h / 14.5h khả dụng</span>
                </div>
              </div>
            </div>

            {/* Cột 3: ĐIỂM NGHẼN & RỦI RO (BLOCKERS) */}
            <div className="flex flex-col gap-3 rounded-lg border border-[#E2E8F0] bg-[#F1F5F9]/50 p-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-[#BE123C]">
                    <AppIcons.criticalAlert size={14} />
                  </div>
                  <h2 className="text-xs font-bold uppercase tracking-wide text-[#0F172A]">
                    Điểm Nghẽn & Rủi Ro (Blockers)
                  </h2>
                </div>
                <span className="rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-[#BE123C]">
                  2 CẢNH BÁO
                </span>
              </div>

              {/* Blocker 1: Xung đột lịch thi */}
              <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-3.5 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#BE123C] font-semibold">
                    <AppIcons.clock size={14} />
                    <span>XUNG ĐỘT LỊCH THI • #TASK-01</span>
                  </div>
                  <span className="rounded-md bg-[#BE123C] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                    {rescheduledTasks['#TASK-01'] ? 'ĐÃ DỜI' : 'XUNG ĐỘT'}
                  </span>
                </div>
                <p className="text-xs text-[#0F172A] leading-relaxed">
                  Ca thi Giữa kỳ Mạng Máy Tính (13:30 - 16:30 hôm nay) trùng <strong>2.5h</strong> với tác vụ đường găng <strong>#TASK-01</strong>. AI đề xuất dời sang sáng Thứ 7.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    size="sm"
                    disabled={rescheduledTasks['#TASK-01']}
                    onClick={() => handleApproveReschedule('#TASK-01')}
                    className={`h-7 px-3 text-xs font-medium text-white shadow-xs transition-colors rounded-md ${
                      rescheduledTasks['#TASK-01']
                        ? 'bg-slate-400 cursor-not-allowed'
                        : 'bg-[#BE123C] hover:bg-[#9F1239]'
                    }`}
                  >
                    {rescheduledTasks['#TASK-01'] ? '✓ Đã chấp thuận dời' : 'Chấp thuận dời lịch'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-3 text-xs font-medium text-[#475569] bg-white border border-[#E2E8F0] hover:bg-slate-50 rounded-md"
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>

              {/* Blocker 2: Biến động SRS v2.0 */}
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#0F172A] font-semibold">
                    <AppIcons.workflow size={14} className="text-[#4F46E5]" />
                    <span>BIẾN ĐỘNG SRS V2.0 • FR-15</span>
                  </div>
                  <span className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#475569]">
                    PENDING
                  </span>
                </div>
                <p className="text-xs text-[#0F172A] leading-relaxed">
                  Yêu cầu bổ sung Webhook Telegram đang chờ phê duyệt thay đổi trên cây WBS (+16h công dự kiến).
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 font-mono text-[11px]">
                  <span className="text-[#64748B]">Tác động: Trễ Sprint 1.5 ngày</span>
                  <span className="font-semibold text-[#4F46E5]">+16h Dev</span>
                </div>
              </div>

              {/* Khuyến nghị Agent (Theo Mục 1.4: đổi nền sang trung tính chuẩn #FAFAFA / #F8FAFC, viền 1px #E2E8F0) */}
              <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 shadow-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                  <AppIcons.bot size={15} className="text-[#0D9488]" />
                  <span>Khuyến nghị Agent:</span>
                </div>
                <p className="text-[11px] text-[#475569] leading-relaxed">
                  Đã kích hoạt cơ chế đệm an toàn CPM (Buffer 4.5h). Nếu giải quyết #TASK-01 trước 18:00 Thứ Sáu, toàn bộ cột mốc Alpha Release vẫn đảm bảo đúng hạn.
                </p>
              </div>

              {/* Footer Cột: Độ tin cậy */}
              <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                <span className="text-[#64748B]">Độ tin cậy dự báo: <strong className="text-[#0F172A]">96.4%</strong></span>
                <button
                  onClick={() => handleApproveReschedule('#TASK-01')}
                  className="font-medium text-[#BE123C] hover:underline"
                >
                  Giải quyết nghẽn &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Banner Tóm Tắt Nhịp Độ Cá Nhân (Dưới cùng) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5] shrink-0">
                <AppIcons.clock size={18} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#0F172A]">
                  Tóm tắt nhịp độ cá nhân (Đặng Hồng Nguyên)
                </h3>
                <p className="text-xs text-[#475569] mt-0.5">
                  Đã tích lũy <strong className="text-[#0F172A]">18.5h / 24h</strong> mục tiêu tuần • Còn <strong className="text-[#BE123C]">1 ca thi môn học</strong> chiều nay (Mạng Máy Tính).
                  Năng suất học tập: <span className="font-semibold text-[#0D9488]">+14% so với tuần 10</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('studyDigest')}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors shrink-0"
            >
              <span>Chuyển sang chế độ Tổng Kết Học Tập Tuần</span>
              <AppIcons.arrowRight size={14} />
            </button>
          </div>
        </>
      ) : (
        /* Tab 2: Tổng Kết Học Tập Tuần */
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* 4 Thẻ KPI Học Tập */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#64748B]">
                <span>TỔNG GIỜ HỌC & ĐỒ ÁN</span>
                <AppIcons.clock size={16} className="text-[#4F46E5]" />
              </div>
              <div className="mt-2 text-2xl font-bold font-mono text-[#0F172A]">38.5h</div>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#0D9488]">
                <AppIcons.verifiedCheck size={12} />
                <span>Vượt mục tiêu tuần (+3.5h so với kế hoạch)</span>
              </div>
            </div>

            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#64748B]">
                <span>MÔN HỌC HOÀN THÀNH</span>
                <AppIcons.checkSquare size={16} className="text-[#0D9488]" />
              </div>
              <div className="mt-2 text-2xl font-bold font-mono text-[#0F172A]">4 / 4</div>
              <div className="mt-1 text-[11px] text-[#64748B]">
                Đạt 100% bài tập trắc nghiệm & lab thực hành
              </div>
            </div>

            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#64748B]">
                <span>TIẾN ĐỘ ĐỒ ÁN TỐT NGHIỆP</span>
                <AppIcons.workflow size={16} className="text-[#4F46E5]" />
              </div>
              <div className="mt-2 text-2xl font-bold font-mono text-[#4F46E5]">8 Tasks</div>
              <div className="mt-1 text-[11px] text-[#64748B]">
                FSM Pass: 2 PR merged, 6 sub-tasks done
              </div>
            </div>

            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#64748B]">
                <span>HIỆU SUẤT SPRINT CÁ NHÂN</span>
                <AppIcons.trophy size={16} className="text-amber-500" />
              </div>
              <div className="mt-2 text-2xl font-bold font-mono text-[#0F172A]">94 / 100</div>
              <div className="mt-1 text-[11px] text-[#0D9488] font-semibold">
                Xếp hạng A • Tối ưu phân bổ giờ rảnh
              </div>
            </div>
          </div>

          {/* Lưới Phân Bổ Môn Học & Nhật Ký */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Phân bổ theo môn học */}
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                <h3 className="text-xs font-bold uppercase tracking-wide text-[#0F172A]">
                  Phân Bổ Thời Gian Môn Học & Đồ Án (Tuần 11)
                </h3>
                <span className="text-[11px] font-mono text-[#64748B]">Tổng: 38.5h</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Đồ Án Tốt Nghiệp: Hệ Thống Smart Workspace</span>
                    <span className="font-mono text-[#4F46E5]">18.5h / 20h</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#4F46E5]" style={{ width: '92.5%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Mạng Máy Tính (Ôn tập & Thi giữa kỳ)</span>
                    <span className="font-mono text-[#0D9488]">7.0h / 6h</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#0D9488]" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Kiến Trúc Phần Mềm (Lab thiết kế Microservices)</span>
                    <span className="font-mono text-[#0F172A]">6.5h / 6h</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#0F172A]" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Cơ Sở Dữ Liệu Nâng Cao (Truy vấn tối ưu Index)</span>
                    <span className="font-mono text-[#64748B]">4.5h / 4h</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-slate-400" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>An Toàn Thông Tin (Bài tập thực hành mã hóa)</span>
                    <span className="font-mono text-[#64748B]">2.0h / 2h</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-slate-400" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Nhật ký thành tích & Khuyến nghị ôn tập */}
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                <h3 className="text-xs font-bold uppercase tracking-wide text-[#0F172A]">
                  Nhật Ký Cột Mốc & Kế Hoạch Tuần Tới (Tuần 12)
                </h3>
                <span className="text-[11px] font-semibold text-[#0D9488]">Sắp Tới: Sprint 33</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5 rounded-md border border-slate-100 bg-[#F8FAFC] p-2.5">
                  <div className="mt-0.5 text-[#0D9488]">
                    <AppIcons.verifiedCheck size={14} />
                  </div>
                  <div>
                    <span className="font-semibold text-[#0F172A]">Đã vượt qua kiểm tra SAST cho PR #42</span>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      Đạt chỉ tiêu code coverage 94.5% với thuật toán Kahn Topological Sort.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-md border border-slate-100 bg-[#F8FAFC] p-2.5">
                  <div className="mt-0.5 text-[#4F46E5]">
                    <AppIcons.calendar size={14} />
                  </div>
                  <div>
                    <span className="font-semibold text-[#0F172A]">Ca thi Mạng Máy Tính kết thúc hôm nay</span>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      Giải phóng 6h tự học cho tuần 12, ưu tiên toàn bộ cho module RAG & Vector Store.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-md border border-indigo-100 bg-indigo-50/50 p-2.5">
                  <div className="mt-0.5 text-[#4F46E5]">
                    <AppIcons.target size={14} />
                  </div>
                  <div>
                    <span className="font-semibold text-[#4F46E5]">Mục tiêu tuần 12: Alpha Release v1.0</span>
                    <p className="text-[11px] text-[#475569] mt-0.5">
                      Tích hợp hoàn thiện toàn bộ luồng FSM từ SRS Ingest đến Báo cáo Daily Standup.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-xs text-[#64748B]">Báo cáo được lưu trữ tự động trong hệ thống.</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('standup')}
                  className="h-7 text-xs gap-1.5"
                >
                  <AppIcons.arrowLeft size={13} />
                  <span>Quay Lại Daily Standup Nhóm</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyStandupPage;
