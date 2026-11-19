import React, { forwardRef, useState, useEffect } from 'react';
import { useBrand } from '@/contexts/BrandContext';
import {
  // Section A: System Controls & Utilities
  RefreshCw,
  Download,
  Search,

  // Section B: Admin Portal Sidebar Icons
  Activity,
  ShieldCheck,
  Building2,
  FileClock,
  Database,
  Cpu,

  // Section C: User Workspace Sidebar Icons
  Sparkles,
  Kanban,
  Calendar,
  GitFork,
  Layers,
  BarChart2,

  // Section D: In-Page Workflow & Status Icons
  AlertTriangle,
  CheckCircle2,
  FileUp,
  SlidersHorizontal,
  Lock,
  Clock,
  Plus,
  ChevronDown,

  // Additional Nav & System Icons
  X,
  ChevronRight,
  ChevronLeft,
  Trash2,
  FileText,
  FileCode,
  FileCheck2,
  Presentation,
  Video,
  Users,
  LogOut,
  Bell,
  User,
  Mail,
  ArrowRight,
  AlertCircle,
  UserCheck,
  Shield,
  ShieldAlert,
  Code2,
  Edit,
  Filter,
  CheckSquare,
  FolderKanban,
  UserCircle,
  LayoutDashboard,
  CheckCircle,
  Eye,
  EyeOff,
  Check,
  Bookmark,
  Trophy,
  Target,
  Gauge,
  Network,
  UploadCloud,
  LifeBuoy,
  Workflow,
  ArrowLeft,
  FileSpreadsheet,
  Bot,
  Server,
  Terminal,
  Zap,
  Play,
  RotateCcw,
  FolderTree,
  Sliders,
  Share2,
  Unlock,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

/**
 * Interface cho icon với vector specs chuẩn
 */
export interface IconProps extends Omit<LucideProps, 'ref'> {
  size?: number | string;
  strokeWidth?: number | string;
  className?: string;
}

/**
 * Helper withDefaultSpec: Khóa cứng strokeWidth = 1.5 và size mặc định = 16px
 * cho toàn bộ hệ thống icon Smart Workspace.
 */
export function withDefaultSpec(IconComponent: LucideIcon) {
  const WrappedIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { size = 16, strokeWidth = 1.5, ...rest } = props;
    return <IconComponent ref={ref} size={size} strokeWidth={strokeWidth} {...rest} />;
  });
  WrappedIcon.displayName = `AppIcon(${IconComponent.displayName || IconComponent.name || 'Icon'})`;
  return WrappedIcon;
}

export interface BrandLogoMarkProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  src?: string | null;
  alt?: string;
  disableRemote?: boolean;
}

/**
 * BrandLogoMark:
 * Khối logo thương hiệu động 28x28px (w-7 h-7 rounded-md).
 * - Tự động tải Logo động từ Cloudinary SDK (Backend) khi được cung cấp.
 * - Tuyệt đối không hardcode URL Cloudinary.
 * - Graceful Fallback: Tự động hiển thị logo vector 3D Mobius Ribbon "SW"
 *   nền gradient Royal Indigo (#4F46E5) sang Electric Cyan (#06B6D4) khi ảnh lỗi,
 *   đang tải, hoặc backend chưa upload logo. Đảm bảo Zero Layout Shift.
 */
