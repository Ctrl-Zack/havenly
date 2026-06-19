'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/button';
import TextField from '@/components/text-field';
import Progress from '@/components/progress';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {

    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleGoogleLogin = () => {
    router.push('/dashboard');
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[#fcfee8]"
      style={{ backgroundImage: "linear-gradient(182.725deg, rgb(252, 254, 232) 76.606%, rgb(151, 152, 139) 136.03%)" }}
    >
      {/* Background Blob */}
      <div className="absolute h-[318px] left-[-81px] top-[-72px] w-[345px] pointer-events-none">
        <Image
          alt="Background decoration"
          src="/assets/login-bg-blob.svg"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Progress Bar */}
      <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-full max-w-[368px] px-4 flex justify-center z-10">
        <Progress value={1} max={6} className="w-[368px] max-w-full" />
      </div>

      {/* Main Content Container */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[104px] w-full max-w-[326px] h-auto flex flex-col gap-[64px] items-center pt-[64px] pb-[120px]">

        {/* Header and Inputs */}
        <div className="flex flex-col gap-[32px] items-center w-full">
          <div className="flex flex-col gap-[4px] items-start w-full">
            <h1 className="font-['Source_Serif_Pro',serif] font-semibold leading-[42px] text-[#1a1a1a] text-[32px] w-full">
              Begin your Haven
            </h1>
            <p className="font-['Poppins',sans-serif] leading-[18px] text-[#a5a5a5] text-[14px] w-full">
              Sign in to save your settings, or explore as a guest.
            </p>
          </div>

          <div className="flex flex-col gap-[24px] items-start w-full">
            <TextField
              label="Name"
              type="text"
              value={name}
              onChange={setName}
              placeholder="John Doe"
              hideSubmitButton={true}
              containerClassName="h-[52px] rounded-[24px] px-[12px]"
            />

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              hideSubmitButton={true}
              containerClassName="h-[52px] rounded-[24px] px-[12px]"
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="•••••••••••••"
              hideSubmitButton={true}
              containerClassName="h-[52px] rounded-[24px] px-[12px]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-[24px] items-center w-full">
          <Button
            text="Sign Up"
            variant="Dark Neutral"
            size="default"
            hasIcon={false}
            className="w-full h-[52px] rounded-[30px] font-['Poppins',sans-serif] font-semibold text-[16px]"
            onClick={handleSignUp}
          />

          <div className="flex items-center justify-between w-full opacity-60">
            <Image src="/assets/line-left.svg" alt="" width={144} height={1} className="w-[120px] h-[1px]" />
            <span className="font-['Poppins',sans-serif] text-[12px] text-[#767676] px-2">or</span>
            <Image src="/assets/line-right.svg" alt="" width={144} height={1} className="w-[120px] h-[1px]" />
          </div>

          <div className="flex flex-col gap-[16px] items-center w-full">
            <button
              onClick={handleLogin}
              className="w-full h-[52px] border-2 border-[#1a1a1a] rounded-[30px] flex items-center justify-center font-['Poppins',sans-serif] font-semibold text-[#1a1a1a] text-[16px] hover:bg-black/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              Login
            </button>

            <button
              onClick={handleGoogleLogin}
              className="w-full h-[52px] border-2 border-[#1a1a1a] rounded-[30px] flex items-center justify-center gap-[10px] hover:bg-black/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <Image
                src="/assets/google-logo.png"
                alt="Google"
                width={21}
                height={21}
                className="object-contain"
              />
              <span className="font-['Poppins',sans-serif] text-[#1a1a1a] text-[14px]">
                Continue with Google
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
