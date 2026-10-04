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
    <main className="grid min-h-screen lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* Panel kiri */}
      <section className="relative hidden overflow-hidden bg-ink lg:block">
        <Image src="/bg.png" alt="" fill priority className="object-cover opacity-45" sizes="42vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink" />
        <div className="relative flex h-full flex-col justify-between p-10 text-white">
          <Image src="/logo.png" width={500} height={142} alt="Invite You" className="h-9 w-auto self-start brightness-0 invert" priority />
          <div>
            <div className="mb-5 h-px w-12 bg-gold" />
            <p className="max-w-sm font-display text-3xl leading-snug">
              Undangan digital untuk wedding, lamaran, dan ulang tahun.
            </p>
            <p className="mt-4 text-sm text-white/50">Panel admin Invite You Invitation</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="flex flex-col px-6 py-10 sm:px-10">
        <Image src="/logo.png" width={500} height={142} alt="Invite You" className="h-9 w-auto self-start lg:hidden" priority />

        <div className="flex flex-1 items-center">
          <div className="w-full max-w-sm lg:ml-[12%]">
            <h1 className="font-display text-4xl font-semibold">Masuk</h1>
            <p className="mt-2 text-sm text-ink/55">Gunakan email dan password akun admin.</p>

            <form onSubmit={loginHandler} className="mt-10 flex flex-col gap-5">
              <FieldText usefor='email' label='Email' placeholder="nama@email.com" autoComplete="email" value={email} onChange={setEmail} type="email"/>
              <FieldText
                usefor='password'
                label='Password'
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={setPassword}
                type={showPassword ? "text" : "password"}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    className="flex h-9 w-9 items-center justify-center text-lg text-ink/40 hover:text-ink"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeOpenIcon />}
                  </button>
                }
              />
              <button className="btn-primary mt-3 w-full py-3" type="submit">
                Masuk
              </button>
            </form>
          </div>
        </div>

        <p className="text-xs text-ink/35">© {new Date().getFullYear()} Invite You Invitation</p>
      </section>
    </main>
    {leaving && <LoginTransition mode="cover" onDone={() => router.replace('/dashboard')} />}
    <ToastContainer position="top-center"></ToastContainer>
    </>
  );

}
