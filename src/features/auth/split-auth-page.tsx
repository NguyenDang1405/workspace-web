import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { AppIcons, BrandLogoMark } from '@/components/icons/AppIcons';
import { useAuth } from '@/hooks/use-auth';
import { apiClient } from '@/lib/api-client';

type AuthMode = 'login' | 'register';
type WorkspaceType = 'personal' | 'team';

interface SplitAuthPageProps {
  defaultMode?: AuthMode;
}

export const SplitAuthPage: React.FC<SplitAuthPageProps> = ({ defaultMode }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login } = useAuth();

  // Synchronize mode from URL query ?mode=login / ?mode=register or prop
  const urlMode = searchParams.get('mode') as AuthMode | null;
  const initialMode: AuthMode = urlMode === 'register' || urlMode === 'login'
    ? urlMode
    : defaultMode || 'login';

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [workspaceType, setWorkspaceType] = useState<WorkspaceType>('personal');

  // Form states
  const [fullName, setFullName] = useState<string>('Đặng Hồng Nguyên');
  const [email, setEmail] = useState<string>('nguyen.dang@university.edu.vn');
  const [password, setPassword] = useState<string>('••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state if URL search param changes
  useEffect(() => {
    if (urlMode === 'register' || urlMode === 'login') {
      setMode(urlMode);
    }
  }, [urlMode]);

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrorMsg(null);
    setSearchParams({ mode: newMode });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (mode === 'login') {
        try {
          const res = await apiClient.post('/auth/login', { email, password });
          const token = res.data?.token || res.data?.accessToken || 'mock-jwt-token';
          login(token);
        } catch {
          // Fallback authorization demo token
          login('mock-jwt-token-demo');
        }
        if (email.toLowerCase().includes('admin')) {
          navigate('/admin/pulse');
        } else {
          navigate('/kanban');
        }
      } else {
        // Register flow
        const targetMode = workspaceType === 'personal' ? 'ACADEMIC' : 'ENTERPRISE';
        localStorage.setItem('workspace_mode', targetMode);
        try {
          await apiClient.post('/auth/register', {
            fullName,
            email,
            password,
            workspaceType,
          });
        } catch {
          // Proceed with demo flow
        }
        login('mock-jwt-token-registered');
        if (workspaceType === 'personal') {
          navigate('/onboarding/academic');
        } else {
          navigate('/onboarding/enterprise');
        }
      }
    } catch (err: unknown) {
      console.warn('Authentication error:', err);
      setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Outer Split Card Container */}
      <div className="w-full max-w-[1080px] bg-white rounded-2xl lg:rounded-3xl shadow-auth overflow-hidden border border-slate-800/30 grid grid-cols-1 lg:grid-cols-2">
        
        {/* ==================================================== */}
        {/* LEFT COLUMN: FORM AREA */}
        {/* ==================================================== */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            {/* Header: Dynamic BrandLogoMark + System Name */}
            <div className="flex items-center gap-3">
              <BrandLogoMark size={32} />
              <div className="flex flex-col">
                <span className="text-[15px] font-bold tracking-tight text-[#0F172A] leading-tight">
                  Smart Workspace
                </span>
                <span className="text-[11px] font-medium text-[#64748B] leading-tight">
                  AI Workspace Platform
                </span>
              </div>
            </div>

            {/* Headline and Subtitle */}
            <div className="mt-7">
              <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
                {mode === 'login' ? 'Chào mừng trở lại' : 'Bắt đầu với Smart Workspace'}
              </h1>
              <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                {mode === 'login'
                  ? 'Đăng nhập để tiếp tục theo dõi tiến độ và tối ưu lịch trình.'
                  : 'Nền tảng tối ưu kế hoạch và phân bổ công việc thông minh.'}
              </p>
            </div>

            {/* Segmented Switcher Pill */}
            <div className="mt-5 p-1 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0] flex items-center">
              <button
                type="button"
                onClick={() => switchMode('register')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all text-center ${
                  mode === 'register'
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Đăng ký
              </button>
              <button
                type="button"
                onClick={() => switchMode('login')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all text-center ${
                  mode === 'login'
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Đăng nhập
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-[#FFF1F2] border border-[#FECDD3] text-[#BE123C] text-xs font-medium flex items-center gap-2">
                  <AppIcons.criticalAlert size={14} className="shrink-0 text-[#BE123C]" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* REGISTER MODE ONLY: 2 Workspace Selection Cards */}
              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-3">
                  {/* Card 1: Học tập / Cá nhân */}
                  <button
                    type="button"
                    onClick={() => setWorkspaceType('personal')}
                    className={`p-3 rounded-lg border text-left transition-all relative ${
                      workspaceType === 'personal'
                        ? 'border-[#4F46E5] bg-white ring-1 ring-[#4F46E5] shadow-xs'
                        : 'border-[#E2E8F0] bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-[#0F172A]">Học tập / Cá nhân</span>
                      {workspaceType === 'personal' && (
                        <span className="h-4 w-4 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] flex items-center justify-center shrink-0">
                          <AppIcons.check size={11} strokeWidth={2.5} />
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-[#4F46E5] font-medium leading-tight">
                      Tự động xếp lịch theo giờ rảnh
                    </p>
                  </button>

                  {/* Card 2: Doanh nghiệp / Đội ngũ */}
                  <button
                    type="button"
                    onClick={() => setWorkspaceType('team')}
                    className={`p-3 rounded-lg border text-left transition-all relative ${
                      workspaceType === 'team'
                        ? 'border-[#4F46E5] bg-white ring-1 ring-[#4F46E5] shadow-xs'
                        : 'border-[#E2E8F0] bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-[#0F172A]">Doanh nghiệp / Đội ngũ</span>
                      {workspaceType === 'team' && (
                        <span className="h-4 w-4 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] flex items-center justify-center shrink-0">
                          <AppIcons.check size={11} strokeWidth={2.5} />
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-[#64748B] leading-tight">
                      Quản lý Sprint & Đồ thị CPM
                    </p>
                  </button>
                </div>
              )}

              {/* REGISTER ONLY: Full Name */}
              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#0F172A]">Họ và tên</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">
                      <AppIcons.user size={15} />
                    </div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Đặng Hồng Nguyên"
                      className="w-full h-10 rounded-lg border border-[#E2E8F0] bg-white pl-9 pr-3 text-xs text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-[#0F172A]">
                    Email trường học hoặc công ty
                  </label>
                  {mode === 'login' && (
                    <span className="rounded-md bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[10px] font-mono font-medium text-[#4F46E5]">
                      Được hỗ trợ SSO
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">
                    <AppIcons.mail size={15} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nguyen.dang@university.edu.vn"
                    className="w-full h-10 rounded-lg border border-[#E2E8F0] bg-white pl-9 pr-3 text-xs text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#0F172A]">Mật khẩu</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">
                    <AppIcons.lock size={15} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full h-10 rounded-lg border border-[#E2E8F0] bg-white pl-9 pr-10 text-xs text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] p-0.5"
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? <AppIcons.eyeOff size={15} /> : <AppIcons.eye size={15} />}
                  </button>
                </div>
              </div>

              {/* LOGIN ONLY: Remember Me & Forgot Password */}
              {mode === 'login' && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-[#0F172A]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-[#CBD5E1] text-[#4F46E5] focus:ring-[#4F46E5]"
                    />
                    <span className="text-[11px] text-[#334155]">Ghi nhớ đăng nhập (30 ngày)</span>
                  </label>
                  <a href="#" className="text-[11px] font-medium text-[#4F46E5] hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
              )}

              {/* CTA Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 mt-2 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50"
              >
                <span>
                  {isLoading
                    ? 'Đang xử lý...'
                    : mode === 'login'
                    ? 'Đăng nhập vào Workspace'
                    : 'Tạo tài khoản'}
                </span>
                <span className="font-bold text-sm leading-none">→</span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-[#E2E8F0]"></div>
              <span className="flex-shrink mx-3 text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                {mode === 'login' ? 'HOẶC ĐĂNG NHẬP BẰNG' : 'hoặc đăng ký bằng'}
              </span>
              <div className="flex-grow border-t border-[#E2E8F0]"></div>
            </div>

            {/* OAuth Buttons (Google & GitHub) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Google */}
              <button
                type="button"
                onClick={() => {
                  login('google-sso-token');
                  navigate('/projects/demo-1/kanban');
                }}
                className="h-9 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-medium text-[#0F172A] flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={() => {
                  login('github-oauth-token');
                  navigate('/projects/demo-1/kanban');
                }}
                className="h-9 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-medium text-[#0F172A] flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 fill-current text-[#0F172A]" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            {/* Quick Switch Text */}
            <div className="mt-4 text-center text-xs text-[#64748B]">
              {mode === 'login' ? (
                <>
                  <span>Chưa có tài khoản? </span>
                  <button
                    type="button"
                    onClick={() => switchMode('register')}
                    className="font-semibold text-[#4F46E5] hover:underline"
                  >
                    Đăng ký ngay
                  </button>
                </>
              ) : (
                <>
                  <span>Đã có tài khoản? </span>
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="font-semibold text-[#4F46E5] hover:underline"
                  >
                    Đăng nhập
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Legal Disclaimer */}
          <p className="mt-6 text-[10px] text-[#64748B] text-center leading-normal">
            Bằng cách tiếp tục, bạn đồng ý với{' '}
            <a href="#" className="underline hover:text-[#0F172A]">
              Điều khoản dịch vụ
            </a>{' '}
            và{' '}
            <a href="#" className="underline hover:text-[#0F172A]">
              Chính sách quyền riêng tư
            </a>
            .
          </p>
        </div>

        {/* ==================================================== */}
        {/* RIGHT COLUMN: BRAND MÖBIUS WAVE ART */}
        {/* ==================================================== */}
        <div className="hidden lg:relative lg:flex items-center justify-center bg-gradient-to-br from-[#E0E7FF] via-[#F0FDFA] to-[#CFFAFE] overflow-hidden">
          {/* Subtle Ambient Background Light */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#EFF6FF]/60 via-transparent to-[#EEF2FF]/80 pointer-events-none" />

          {/* Master 3D Mobius Wave Graphics (SVG Vector Render) */}
          <svg
            className="w-full h-full object-cover select-none scale-105"
            viewBox="0 0 600 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Wave Gradient 1: Sky to Cyan */}
              <linearGradient id="waveCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.9" />
              </linearGradient>

              {/* Wave Gradient 2: Royal Indigo to Deep Blue */}
              <linearGradient id="waveIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#4F46E5" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#4338CA" stopOpacity="1" />
              </linearGradient>

              {/* Wave Gradient 3: Soft Lavender / Ribbon Highlight */}
              <linearGradient id="waveLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.75" />
              </linearGradient>

              {/* Deep Shadow Wave */}
              <linearGradient id="waveDeep" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3730A3" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#312E81" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Background Layer 1: Top Soft Wavy Contour */}
            <path
              d="M0 160C120 120 220 220 380 180C480 150 540 190 600 170V700H0V160Z"
              fill="url(#waveLight)"
            />

            {/* Background Layer 2: Main Electric Cyan Ribbon */}
            <path
              d="M0 240C140 180 260 320 420 260C500 230 550 250 600 230V700H0V240Z"
              fill="url(#waveCyan)"
            />

            {/* Intermediate Shadow Line */}
            <path
              d="M0 280C150 220 270 360 430 300C510 270 560 300 600 280V700H0V280Z"
              fill="url(#waveDeep)"
            />

            {/* Main Foreground Wave: Royal Indigo */}
            <path
              d="M0 360C120 300 240 430 400 370C490 335 550 360 600 340V700H0V360Z"
              fill="url(#waveIndigo)"
            />

            {/* Bottom Swell: Deep Rich Indigo Base */}
            <path
              d="M0 480C140 430 260 540 420 480C510 445 560 480 600 460V700H0V480Z"
              fill="#4338CA"
            />

            {/* Subtle Contour Accent Lines */}
            <path
              d="M0 150C120 110 220 210 380 170C480 140 540 180 600 160"
              stroke="#6366F1"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <path
              d="M0 230C140 170 260 310 420 250C500 220 550 240 600 220"
              stroke="#E0E7FF"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <path
              d="M0 350C120 290 240 420 400 360C490 325 550 350 600 330"
              stroke="#A5B4FC"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SplitAuthPage;
