import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';

export interface BrandContextType {
  logoUrl: string | null;
  brandName: string;
  publicId?: string;
  version?: number | string;
  updatedAt?: string;
  isLoading: boolean;
  refreshBranding: () => Promise<void>;
  updateLogo: (file: File | string) => Promise<boolean>;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [brandName, setBrandName] = useState<string>('Smart Workspace');
  const [publicId, setPublicId] = useState<string | undefined>('smart-workspace/brand/system-logo');
  const [version, setVersion] = useState<number | string | undefined>(undefined);
  const [updatedAt, setUpdatedAt] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBranding = useCallback(async () => {
    try {
      setIsLoading(true);
      // Gọi API v1 cấp phát động từ Cloudinary SDK Backend
      // Tuyệt đối không hardcode link Cloudinary
      let response;
      try {
        response = await apiClient.get('/v1/system/branding', { timeout: 4000 });
      } catch {
        // Fallback đường dẫn phụ nếu chạy qua proxy
        response = await apiClient.get('/system/brand', { timeout: 4000 });
      }

      const data = response?.data?.data || response?.data;
      if (data && typeof data === 'object') {
        setLogoUrl(data.logoUrl || null);
        setBrandName(data.brandName || 'Smart Workspace');
        if (data.publicId) setPublicId(data.publicId);
        if (data.version) setVersion(data.version);
        if (data.updatedAt) setUpdatedAt(data.updatedAt);
      }
    } catch (err) {
      // Fallback an toàn: nếu Backend chưa chạy hoặc chưa cấu hình Cloudinary,
      // logoUrl vẫn là null để <BrandLogoMark /> tự động render SVG Mobius Ribbon
      console.warn('[BrandContext] Unable to load dynamic brand assets from API, using vector fallback.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranding();
  }, [fetchBranding]);

  const refreshBranding = useCallback(async () => {
    await fetchBranding();
  }, [fetchBranding]);

  const updateLogo = useCallback(async (file: File | string): Promise<boolean> => {
    try {
      setIsLoading(true);
      let response;

      if (file instanceof File) {
        const formData = new FormData();
        formData.append('file', file);
        response = await apiClient.post('/v1/admin/branding/logo', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await apiClient.post('/v1/admin/branding/logo', { file });
      }

      if (response?.data?.success && response.data.logoUrl) {
        setLogoUrl(response.data.logoUrl);
        if (response.data.version) setVersion(response.data.version);
        if (response.data.updatedAt) setUpdatedAt(response.data.updatedAt);
        return true;
      }
      return false;
    } catch (error) {
      console.error('[BrandContext] Failed to upload new brand logo:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <BrandContext.Provider
      value={{
        logoUrl,
        brandName,
        publicId,
        version,
        updatedAt,
        isLoading,
        refreshBranding,
        updateLogo,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export function useBrand(): BrandContextType {
  const context = useContext(BrandContext);
  if (!context) {
    // Graceful fallback nếu component được render ngoài BrandProvider
    return {
      logoUrl: null,
      brandName: 'Smart Workspace',
      publicId: 'smart-workspace/brand/system-logo',
      isLoading: false,
      refreshBranding: async () => {},
      updateLogo: async () => false,
    };
  }
  return context;
}

export default BrandContext;
