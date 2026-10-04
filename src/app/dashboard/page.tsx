"use client"

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, } from 'react'
import { motion } from 'framer-motion'
import { Button, Spinner, } from '@nextui-org/react'
import {EyeIcon} from './../component/icon/EyeIcon'
import {DeleteIcon} from './../component/icon/DeleteIcon'
import {EditIcon} from './../component/icon/EditIcon'
import { PlusIcon, SearchIcon } from '../component/icon/Icons'
import {users} from './../data/data'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { deleteProject, getProjectList } from '../../../services/manage'
import Link from 'next/link'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import AppShell from '../component/ui/AppShell'
import PageHeader from '../component/ui/PageHeader'
import LoginTransition, { LOGIN_FLAG } from '../component/ui/LoginTransition'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

type User = typeof users[0] & { link?: string };

const STATUS_LABEL: Record<string, string> = {
  soon: 'Segera',
  finished: 'Aktif',
}

export default  function Dashboard() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [projectList, setProjectlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState('');
  const [idHapus, setIdHapus] = useState('');
  const [fromLogin, setFromLogin] = useState(false);

  // Runs before paint on client navigation, so the gold overlay from the login page continues seamlessly.
  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(LOGIN_FLAG)) {
        sessionStorage.removeItem(LOGIN_FLAG);
        setFromLogin(true);
      }
    } catch {}
  }, []);

  const getProjectListAPI = useCallback( async () =>{
    setLoading(true)
    setLoadError(false)
    try {
      const data = await getProjectList()
      setProjectlist(data.data || [])
      // 5xx = backend crashed; show a friendly retry state instead of the raw PHP message
      if (data.status >= 500) {
        setLoadError(true)
      } else if (data.status > 300) {
        toast.error(data.message)
      }
    } catch {
      setLoadError(true)
    }
    setLoading(false)
  },[])

  useEffect(()=>{
    getProjectListAPI()
  },[getProjectListAPI])

  const router = useRouter();
  const token = Cookies.get('token');
  if(!token) {
    router.push('/login');
    }

  const openNewTab = (link: string) => {
    const url =  `${process.env.NEXT_PUBLIC_WEB}${link}`;
    window.open(url, '_blank');
  };

  const openModalWithID = (id: string) => {
    setIdHapus(id);
    onOpen();
  };

  const hapusHandler = async () => {
    setDeleting(true);
    try {
      const response = await deleteProject(idHapus);

      if (response.status >= 200 && response.status < 300) {
          onClose();
          toast.success("Berhasil di Hapus");
          getProjectListAPI();
      } else {
          toast.error(response.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal di Hapus');
    }
    setDeleting(false);
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projectList;
    return projectList.filter((p: any) =>
      [p.name, p.email, p.acara, p.template].some((v) => String(v ?? '').toLowerCase().includes(q))
    );
  }, [projectList, search]);

  const stats = useMemo(() => {
    const count = (acara: string) => projectList.filter((p: any) => String(p.acara).toLowerCase() === acara).length;
    return [
      { label: 'Total undangan', value: projectList.length },
      { label: 'Wedding', value: count('wedding') },
      { label: 'Engagement', value: count('engagement') },
      { label: 'Birthday', value: count('birthday') },
    ];
  }, [projectList]);

  const actionBtn = "inline-flex h-8 w-8 items-center justify-center rounded-md text-base text-ink/45 transition-colors hover:bg-ivory hover:text-ink";

  const actions = (user: User, id: string) => (
    <div className="flex items-center justify-end gap-0.5">
      <button type="button" title="Lihat undangan" aria-label="Lihat undangan" onClick={() => openNewTab(user.link as string)} className={actionBtn}>
        <EyeIcon />
      </button>
      <Link href={`/create/${id}`} title="Edit" aria-label="Edit undangan" className={actionBtn}>
        <EditIcon />
      </Link>
      <button type='button' title="Hapus" aria-label="Hapus undangan" onClick={() => openModalWithID(id)} className={`${actionBtn} hover:!text-red-600`}>
        <DeleteIcon />
      </button>
    </div>
  );

  const status = (s: string) => (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink/60">
      <span className={`h-1.5 w-1.5 rounded-full ${s === 'soon' ? 'bg-gold' : 'bg-emerald-600'}`} />
      {STATUS_LABEL[s] || s}
    </span>
  );

  const emptyText = search ? 'Tidak ada klien yang cocok.' : 'Belum ada undangan.';

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center' radius='sm'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-display text-xl">Hapus undangan ini?</ModalHeader>
              <ModalBody>
                <p className='text-sm text-ink/60'>
                  Data dan link undangan akan hilang permanen.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" radius='sm' onPress={onClose}>
                  Batal
                </Button>
                <Button color="danger" radius='sm' isLoading={deleting} onPress={hapusHandler}>
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {fromLogin && <LoginTransition mode="reveal" onDone={() => setFromLogin(false)} />}
      <AppShell>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: fromLogin ? 0.45 : 0 } } }}
        >
        <motion.div variants={fadeUp}>
        <PageHeader
          title="Klien"
          description="Semua undangan yang sudah dibuat."
          actions={
            <Link href="/create" className="btn-primary w-full sm:w-auto">
              <PlusIcon /> Buat undangan
            </Link>
          }
        />
        </motion.div>

        <motion.dl variants={fadeUp} className="mb-10 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
          {stats.map(({ label, value }, i) => (
            <div key={label} className={i === 0 ? '' : i % 2 ? 'border-l border-line pl-5' : 'sm:border-l sm:border-line sm:pl-5'}>
              <dt className="text-xs text-ink/50">{label}</dt>
              <dd className="mt-1 font-display text-4xl font-semibold tabular-nums">{loading ? '–' : value}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div variants={fadeUp}>
        <div className="relative mb-4 sm:max-w-xs">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email, acara"
            className="input-base pl-9"
          />
        </div>

        {loadError ? (
          <div className="card px-6 py-14 text-center">
            <p className="font-semibold">Daftar klien gagal dimuat</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-ink/55">Server sedang bermasalah. Coba lagi sebentar lagi, atau hubungi admin backend.</p>
            <button type="button" className="btn-outline mt-5" onClick={getProjectListAPI}>Coba lagi</button>
          </div>
        ) : loading ? (
          <div className="card flex justify-center py-16"><Spinner color="default" size="sm" /></div>
        ) : filtered.length === 0 ? (
          <div className="card px-6 py-14 text-center text-sm text-ink/55">
            {emptyText}
            {!search && <div className="mt-4"><Link href="/create" className="btn-outline">Buat undangan pertama</Link></div>}
          </div>
        ) : (<>
        {/* Desktop */}
        <div className="card hidden overflow-hidden md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs text-ink/45">
                <th className="px-5 py-3 font-medium">Klien</th>
                <th className="px-5 py-3 font-medium">Acara</th>
                <th className="px-5 py-3 font-medium">Template</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((item: any) => (
                <tr key={item.id} className="transition-colors hover:bg-ivory/60">
                  <td className="px-5 py-3.5">
                    <p className="font-medium capitalize">{item.name}</p>
                    <p className="text-xs text-ink/45">{item.email}</p>
                  </td>
                  <td className="px-5 py-3.5 capitalize">{item.acara}</td>
                  <td className="px-5 py-3.5 text-ink/60">{item.template}</td>
                  <td className="px-5 py-3.5">{status(item.status)}</td>
                  <td className="px-3 py-3.5">{actions(item, item.id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <ul className="card divide-y divide-line md:hidden">
          {filtered.map((item: any) => (
            <li key={item.id} className="px-4 py-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium capitalize">{item.name}</p>
                  <p className="truncate text-xs text-ink/45">{item.email}</p>
                </div>
                {status(item.status)}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-ink/60"><span className="capitalize">{item.acara}</span> · {item.template}</p>
                {actions(item, item.id)}
              </div>
            </li>
          ))}
        </ul>
        </>)}
        </motion.div>
        </motion.div>
      </AppShell>
      <ToastContainer position="top-center" hideProgressBar></ToastContainer>
    </>
  )
}
