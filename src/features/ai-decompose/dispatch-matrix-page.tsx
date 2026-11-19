import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

interface TaskAssignment {
  id: string;
  badgeType: 'critical' | 'backlog' | 'slack';
  badgeLabel: string;
  title: string;
  duration: string;
  requirement: string;
  assigneeInitials: string;
  assigneeName: string;
  isManualOverride?: boolean;
  matchScore: number;
  matchDetail: string;
  aiReasoning: string;
}

const mockTasks: TaskAssignment[] = [
  {
    id: '#TASK-01',
    badgeType: 'critical',
    badgeLabel: 'CPM CRITICAL',
    title: 'Hiện thực hóa thuật toán tính toán đường găng DAG CPM',
    duration: '24 Giờ',
    requirement: 'Yêu cầu Elo > 1650',
    assigneeInitials: 'ĐN',
    assigneeName: 'Đặng Hồng Nguyên',
    matchScore: 96.4,
    matchDetail: 'Elo: 1,745 (Top 1)',
    aiReasoning:
      'Thành viên có vector kỹ năng Backend & DAG 88/100, hiện có 26h rảnh trong tuần và 0 xung đột lịch.',
  },
  {
    id: '#TASK-02',
    badgeType: 'backlog',
    badgeLabel: 'BACKLOG',
    title: 'Xây dựng màn hình Onboarding chọn thời khóa biểu sinh viên',
    duration: '12 Giờ',
    requirement: 'React Native, Mobile UI',
    assigneeInitials: 'TL',
    assigneeName: 'Tuấn Lê',
    isManualOverride: true,
    matchScore: 88.2,
    matchDetail: 'Gốc: 79.5% • Elo: 1,620',
    aiReasoning:
      'Leader đã can thiệp gán thủ công để cân bằng tải giờ làm việc với thành viên chính.',
  },
  {
    id: '#TASK-03',
    badgeType: 'slack',
    badgeLabel: 'SLACK: 16H',
    title: 'Tích hợp thư viện vLLM bóc tách văn bản offline',
    duration: '18 Giờ',
    requirement: 'AI Model Inference',
    assigneeInitials: 'HN',
    assigneeName: 'Hòa Nguyễn',
    matchScore: 91.8,
    matchDetail: 'Elo: 1,690',
    aiReasoning: 'Khớp chuyên sâu về xử lý RAG và tối ưu suy luận local SLM.',
  },
];

const availableMembers = [
  { initials: 'ĐN', name: 'Đặng Hồng Nguyên' },
  { initials: 'TL', name: 'Tuấn Lê' },
  { initials: 'HN', name: 'Hòa Nguyễn' },
  { initials: 'PT', name: 'Phương Thảo' },
];

