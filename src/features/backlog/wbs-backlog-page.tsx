import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const WbsBacklogPage: React.FC = () => {
  const navigate = useNavigate();
  const [epic1Expanded, setEpic1Expanded] = useState<boolean>(true);
  const [epic2Expanded, setEpic2Expanded] = useState<boolean>(false);
  const [us04Expanded, setUs04Expanded] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="space-y-5 max-w-[1520px] mx-auto pb-12">
      {/* Header & Nút Thao Tác */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Danh Sách Backlog &amp; Phân Cấp User Story
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Quản lý cấu trúc Epic, User Story và Sub-tasks được bóc tách từ tài liệu đặc tả SRS.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/backlog/srs-diff')}
            className="h-8 text-xs border-[#E2E8F0] bg-white text-[#4F46E5] hover:bg-indigo-50 gap-1.5 shadow-2xs"
          >
            <AppIcons.refresh size={13} />
            <span>Đồng Bộ Từ SRS (Xem Diff)</span>
          </Button>

          <Button
            size="sm"
            className="h-8 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs"
          >
            <AppIcons.plus size={14} />
            <span>Tạo Hạng Mục Mới</span>
          </Button>
        </div>
      </div>

      {/* Filter Bar (ĐÃ SỬA LỖI TRÀN DÒNG THỐNG KÊ THEO CHỈ THỊ) */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Bộ tìm kiếm & 3 dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[320px]">
          <div className="flex items-center gap-2 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs text-[#64748B] w-64 shadow-2xs">
            <AppIcons.search size={14} className="text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Tìm kiếm hạng mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-hidden text-[#0F172A] placeholder-[#94A3B8] text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <select className="h-8 rounded-md border border-[#E2E8F0] bg-white px-2 text-xs text-[#0F172A] outline-hidden hover:border-slate-300">
              <option>Phụ trách: Tất cả</option>
              <option>Đặng Hồng Nguyên</option>
              <option>Tuấn Lê</option>
              <option>Hòa Nguyễn</option>
            </select>

            <select className="h-8 rounded-md border border-[#E2E8F0] bg-white px-2 text-xs text-[#0F172A] outline-hidden hover:border-slate-300">
              <option>Trạng thái: Đang mở (18)</option>
              <option>IN_PROGRESS</option>
              <option>TODO</option>
              <option>DONE</option>
            </select>

            <select className="h-8 rounded-md border border-[#E2E8F0] bg-white px-2 text-xs text-[#0F172A] outline-hidden hover:border-slate-300">
              <option>Story Points: Tất cả (1 - 13 SP)</option>
              <option>1 - 3 SP</option>
              <option>5 - 8 SP</option>
              <option>13 SP</option>
            </select>
          </div>
        </div>

        {/* Dòng Thống Kê WBS Gọn Trong Khung */}
        <div className="font-mono text-xs font-semibold text-[#64748B] shrink-0 bg-[#F8FAFC] px-3 py-1.5 rounded-md border border-[#E2E8F0]">
          <span>3 Epics</span> • <span>8 Stories</span> • <span>24 Tasks</span> •{' '}
          <span className="text-[#4F46E5] font-bold">68 SP</span>
        </div>
      </div>

      {/* Bảng Cây Phân Cấp WBS 4 Cột */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                <th className="py-3 px-4 w-[45%]">CẤU TRÚC PHÂN CẤP (EPIC / USER STORY / SUB-TASK)</th>
                <th className="py-3 px-4 w-[20%]">TRẠNG THÁI (FSM)</th>
                <th className="py-3 px-4 w-[20%]">PHỤ TRÁCH</th>
                <th className="py-3 px-4 w-[15%] text-right pr-6">ĐỘ PHỨC TẠP (SP / GIỜ)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {/* ===== EPIC 01 ===== */}
              <tr className="bg-slate-50/70 hover:bg-slate-100/60 font-semibold transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEpic1Expanded(!epic1Expanded)}
                      className="p-1 rounded hover:bg-slate-200 text-[#64748B]"
                    >
                      <AppIcons.chevronDown
                        size={14}
                        className={`transition-transform ${epic1Expanded ? '' : '-rotate-90'}`}
                      />
                    </button>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5]">
                      EPIC-01
                    </span>
                    <span className="text-xs text-[#0F172A]">
                      Lõi Thuật Toán Lập Lịch &amp; Đồ Thị Đường Găng CPM
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 border border-indigo-100 text-[#4F46E5]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />
                    IN_PROGRESS (65%)
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      <span className="h-6 w-6 rounded-full bg-[#0F172A] text-[9px] font-bold text-white flex items-center justify-center border-2 border-white">
                        ĐN
                      </span>
                      <span className="h-6 w-6 rounded-full bg-slate-700 text-[9px] font-bold text-white flex items-center justify-center border-2 border-white">
                        HN
                      </span>
                    </div>
                    <span className="text-xs text-[#64748B]">2 Thành viên</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right pr-6 font-mono font-bold text-[#0F172A]">
                  34 SP • 88h
                </td>
              </tr>

              {/* Sub-item: #US-04 */}
              {epic1Expanded && (
                <>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5 px-4 pl-10">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setUs04Expanded(!us04Expanded)}
                          className="p-1 rounded hover:bg-slate-200 text-[#94A3B8]"
                        >
                          <AppIcons.chevronDown
                            size={13}
                            className={`transition-transform ${us04Expanded ? '' : '-rotate-90'}`}
                          />
                        </button>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
                          #US-04
                        </span>
                        <span className="text-xs font-medium text-[#0F172A]">
                          Tính toán Topological Sort và phát hiện chuỗi đường găng
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-50 text-[#4F46E5]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />
                        IN_PROGRESS
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="h-5 w-5 rounded-full bg-[#0F172A] text-[9px] font-bold text-white flex items-center justify-center">
                          ĐN
                        </span>
                        <span>Đặng Hồng Nguyên</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-right pr-6 font-mono text-xs">
                      <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-[#4F46E5] font-bold">
                        13 SP
                      </span>{' '}
                      <span className="text-[#64748B]">40h</span>
                    </td>
                  </tr>

                  {/* Sub-item: #TASK-01 CPM Critical */}
                  {us04Expanded && (
                    <>
                      <tr className="hover:bg-rose-50/30 transition-colors bg-[#FFF1F2]/20">
                        <td className="py-2 px-4 pl-20">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-[#BE123C]">
                              #TASK-01
                            </span>
                            <span className="text-xs text-[#0F172A]">
                              Hiện thực hóa thuật toán tính toán đường găng
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C]">
                              CPM CRITICAL
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-4">
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#4F46E5]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />
                            IN_PROGRESS
                          </span>
                        </td>
                        <td className="py-2 px-4 text-xs text-[#64748B]">
                          <div className="flex items-center gap-2">
                            <span className="h-5 w-5 rounded-full bg-[#0F172A] text-[9px] font-bold text-white flex items-center justify-center">
                              ĐN
                            </span>
                            <span>Đặng Hồng Nguyên</span>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-right pr-6 font-mono text-xs text-[#BE123C] font-semibold">
                          5 SP • 24h
                        </td>
                      </tr>

                      {/* Sub-item: #TASK-04 Done */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-2 px-4 pl-20">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-[#475569]">
                              #TASK-04
                            </span>
                            <span className="text-xs text-[#0F172A]">
                              Viết Unit Test kiểm tra trường hợp đồ thị có chu trình (Cyclic)
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-4">
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#0D9488]">
                            <AppIcons.verifiedCheck size={11} />
                            DONE
                          </span>
                        </td>
                        <td className="py-2 px-4 text-xs text-[#64748B]">
                          <div className="flex items-center gap-2">
                            <span className="h-5 w-5 rounded-full bg-[#0F172A] text-[9px] font-bold text-white flex items-center justify-center">
                              ĐN
                            </span>
                            <span>Đặng Hồng Nguyên</span>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-right pr-6 font-mono text-xs text-[#64748B]">
                          3 SP • 8h
                        </td>
                      </tr>
                    </>
                  )}

                  {/* Sub-item: #US-05 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5 px-4 pl-10">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
                          #US-05
                        </span>
                        <span className="text-xs font-medium text-[#0F172A]">
                          Tích hợp suy luận cục bộ vLLM phân tích phụ thuộc tài liệu
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-[#64748B]">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                        TODO
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-slate-700 text-[9px] font-bold text-white flex items-center justify-center">
                          HN
                        </span>
                        <span>Hòa Nguyễn</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-right pr-6 font-mono text-xs">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[#475569]">
                        8 SP
                      </span>{' '}
                      <span className="text-[#64748B]">24h</span>
                    </td>
                  </tr>
                </>
              )}

              {/* ===== EPIC 02 ===== */}
              <tr className="bg-slate-50/70 hover:bg-slate-100/60 font-semibold transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEpic2Expanded(!epic2Expanded)}
                      className="p-1 rounded hover:bg-slate-200 text-[#64748B]"
                    >
                      <AppIcons.chevronDown
                        size={14}
                        className={`transition-transform ${epic2Expanded ? '' : '-rotate-90'}`}
                      />
                    </button>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5]">
                      EPIC-02
                    </span>
                    <span className="text-xs text-[#0F172A]">
                      Giao Diện Mobile Onboarding &amp; Lịch Biểu Thích Ứng
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-[#64748B]">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    TODO (20%)
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="h-5 w-5 rounded-full bg-slate-700 text-[9px] font-bold text-white flex items-center justify-center">
                      TL
                    </span>
                    <span>Tuấn Lê</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right pr-6 font-mono font-bold text-[#0F172A]">
                  21 SP • 48h
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Phân Trang */}
        <div className="border-t border-[#E2E8F0] p-3.5 bg-[#F8FAFC] flex items-center justify-between text-xs text-[#64748B]">
          <span>Hiển thị 6 / 35 hạng mục trong cây phân cấp WBS.</span>
          <div className="flex items-center gap-2 font-mono">
            <span>Trang 1 / 4</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="h-7 w-7 rounded border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:bg-slate-50 disabled:opacity-40"
                disabled
              >
                &lt;
              </button>
              <button
                type="button"
                className="h-7 w-7 rounded border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:bg-slate-50"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WbsBacklogPage;
