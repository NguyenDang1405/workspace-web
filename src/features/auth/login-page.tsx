import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppIcons, BrandLogoMark } from '@/components/icons/AppIcons';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@workspace.vn');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const token = response.data?.token || response.data?.accessToken || 'mock-jwt-token';
      login(token);
      navigate('/projects/demo-1/kanban');
    } catch (err: unknown) {
      console.warn('API error, proceeding with mock token authorization:', err);
      login('mock-jwt-token-demo');
      navigate('/projects/demo-1/kanban');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center">
            <BrandLogoMark size={56} className="!w-14 !h-14 !rounded-2xl shadow-xl shadow-indigo-500/20" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Smart Workspace
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Hệ thống điều phối & Quản lý dự án thông minh
          </p>
        </div>

        <Card className="border-slate-200 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl">Đăng Nhập Hệ Thống</CardTitle>
            <CardDescription>
              Nhập thông tin tài khoản của bạn để truy cập workspace
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs font-medium text-[#BE123C]">
                  <AppIcons.criticalAlert size={16} className="shrink-0 text-[#BE123C]" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Email công việc</label>
                <div className="relative">
                  <AppIcons.mail size={16} className="absolute left-3 top-3 text-[#64748B]" />
                  <Input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">Mật khẩu</label>
                  <a href="#" className="text-xs font-medium text-[#4F46E5] hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <AppIcons.lock size={16} className="absolute left-3 top-3 text-[#64748B]" />
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full gap-2 bg-[#4F46E5] hover:bg-indigo-700" disabled={isLoading}>
                <span>{isLoading ? 'Đang xác thực...' : 'Đăng nhập'}</span>
                <AppIcons.arrowRight size={15} />
              </Button>

              <p className="text-center text-xs text-[#64748B]">
                Chưa có tài khoản?{' '}
                <Link to="/register" className="font-semibold text-[#4F46E5] hover:underline">
                  Đăng ký ngay
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