export const DispatchMatrixPage: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskAssignment[]>(mockTasks);
  const [autoReschedule, setAutoReschedule] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'cpm' | 'high' | 'manual'>('all');

  const handleAssigneeChange = (taskId: string, newName: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const member = availableMembers.find((m) => m.name === newName);
          return {
            ...t,
            assigneeName: newName,
            assigneeInitials: member ? member.initials : 'NV',
            isManualOverride: true,
          };
        }
        return t;
      })
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'cpm') return t.badgeType === 'critical';
    if (activeFilter === 'high') return t.matchScore >= 90;
    if (activeFilter === 'manual') return t.isManualOverride;
    return true;
  });

  const handleActivatePlan = () => {
    navigate('/dag-gantt');
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-10">
      {/* Header & Summary Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Đối Soát Kế Hoạch &amp; Gán Tác Vụ (Dispatch Matrix)
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Phê duyệt hoặc điều chỉnh đề xuất phân bổ nhân sự từ thuật toán Bayesian Matchmaker trước khi kích hoạt WBS.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-mono font-medium text-[#475569]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]" />
            <span>Đã ghép cặp: 14/14 Tasks</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFF1F2] border border-[#FFE4E6] text-xs font-mono font-bold text-[#BE123C]">
            <AppIcons.criticalAlert size={13} />
            <span>5 Task trên đường găng CPM</span>
          </div>
        </div>
      </div>

      {/* Thanh Điều Khiển Auto-Reschedule & Bộ Lọc */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Toggle Auto-Reschedule */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAutoReschedule(!autoReschedule)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
              autoReschedule ? 'bg-[#4F46E5]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                autoReschedule ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0F172A]">
                Cơ chế điều lịch tự động (Auto-Reschedule)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-indigo-50 text-[#4F46E5]">
                {autoReschedule ? 'Bật: Tối ưu theo Slack' : 'Tắt'}
              </span>
            </div>
            <p className="text-[11px] text-[#64748B]">
              Tự động dịch chuyển slot rảnh khi task tiền nhiệm trễ deadline
            </p>
          </div>
        </div>

        {/* 4 Chip Lọc */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-[#4F46E5] text-white font-semibold shadow-xs'
                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Tất cả (14)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('cpm')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              activeFilter === 'cpm'
                ? 'bg-[#4F46E5] text-white font-semibold shadow-xs'
                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Đường Găng CPM (5)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('high')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              activeFilter === 'high'
                ? 'bg-[#4F46E5] text-white font-semibold shadow-xs'
                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Khớp &gt; 90%
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('manual')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              activeFilter === 'manual'
                ? 'bg-[#4F46E5] text-white font-semibold shadow-xs'
                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Đã Sửa Tay (1)
          </button>
        </div>
      </div>

      {/* Bảng Đối Soát 4 Cột */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                <th className="py-3 px-4 w-[32%]">TÁC VỤ &amp; ĐẶC TẢ KỸ THUẬT</th>
                <th className="py-3 px-4 w-[24%]">NHÂN SỰ ĐỀ XUẤT (AI / MANUAL)</th>
                <th className="py-3 px-4 w-[18%]">ĐỘ PHÙ HỢP (COSINE ELO)</th>
                <th className="py-3 px-4 w-[26%]">CĂN CỨ GHÉP CẶP CỦA AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredTasks.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Cột 1: Tác vụ */}
                  <td className="py-3.5 px-4 align-top">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#0F172A]">
                          {t.id}
                        </span>
                        {t.badgeType === 'critical' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C]">
                            {t.badgeLabel}
                          </span>
                        )}
                        {t.badgeType === 'backlog' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F1F5F9] text-[#64748B]">
                            {t.badgeLabel}
                          </span>
                        )}
                        {t.badgeType === 'slack' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700">
                            {t.badgeLabel}
                          </span>
                        )}
                      </div>

                      <div className="font-semibold text-xs text-[#0F172A] leading-snug">
                        {t.title}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-mono text-[#64748B]">
                        <span>{t.duration}</span>
                        <span>•</span>
                        <span>{t.requirement}</span>
                      </div>
                    </div>
                  </td>

                  {/* Cột 2: Nhân sự đề xuất */}
                  <td className="py-3.5 px-4 align-top">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <select
                          value={t.assigneeName}
                          onChange={(e) => handleAssigneeChange(t.id, e.target.value)}
                          className="h-8 rounded-md border border-[#E2E8F0] bg-white px-2.5 text-xs font-medium text-[#0F172A] outline-hidden hover:border-slate-300 focus:border-[#4F46E5] w-full"
                        >
                          {availableMembers.map((m) => (
                            <option key={m.name} value={m.name}>
                              {m.initials} - {m.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {t.isManualOverride && (
                        <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                          <AppIcons.override size={10} />
                          ĐÃ SỬA TAY
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Cột 3: Độ phù hợp Cosine Elo */}
                  <td className="py-3.5 px-4 align-top">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-[#0F172A]">
                          {t.matchScore}%
                        </span>
                      </div>

                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-[#4F46E5] rounded-full"
                          style={{ width: `${t.matchScore}%` }}
                        />
                      </div>

                      <div className="font-mono text-[11px] text-[#64748B]">
                        {t.matchDetail}
                      </div>
                    </div>
                  </td>

                  {/* Cột 4: Căn cứ ghép cặp */}
                  <td className="py-3.5 px-4 align-top">
                    <p className="text-xs text-[#334155] leading-relaxed">
                      {t.aiReasoning}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-[#0D9488]">
          <AppIcons.verifiedCheck size={16} />
          <span>
            Kế hoạch phân bổ đã sẵn sàng. Bấm kích hoạt để khởi tạo các node trên Đồ thị DAG CPM và gửi thông báo task.
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-slate-50 gap-1.5"
          >
            <AppIcons.refresh size={14} className="text-[#4F46E5]" />
            <span>Chạy Lại Khớp Cặp AI</span>
          </Button>

          <Button
            onClick={handleActivatePlan}
            className="h-9 px-4 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs transition-colors"
          >
            <span>Xác Nhận &amp; Kích Hoạt Dự Án (Activate Plan)</span>
            <AppIcons.arrowRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DispatchMatrixPage;
