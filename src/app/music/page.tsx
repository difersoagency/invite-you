"use client"

import React, { useCallback, useEffect, useRef, useState, } from 'react'
import { Button, Spinner, } from '@nextui-org/react'
import {DeleteIcon} from './../component/icon/DeleteIcon'
import { PlayIcon, UploadIcon } from '../component/icon/Icons'
import axios from 'axios'
import { deleteMusic, getMusicList } from '../../../services/manage'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import AppShell from '../component/ui/AppShell'
import PageHeader from '../component/ui/PageHeader'

export default  function Music() {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [isPlayModalOpen, setPlayModalOpen] = useState(false);
  const [musicList, setMusiclist] = useState<any[]>([]);
  const [idHapus, setIdHapus] = useState('');
  const [streamFile, setStreamFile] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [audioFile, setAudioFile] = useState<any>('');
  const [fileName, setFileName] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  const getMusicListAPI = useCallback( async () =>{
    const data = await getMusicList()
    setMusiclist(data.data || [])
    setLoading(false)

    if(data.status > 300 ){
      toast.error(data.message)
    }
  },[])

  useEffect(()=>{
    getMusicListAPI()
  },[getMusicListAPI])

  const ROOT_API = process.env.NEXT_PUBLIC_API;
  const openPlayModalWithID = (id: string) => {
    setPlayModalOpen(true);
    setStreamFile(`${ROOT_API}/music/detail/${id}`);
  };

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files.length) return;
    setAudioFile(files);
    setFileName(files[0].name);
    setAudioSrc(URL.createObjectURL(files[0]));
    if(audioRef.current){
      audioRef.current.load();
    }
  };

  const openModalWithID = (id: string) => {
    setIdHapus(id);
    onOpen();
  };

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  };

  const onSubmit =  async () => {
    setUploading(true);
    if(audioFile == ''){
      toast.error('Pilih file lagu terlebih dahulu');
      setUploading(false);
      return
    }
    try {
      const response = await axios.post(`${ROOT_API}/music/store`, audioFile, config);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Berhasil di Upload");
        setAudioFile('');
        setAudioSrc('');
        setFileName('');
        getMusicListAPI();
      } else {
        toast.error((response as any).message);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Gagal upload lagu');
    }
    setUploading(false);
  }

  const hapusHandler = async () => {
    setDeleting(true);
    try {
      const response = await deleteMusic(idHapus);

      if (response.status >= 200 && response.status < 300) {
          onClose();
          toast.success("Berhasil di Hapus");
          getMusicListAPI();
      } else {
          toast.error(response.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal di Hapus');
    }
    setDeleting(false);
  }

  const actionBtn = "inline-flex h-8 w-8 items-center justify-center rounded-md text-base text-ink/45 transition-colors hover:bg-ivory hover:text-ink";

  const actions = (id: string) => (
    <div className="flex shrink-0 items-center gap-0.5">
      <button type="button" title="Putar" aria-label="Putar lagu" className={actionBtn} onClick={()=> openPlayModalWithID(id)}>
        <PlayIcon className="h-3.5 w-3.5" />
      </button>
      <button type="button" title="Hapus" aria-label="Hapus lagu" className={`${actionBtn} hover:!text-red-600`} onClick={() => openModalWithID(id)}>
        <DeleteIcon />
      </button>
    </div>
  );

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center' radius='sm'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-display text-xl">Hapus lagu ini?</ModalHeader>
              <ModalBody>
                <p className='text-sm text-ink/60'>Lagu yang masih dipakai undangan tidak bisa dihapus.</p>
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
      <Modal isOpen={isPlayModalOpen} onOpenChange={setPlayModalOpen} placement='center' radius='sm'>
        <ModalContent>
          {(closeModal) => (
            <>
              <ModalHeader className="font-display text-xl">Putar lagu</ModalHeader>
              <ModalBody>
                <audio id="audio" controls autoPlay className='w-full'>
                  <source src={streamFile} id="src" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" radius='sm' onPress={closeModal}>
                  Tutup
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <AppShell>
        <PageHeader title="Musik" description="Lagu latar yang bisa dipilih saat membuat undangan." />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          {/* List */}
          <div className="order-2 lg:order-1">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-[15px] font-semibold">Daftar lagu</h2>
              {!loading && <span className="text-xs text-ink/45">{musicList.length} lagu</span>}
            </div>
            {loading ? (
              <div className="card flex justify-center py-16"><Spinner color="default" size="sm" /></div>
            ) : musicList.length === 0 ? (
              <div className="card px-6 py-14 text-center text-sm text-ink/55">Belum ada lagu.</div>
            ) : (
              <ol className="card divide-y divide-line">
                {musicList.map((item: any, i: number) => (
                  <li key={item.id} className="flex items-center gap-4 px-4 py-3 sm:px-5">
                    <span className="w-6 shrink-0 text-xs tabular-nums text-ink/35">{String(i + 1).padStart(2, '0')}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.judul}</p>
                      <p className="text-xs capitalize text-ink/45">{item.kategori}</p>
                    </div>
                    {actions(item.id)}
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* Upload */}
          <section className="order-1 h-fit lg:order-2 lg:sticky lg:top-24">
            <h2 className="mb-3 text-[15px] font-semibold">Tambah lagu</h2>
            <div className="card p-4">
              <label
                htmlFor="upload"
                className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-ink/20 bg-ivory px-4 py-4 transition-colors hover:border-ink"
              >
                <UploadIcon className="h-5 w-5 shrink-0 text-ink/50" />
                <span className="min-w-0 text-sm">
                  <span className="block truncate font-medium underline decoration-gold decoration-2 underline-offset-4">{fileName || 'Pilih file .mp3'}</span>
                </span>
                <input type="file" accept=".mp3" id="upload" className='sr-only' onChange={handleFiles} />
              </label>

              {audioSrc && (
                <audio controls className='mt-3 w-full' ref={audioRef} src={audioSrc}>
                  Your browser does not support the audio element.
                </audio>
              )}

              <button className='btn-primary mt-3 w-full' disabled={uploading} onClick={onSubmit}>
                {uploading && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
                {uploading ? 'Mengupload...' : 'Upload'}
              </button>
            </div>
          </section>
        </div>
      </AppShell>
      <ToastContainer position="top-center" hideProgressBar theme="dark"></ToastContainer>
    </>
  )
}
