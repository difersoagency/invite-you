"use client"
import Image from "next/image";
import FieldText from "../component/FieldText";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { setLogin } from "../../../services/auth";
import Cookies from 'js-cookie';
import { EyeOffIcon, EyeOpenIcon } from "../component/icon/Icons";
import LoginTransition, { LOGIN_FLAG } from "../component/ui/LoginTransition";

export default function Login(){

  const router = useRouter();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const token = Cookies.get('token');

  if(token && !leaving) {
    router.replace('/dashboard');
    }

  const loginHandler = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const formData = {
      email,
      password
    }

    if(!email || !password){
      toast.error('Email dan Password wajib di isi')
    } else {
      const response = await setLogin(formData);
      const loginToken = response?.data?.token;
      if(response.error || !loginToken){
        toast.error(response.message && response.error ? response.message : 'Login gagal, coba lagi')
      }else{
        Cookies.set('token', loginToken, {expires : 1})
        try { sessionStorage.setItem(LOGIN_FLAG, '1') } catch {}
        router.prefetch('/dashboard');
        setLeaving(true);
      }
    }
  };

  return(
    <>
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Hero */}
      <section className="relative hidden overflow-hidden bg-dark lg:block">
        <Image src="/bg.png" alt="" fill priority className="object-cover opacity-60" sizes="50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-12 text-white">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">Invite You</p>
          <h2 className="max-w-md font-display text-4xl font-semibold leading-tight text-balance">
            Undangan digital yang elegan untuk momen berharga.
          </h2>
          <p className="mt-4 max-w-md text-sm text-white/70">
            Kelola klien, template, dan musik undangan dalam satu dashboard.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="relative flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center opacity-[0.07] lg:hidden" />
        <div className="relative w-full max-w-sm">
          <Image
            src="/logo.png"
            width={500}
            height={142}
            alt="Logo Invite You"
            className="mx-auto h-14 w-auto"
            priority
          />
          <div className="mt-8 text-center">
            <h1 className="font-display text-3xl font-semibold">Selamat datang</h1>
            <p className="mt-2 text-sm text-dark/60">Masuk untuk mengelola undangan Anda.</p>
          </div>

          <form onSubmit={loginHandler} className="card mt-8 flex flex-col gap-5 p-6 sm:p-8">
            <FieldText usefor='email' label='Email' placeholder="nama@email.com" autoComplete="email" value={email} onChange={setEmail} type="email"/>
            <FieldText
              usefor='password'
              label='Password'
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={setPassword}
              type={showPassword ? "text" : "password"}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-dark/50 hover:bg-gold-50 hover:text-dark"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeOpenIcon />}
                </button>
              }
            />
            <button className="btn-primary mt-2 w-full py-3" type="submit">
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-dark/40">© {new Date().getFullYear()} Invite You Invitation</p>
        </div>
      </section>
    </main>
    {leaving && <LoginTransition mode="cover" onDone={() => router.replace('/dashboard')} />}
    <ToastContainer position="top-center"></ToastContainer>
    </>
  );

}
