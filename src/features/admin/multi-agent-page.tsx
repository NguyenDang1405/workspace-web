import React, { useState } from 'react';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export type AgentType = 'SRS_DECOMPOSER' | 'DAG_SCHEDULER' | 'TALENT_MATCHMAKER';

const AGENT_PROMPTS: Record<AgentType, string> = {
  SRS_DECOMPOSER: `// ROLE: Senior Software Architect & Requirement Decomposition Specialist
You are the core SRS Decomposer of Smart Workspace.

INPUT: Raw SRS Document (IEEE-830 format) or User Epics.

OUTPUT SPECIFICATION:
1. Parse functional requirements into an atomic Directed Acyclic Graph (DAG).
2. Extract Task IDs, estimated duration (hours), and strict prerequisites.
3. Output JSON strictly matching Schema:
{ "tasks": [...], "dependencies": [...] }
4. Respect INVEST criteria: Independent, Negotiable, Valuable, Estimable, Small, Testable.

// Ready to ingest context vector chunks from pgvector`,

  DAG_SCHEDULER: `// ROLE: Critical Path Method (CPM) & Topological Graph Optimization Specialist
You are the DAG CPM Scheduler Engine of Smart Workspace.

INPUT: Task nodes, dependencies, member availability matrix, and work hours.

OUTPUT SPECIFICATION:
1. Calculate Early Start (ES), Early Finish (EF), Late Start (LS), Late Finish (LF).
2. Compute Total Float (Slack = LS - ES).
3. Identify Critical Path (Slack == 0, is_critical_path = true).
4. Auto-resolve resource contention without cyclic deadlocks.

// Mathematical guarantees: Zero negative float, O(V + E) topological sort.`,

  TALENT_MATCHMAKER: `// ROLE: Bayesian Elo Skill Matrix & Engineering Dispatcher
You are the Talent Matchmaker Specialist of Smart Workspace.

INPUT: Task complexity (W), skill embeddings vector, and engineer profiles.

OUTPUT SPECIFICATION:
1. Compute cosine affinity score between task vector and engineer skill embeddings.
2. Weight by Bayesian Elo Rating (K=24, difficulty multiplier 0.8x - 1.5x).
3. Recommend top 3 optimal assignees with rationale and predicted velocity.
4. Flag potential SLA risks if required seniority exceeds available capacity.

// Output Schema: { "recommendations": [{ "user_id": "...", "fit_score": 0.94 }] }`,
};

