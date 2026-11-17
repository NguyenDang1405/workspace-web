import React from 'react';
import { SplitAuthPage } from './split-auth-page';

export const LoginPage: React.FC = () => {
  return <SplitAuthPage defaultMode="login" />;
};

export default LoginPage;
