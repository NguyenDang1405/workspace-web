import React from 'react';
import { SplitAuthPage } from './split-auth-page';

export const RegisterPage: React.FC = () => {
  return <SplitAuthPage defaultMode="register" />;
};

export default RegisterPage;