export const MultiAgentPage: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>('SRS_DECOMPOSER');
  const [promptText, setPromptText] = useState<string>(AGENT_PROMPTS.SRS_DECOMPOSER);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployStatus, setDeployStatus] = useState<string>('Triển Khai Cấu Hình (Deploy Pipeline)');

  // Hyperparameters
  const [temperature, setTemperature] = useState<number>(0.2);
  const [maxTokens, setMaxTokens] = useState<number>(2048);
  const [topP, setTopP] = useState<number>(0.9);
  const [isFallbackEnabled, setIsFallbackEnabled] = useState<boolean>(true);
  const [isJsonSchemaEnforced, setIsJsonSchemaEnforced] = useState<boolean>(true);
  const [isRagFiltered, setIsRagFiltered] = useState<boolean>(true);

  const handleSelectAgent = (agent: AgentType) => {
    setSelectedAgent(agent);
    setPromptText(AGENT_PROMPTS[agent]);
  };

  const handleResetPrompt = () => {
    setPromptText(AGENT_PROMPTS[selectedAgent]);
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setDeployStatus('Đang triển khai vLLM...');
    setTimeout(() => {
      setIsDeploying(false);
      setDeployStatus('Pipeline Đã Triển Khai Thành Công!');
      setTimeout(() => setDeployStatus('Triển Khai Cấu Hình (Deploy Pipeline)'), 2500);
    }, 900);
  };

  const tokenCount = Math.round(promptText.length / 3.8);

  return (
    <div className="space-y-6 select-none font-sans text-[#0F172A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
            Điều Phối Đa Tác Nhân & Quản Trị Prompt Hệ Thống (Multi-Agent Studio)
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Cấu hình quy trình suy luận, system instruction, và các siêu tham số định tuyến cho từng Agent độc lập.
          </p>
        </div>

        <Button
          onClick={handleDeploy}
          disabled={isDeploying}
          className="gap-2 bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs self-start sm:self-auto"
        >
          {isDeploying ? (
            <AppIcons.refresh size={14} className="animate-spin text-white" />
          ) : (
            <AppIcons.check size={14} strokeWidth={2.5} />
          )}
          <span>{deployStatus}</span>
        </Button>
      </div>

      {/* Row of 3 Agent Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Agent 1: SRS Decomposer */}
        <button
          type="button"
          onClick={() => handleSelectAgent('SRS_DECOMPOSER')}
          className={`p-4 rounded-lg border text-left transition-all relative ${
            selectedAgent === 'SRS_DECOMPOSER'
              ? 'border-[#4F46E5] bg-[#EEF2FF]/40 ring-1 ring-[#4F46E5] shadow-xs'
              : 'border-[#E2E8F0] bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-[#4F46E5] text-white flex items-center justify-center shrink-0">
                <AppIcons.navBacklogSrs size={16} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#0F172A]">SRS Decomposer Agent</h3>
                <p className="text-[11px] text-[#64748B]">Tự động phân rã WBS/SRS</p>
              </div>
            </div>

            <span
              className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded ${
                selectedAgent === 'SRS_DECOMPOSER'
                  ? 'bg-[#4F46E5] text-white'
                  : 'bg-slate-100 text-[#64748B]'
              }`}
            >
              {selectedAgent === 'SRS_DECOMPOSER' ? 'Active v2.4' : 'Standby'}
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#64748B]">Target: WBS Generator</span>
            <span className="font-bold text-[#4F46E5]">98.4% Accuracy</span>
          </div>
        </button>

        {/* Agent 2: DAG CPM Scheduler */}
        <button
          type="button"
          onClick={() => handleSelectAgent('DAG_SCHEDULER')}
          className={`p-4 rounded-lg border text-left transition-all relative ${
            selectedAgent === 'DAG_SCHEDULER'
              ? 'border-[#4F46E5] bg-[#EEF2FF]/40 ring-1 ring-[#4F46E5] shadow-xs'
              : 'border-[#E2E8F0] bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-slate-100 text-[#64748B] flex items-center justify-center shrink-0">
                <AppIcons.navDagGantt size={16} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#0F172A]">DAG CPM Scheduler Agent</h3>
                <p className="text-[11px] text-[#64748B]">Thuật toán tô-pô & đường găng</p>
              </div>
            </div>

            <span
              className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded ${
                selectedAgent === 'DAG_SCHEDULER'
                  ? 'bg-[#4F46E5] text-white'
                  : 'bg-slate-100 text-[#64748B]'
              }`}
            >
              {selectedAgent === 'DAG_SCHEDULER' ? 'Active v2.4' : 'Standby'}
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
            <span>Target: Critical Path</span>
            <span>CPM Calc Engine</span>
          </div>
        </button>

        {/* Agent 3: Talent Matchmaker */}
        <button
          type="button"
          onClick={() => handleSelectAgent('TALENT_MATCHMAKER')}
          className={`p-4 rounded-lg border text-left transition-all relative ${
            selectedAgent === 'TALENT_MATCHMAKER'
              ? 'border-[#4F46E5] bg-[#EEF2FF]/40 ring-1 ring-[#4F46E5] shadow-xs'
              : 'border-[#E2E8F0] bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-slate-100 text-[#64748B] flex items-center justify-center shrink-0">
                <AppIcons.target size={16} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#0F172A]">Talent Matchmaker Agent</h3>
                <p className="text-[11px] text-[#64748B]">Ghép cặp năng lực & Elo</p>
              </div>
            </div>

            <span
              className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded ${
                selectedAgent === 'TALENT_MATCHMAKER'
                  ? 'bg-[#4F46E5] text-white'
                  : 'bg-slate-100 text-[#64748B]'
              }`}
            >
              {selectedAgent === 'TALENT_MATCHMAKER' ? 'Active v2.4' : 'Standby'}
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
            <span>Target: Skill Matrix</span>
            <span>Elo Ranker v3</span>
          </div>
        </button>
      </div>

      {/* Main 2-Column Section (Span 7 : Span 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ======================================================== */}
        {/* Left Column (Span 7): System Prompt Editor              */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#0F172A]">
                  Trình Biên Tập Prompt Hệ Thống (System Prompt Editor)
                </h2>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Cấu Hình Chỉ Lệnh Hệ Thống (System Directive) cho tác nhân
                </p>
              </div>

              <span className="font-mono text-xs font-bold text-[#0F172A] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded">
                Tokens: <strong className="text-[#4F46E5]">{tokenCount}</strong> / 4,096
              </span>
            </div>

            {/* Code/Prompt Editor with Line Numbers */}
            <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] font-mono text-xs text-[#0F172A] flex overflow-hidden">
              {/* Line numbers gutter */}
              <div className="bg-slate-100/80 border-r border-[#E2E8F0] py-3 px-2 text-right text-slate-400 select-none text-[11px] leading-relaxed">
                {promptText.split('\n').map((_, idx) => (
                  <div key={idx}>{(idx + 1).toString().padStart(2, '0')}</div>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                rows={16}
                spellCheck={false}
                className="flex-1 bg-transparent py-3 px-3 outline-none resize-none leading-relaxed text-xs text-[#0F172A] font-mono"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetPrompt}
              className="h-8 gap-1.5 text-xs text-[#64748B] hover:text-[#0F172A]"
            >
              <AppIcons.reset size={13} />
              <span>Khôi Phục Mặc Định (Reset)</span>
            </Button>

            <Button
              size="sm"
              onClick={() => alert('Chạy thử nghiệm prompt trong Playground test sandbox...')}
              className="h-8 gap-1.5 text-xs font-semibold bg-[#4F46E5] hover:bg-indigo-700 text-white shadow-xs"
            >
              <AppIcons.play size={13} />
              <span>Chạy Thử Nghiệm Prompt (Playground Run)</span>
            </Button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Right Column (Span 5): Hyperparameters & Router         */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#0F172A]">
                Tham Số Siêu Cấu Hình & Bộ Định Tuyến
              </h2>
              <p className="text-[11px] text-[#64748B] mt-0.5">Model Router & Hyperparameters</p>
            </div>

            <span className="font-mono text-[10px] font-bold text-[#4F46E5] bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
              vLLM-Engine-v0.6
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Section 1: Model & Fallback */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                1. LỰA CHỌN MÔ HÌNH & FALLBACK
              </span>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#0F172A]">
                  Mô hình xử lý chính (Local Inference)
                </label>
                <div className="p-2.5 rounded-md border border-[#4F46E5] bg-[#EEF2FF]/40 flex items-center justify-between font-mono text-xs text-[#0F172A] font-bold">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#4F46E5]"></span>
                    <span>vLLM Worker: Qwen-2.5-Coder-7B-Instruct</span>
                  </div>
                  <AppIcons.check size={14} className="text-[#4F46E5]" />
                </div>
              </div>

              {/* Fallback Box */}
              <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#0F172A]">
                    Tự động Fallback sang OpenAI khi cụm quá tải (&gt;3s)
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsFallbackEnabled(!isFallbackEnabled)}
                    className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isFallbackEnabled ? 'bg-[#4F46E5]' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        isFallbackEnabled ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between font-mono text-[11px] text-[#64748B]">
                  <span>OpenAI GPT-4o-mini (Cloud API)</span>
                  <span className="font-bold text-[#4F46E5] bg-white border border-indigo-200 px-1.5 py-0.2 rounded">
                    Backup
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Hyperparameters */}
            <div className="space-y-3 pt-2 border-t border-[#E2E8F0]">
              <span className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                2. TINH CHỈNH HYPERPARAMETERS
              </span>

              {/* Temperature */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-[#0F172A]">
                    Temperature (Độ sáng tạo / ngẫu nhiên)
                  </label>
                  <span className="font-mono font-bold text-[#0F172A]">
                    {temperature.toFixed(2)}{' '}
                    <span className="text-[10px] text-[#64748B] font-normal">(Chính xác cao)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-[#4F46E5] cursor-pointer"
                />
              </div>

              {/* Max Tokens */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-[#0F172A]">
                    Max Output Tokens (Độ dài phản hồi)
                  </label>
                  <span className="font-mono font-bold text-[#0F172A]">
                    {maxTokens.toLocaleString()} Tokens
                  </span>
                </div>
                <input
                  type="range"
                  min={512}
                  max={4096}
                  step={256}
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(Number(e.target.value))}
                  className="w-full accent-[#4F46E5] cursor-pointer"
                />
              </div>

              {/* Top-P */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-[#0F172A]">Top-P Sampling</label>
                  <span className="font-mono font-bold text-[#0F172A]">{topP.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  value={topP}
                  onChange={(e) => setTopP(Number(e.target.value))}
                  className="w-full accent-[#4F46E5] cursor-pointer"
                />
              </div>
            </div>

            {/* Section 3: Output Formatting Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
              <span className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                3. KIỂM SOÁT KHUÔN MẪU ĐẦU RA
              </span>

              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isJsonSchemaEnforced}
                  onChange={(e) => setIsJsonSchemaEnforced(e.target.checked)}
                  className="h-3.5 w-3.5 mt-0.5 rounded border-[#CBD5E1] text-[#4F46E5] focus:ring-[#4F46E5]"
                />
                <span className="text-[11px] font-medium text-[#0F172A]">
                  Bắt buộc Structured JSON Schema (vLLM Guided Decoding)
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isRagFiltered}
                  onChange={(e) => setIsRagFiltered(e.target.checked)}
                  className="h-3.5 w-3.5 mt-0.5 rounded border-[#CBD5E1] text-[#4F46E5] focus:ring-[#4F46E5]"
                />
                <span className="text-[11px] font-medium text-[#0F172A]">
                  Tự động trích lọc tài liệu RAG tương đồng trước khi nạp Prompt
                </span>
              </label>
            </div>
          </div>

          <div className="border-t border-[#E2E8F0] pt-3 text-[11px] font-mono text-[#64748B] flex items-center justify-between">
            <span>* Áp dụng ngay cho phiên suy luận tiếp theo</span>
            <span className="text-[#4F46E5]">/v1/ai/config/agent-srs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiAgentPage;