export const BrandLogoMark: React.FC<BrandLogoMarkProps> = ({
  className = '',
  size = 28,
  src,
  alt = 'Smart Workspace Brand Logo',
  disableRemote = false,
  ...props
}) => {
  const { logoUrl: remoteLogoUrl } = useBrand();
  const activeLogoUrl = src !== undefined ? src : (disableRemote ? null : remoteLogoUrl);
  const [hasImgError, setHasImgError] = useState<boolean>(false);

  useEffect(() => {
    setHasImgError(false);
  }, [activeLogoUrl]);

  const showImage = Boolean(activeLogoUrl && !hasImgError);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-md overflow-hidden select-none ${
        showImage ? 'bg-transparent' : 'bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] shadow-xs'
      } ${className}`}
      style={{ width: size, height: size }}
      aria-label={alt}
      {...props}
    >
      {showImage ? (
        <img
          src={activeLogoUrl!}
          alt={alt}
          className="w-full h-full object-contain rounded-md transition-opacity duration-200"
          onError={() => setHasImgError(true)}
          loading="eager"
        />
      ) : (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[18px] h-[18px] text-white"
          aria-hidden="true"
        >
          {/* Mobius Ribbon Loop S-W Interlock */}
          <path
            d="M9.5 8.5C6.5 8.5 5 10.5 5 12.5C5 15.5 8.5 16 10 18.5C11 20 9.8 21.5 8 21.5C6 21.5 5.2 20 5.2 20"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 18.5C11.5 15 14 9.5 16.5 9.5C18 9.5 19 11.5 19.5 14L21 21L23 9.5"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

/**
 * Single Source of Truth (SSOT) Icon Registry cho toàn bộ dự án Smart Workspace.
 * Ánh xạ chuẩn xác theo Master Lucide Iconography Reference Sheet (Frame 00).
 */
export const AppIcons = {
  // ==========================================
  // Section A: Brand Logo Mark & System Controls
  // ==========================================
  refresh: withDefaultSpec(RefreshCw),          // #02 CONTROL: Làm Mới & Đồng Bộ AI (#475569)
  download: withDefaultSpec(Download),          // #03 ACTION: Xuất Báo Cáo CSV (#09090B)
  search: withDefaultSpec(Search),              // #04 UTILITY: Tìm Kiếm Nhanh (#71717A)

  // ==========================================
  // Section B: Admin Portal Sidebar Icons (Frames 01-05B)
  // ==========================================
  adminMonitor: withDefaultSpec(Activity),      // 01 ADMIN: Giám Sát Tài Nguyên
  adminRbac: withDefaultSpec(ShieldCheck),      // 02 ADMIN: Phân Quyền RBAC
  adminOrg: withDefaultSpec(Building2),         // 03 ADMIN: Tổ Chức & Không Gian
  adminAudit: withDefaultSpec(FileClock),       // 04 ADMIN: Nhật Ký Audit Log
  adminRag: withDefaultSpec(Database),          // 05 ADMIN: Thuật Toán & RAG
  adminAgent: withDefaultSpec(Cpu),             // 05B ADMIN: Multi-Agent & Prompt

  // ==========================================
  // Section C: User Workspace Sidebar Icons (Frames 09-24)
  // ==========================================
  navAiDecompose: withDefaultSpec(Sparkles),    // 01 USER: Khởi Tạo & Phân Rã AI
  navKanban: withDefaultSpec(Kanban),           // 02 USER: Bảng Công Việc (Kanban)
  navCalendar: withDefaultSpec(Calendar),       // 03 USER: Lịch Biểu Thích Ứng
  navDagGantt: withDefaultSpec(GitFork),        // 04 USER: Đồ Thị Mạng DAG & Gantt
  navBacklogSrs: withDefaultSpec(Layers),       // 05 USER: Backlog & Yêu Cầu SRS
  navAnalytics: withDefaultSpec(BarChart2),     // 06 USER: Hồ Sơ Năng Lực & Báo Cáo

  // ==========================================
  // Section D: In-Page Workflow & Status Icons
  // ==========================================
  criticalAlert: withDefaultSpec(AlertTriangle),// CRITICAL: Đường Găng CPM / Xung Đột (#BE123C)
  verifiedCheck: withDefaultSpec(CheckCircle2), // SUCCESS: Hoàn Tất / Pass FSM (#0D9488)
  uploadFile: withDefaultSpec(FileUp),          // INGESTION: Nạp Tài Liệu SRS (#4F46E5)
  override: withDefaultSpec(SlidersHorizontal), // OVERRIDE: Sửa Tay (Override) (#4F46E5)
  lock: withDefaultSpec(Lock),                  // GUARD: Ràng Buộc Tiên Quyết (#64748B)
  clock: withDefaultSpec(Clock),                // TIME: Thời Lượng / Slack Time (#64748B)
  plus: withDefaultSpec(Plus),                  // ADD: Thêm Tác Vụ Mới (#09090B)
  chevronDown: withDefaultSpec(ChevronDown),    // NAV: Dropdown Mở Rộng (#71717A)

  // ==========================================
  // Section E: Common Navigation & Controls
  // ==========================================
  close: withDefaultSpec(X),
  chevronRight: withDefaultSpec(ChevronRight),
  chevronLeft: withDefaultSpec(ChevronLeft),
  trash: withDefaultSpec(Trash2),
  docWord: withDefaultSpec(FileText),
  codeDiff: withDefaultSpec(FileCode),
  fileVerified: withDefaultSpec(FileCheck2),
  slides: withDefaultSpec(Presentation),
  video: withDefaultSpec(Video),
  users: withDefaultSpec(Users),

  // Codebase Compatibility Primitives
  logout: withDefaultSpec(LogOut),
  bell: withDefaultSpec(Bell),
  user: withDefaultSpec(User),
  mail: withDefaultSpec(Mail),
  arrowRight: withDefaultSpec(ArrowRight),
  alertCircle: withDefaultSpec(AlertCircle),
  userCheck: withDefaultSpec(UserCheck),
  shield: withDefaultSpec(Shield),
  shieldAlert: withDefaultSpec(ShieldAlert),
  code: withDefaultSpec(Code2),
  edit: withDefaultSpec(Edit),
  filter: withDefaultSpec(Filter),
  checkSquare: withDefaultSpec(CheckSquare),
  folderKanban: withDefaultSpec(FolderKanban),
  userCircle: withDefaultSpec(UserCircle),
  dashboard: withDefaultSpec(LayoutDashboard),
  checkCircle: withDefaultSpec(CheckCircle),
  checkCircle2: withDefaultSpec(CheckCircle2),
  calendar: withDefaultSpec(Calendar),
  eye: withDefaultSpec(Eye),
  eyeOff: withDefaultSpec(EyeOff),
  check: withDefaultSpec(Check),
  bookmark: withDefaultSpec(Bookmark),
  trophy: withDefaultSpec(Trophy),
  target: withDefaultSpec(Target),
  gauge: withDefaultSpec(Gauge),
  network: withDefaultSpec(Network),
  uploadCloud: withDefaultSpec(UploadCloud),
  support: withDefaultSpec(LifeBuoy),
  workflow: withDefaultSpec(Workflow),
  arrowLeft: withDefaultSpec(ArrowLeft),
  fileSpreadsheet: withDefaultSpec(FileSpreadsheet),
  bot: withDefaultSpec(Bot),
  server: withDefaultSpec(Server),
  zap: withDefaultSpec(Zap),
  play: withDefaultSpec(Play),
  reset: withDefaultSpec(RotateCcw),
  folderTree: withDefaultSpec(FolderTree),
  sliders: withDefaultSpec(Sliders),
  share: withDefaultSpec(Share2),
  unlock: withDefaultSpec(Unlock),
  terminal: withDefaultSpec(Terminal),
} as const;

export type AppIconName = keyof typeof AppIcons;
export default AppIcons;
