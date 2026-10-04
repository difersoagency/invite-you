"use client"

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, } from 'react'
import { motion } from 'framer-motion'
import { Table, TableHeader, TableColumn, TableRow, TableCell, TableBody, ChipProps, Tooltip, Chip, Button, Spinner, } from '@nextui-org/react'
import {EyeIcon} from './../component/icon/EyeIcon'
import {DeleteIcon} from './../component/icon/DeleteIcon'
import {EditIcon} from './../component/icon/EditIcon'
import { CakeIcon, EnvelopeIcon, HeartIcon, PlusIcon, RingIcon, SearchIcon } from '../component/icon/Icons'
import {head, users} from './../data/data'
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

const statusColorMap: Record<string, ChipProps["color"]> ={
  soon : "warning",
  finished : "success",
}

export default  function Dashboard() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [projectList, setProjectlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
    const data = await getProjectList()
    setProjectlist(data.data || [])
    setLoading(false)

    if(data.status > 300 ){
      toast.error(data.message)
    }
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
      { label: 'Total Undangan', value: projectList.length, icon: EnvelopeIcon },
      { label: 'Wedding', value: count('wedding'), icon: HeartIcon },
      { label: 'Engagement', value: count('engagement'), icon: RingIcon },
      { label: 'Birthday', value: count('birthday'), icon: CakeIcon },
    ];
  }, [projectList]);

  const actions = (user: User, id: string) => (
    <div className="flex items-center gap-1">
      <Tooltip content="Lihat Undangan">
        <button type="button" aria-label="Lihat undangan" onClick={() => openNewTab(user.link as string)} className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-default-500 hover:bg-gold-50 hover:text-dark">
          <EyeIcon />
        </button>
      </Tooltip>
      <Tooltip content="Edit">
        <Link href={`/create/${id}`} aria-label="Edit undangan" className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-default-500 hover:bg-gold-50 hover:text-dark">
          <EditIcon />
        </Link>
      </Tooltip>
      <Tooltip color="danger" content="Hapus">
        <button type='button' aria-label="Hapus undangan" onClick={() => openModalWithID(id)} className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-danger hover:bg-red-50">
          <DeleteIcon />
        </button>
      </Tooltip>
    </div>
  );

  const renderCell = (user: User, columnKey: React.Key,  id: string) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-50 text-sm font-semibold uppercase text-gold-600">
              {String(cellValue ?? '?').charAt(0)}
            </span>
            <div className="flex flex-col">
              <p className="text-sm font-semibold capitalize">{cellValue}</p>
              <p className="text-xs text-dark/50">{user.email}</p>
            </div>
          </div>
        );
      case "acara":
        return (
          <div className="flex flex-col">
            <p className="text-sm font-medium capitalize">{cellValue}</p>
            <p className="text-xs text-gold-500 capitalize">{user.template}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return actions(user, id);
      default:
        return cellValue;
    }
  };

  const emptyText = search ? 'Tidak ada klien yang cocok dengan pencarian.' : 'Belum ada undangan. Mulai buat undangan pertama Anda.';

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' placement='center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Hapus undangan?</ModalHeader>
              <ModalBody>
                <p className='text-sm text-dark/70'>
                  Undangan ini akan dihapus secara permanen dan tidak bisa dikembalikan.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="danger" isLoading={deleting} onPress={hapusHandler}>
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
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: fromLogin ? 0.35 : 0 } } }}
        >
        <motion.div variants={fadeUp}>
        <PageHeader
          eyebrow="Dashboard"
          title="Daftar Klien"
          description="Kelola semua undangan digital klien Anda."
          actions={
            <Link href="/create" className="btn-primary w-full sm:w-auto">
              <PlusIcon /> Buat Undangan
            </Link>
          }
        />
        </motion.div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <motion.div variants={fadeUp} key={label} className="card flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-xl text-gold-500">
                <Icon />
              </span>
              <div>
                <p className="text-2xl font-semibold leading-none">{loading ? '–' : value}</p>
                <p className="mt-1 text-xs text-dark/55">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp}>
        <div className="relative mb-4 sm:max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark/40" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email, atau acara..."
            className="input-base pl-10"
          />
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <Table
            aria-label="Daftar klien"
            classNames={{ wrapper: 'card p-2 shadow-soft', th: 'bg-gold-50 text-dark/70 text-xs uppercase tracking-wide' }}
          >
            <TableHeader columns={head}>
              {(column: any) => (
                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={filtered} isLoading={loading} loadingContent={<Spinner color="warning" />} emptyContent={loading ? ' ' : emptyText}>
              {(item: any) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey,item.id)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {loading ? (
            <div className="card flex justify-center p-10"><Spinner color="warning" /></div>
          ) : filtered.length === 0 ? (
            <div className="card p-8 text-center text-sm text-dark/55">{emptyText}</div>
          ) : (
            filtered.map((item: any) => (
              <div key={item.id} className="card p-4">
                <div className="flex items-start justify-between gap-3">
                  {renderCell(item, 'name', item.id)}
                  {renderCell(item, 'status', item.id)}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-gold-100 pt-3">
                  {renderCell(item, 'acara', item.id)}
                  {actions(item, item.id)}
                </div>
              </div>
            ))
          )}
        </div>
        </motion.div>
        </motion.div>
      </AppShell>
      <ToastContainer position="top-center"></ToastContainer>
    </>
  )
}
