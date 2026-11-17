import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppIcons, BrandLogoMark } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Department, UserRole } from '@/types/user';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState<Department>('FRONTEND');
  const [role, setRole] = useState<UserRole>('MEMBER');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center">
            <BrandLogoMark size={56} className="!w-14 !h-14 !rounded-2xl shadow-xl shadow-indigo-500/20" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Smart Workspace
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Tạo tài khoản làm việc mới
          </p>
        </div>

        <Card className="border-slate-200 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl">Đăng Ký Thành Viên</CardTitle>
            <CardDescription>
              Điền đầy đủ thông tin cá nhân để gia nhập hệ thống
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Họ và Tên</label>
                <div className="relative">
                  <AppIcons.user size={16} className="absolute left-3 top-3 text-[#64748B]" />
                  <Input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Email công việc</label>
                <div className="relative">
                  <AppIcons.mail size={16} className="absolute left-3 top-3 text-[#64748B]" />
                  <Input
                    type="email"
                    required
                    placeholder="dev@workspace.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Mật khẩu</label>
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

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Phòng ban</label>
                  <div className="relative">
                    <AppIcons.adminOrg size={16} className="absolute left-3 top-3 text-[#64748B]" />
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value as Department)}
                      className="flex h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option value="FRONTEND">Frontend</option>
                      <option value="BACKEND">Backend</option>
                      <option value="FULLSTACK">Fullstack</option>
                      <option value="DEVOPS">DevOps</option>
                      <option value="QA">QA / Tester</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Vai trò</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="MEMBER">Member</option>
                    <option value="LEADER">Team Leader</option>
                    <option value="PM">Project Manager</option>
                    <option value="ADMIN">System Admin</option>
                  </select>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full gap-2 bg-[#4F46E5] hover:bg-indigo-700" disabled={isLoading}>
                <AppIcons.userCheck size={16} />
                <span>{isLoading ? 'Đang hoàn tất...' : 'Hoàn tất đăng ký'}</span>
              </Button>

              <p className="text-center text-xs text-[#64748B]">
                Đã có tài khoản?{' '}
                <Link to="/login" className="font-semibold text-[#4F46E5] hover:underline">
                  Quay lại Đăng nhập
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
