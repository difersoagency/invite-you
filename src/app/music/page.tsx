"use client"

import React, { useCallback, useEffect, useRef, useState, } from 'react'
import { Table, TableHeader, TableColumn, TableRow, TableCell, TableBody, Tooltip, Button, Spinner, } from '@nextui-org/react'
import {DeleteIcon} from './../component/icon/DeleteIcon'
import { MusicIcon, PlayIcon, UploadIcon } from '../component/icon/Icons'
import {songs} from './../data/data'
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

  const actions = (id: string) => (
    <div className="flex items-center gap-1">
      <Tooltip content="Putar">
        <button type="button" aria-label="Putar lagu" className="flex h-9 w-9 items-center justify-center rounded-lg text-base text-gold-600 hover:bg-gold-50" onClick={()=> openPlayModalWithID(id)}>
          <PlayIcon />
        </button>
      </Tooltip>
      <Tooltip color="danger" content="Hapus Lagu">
        <button type="button" aria-label="Hapus lagu" className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-danger hover:bg-red-50" onClick={() => openModalWithID(id)}>
          <DeleteIcon />
        </button>
      </Tooltip>
    </div>
  );

  const renderCell = (song: any, columnKey: React.Key, id: string) => {
    const cellValue = song[columnKey as string];

    switch (columnKey) {
      case "judul":
        return (
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-500">
              <MusicIcon />
            </span>
            <p className="text-sm font-medium">{cellValue}</p>
          </div>
        );
      case "kategori":
        return <p className="text-sm capitalize text-dark/70">{cellValue}</p>;
      case "menu":
        return actions(id);
      default:
        return cellValue;
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' placement='center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Hapus lagu?</ModalHeader>
              <ModalBody>
                <p className='text-sm text-dark/70'>Lagu ini akan dihapus dari daftar musik.</p>
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
      <Modal isOpen={isPlayModalOpen} onOpenChange={setPlayModalOpen} backdrop='blur' placement='center'>
        <ModalContent>
          {(closeModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Preview Musik</ModalHeader>
              <ModalBody>
                <audio id="audio" controls autoPlay className='w-full'>
                  <source src={streamFile} id="src" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={closeModal}>
                  Tutup
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <AppShell>
        <PageHeader eyebrow="Library" title="List Musik" description="Musik latar yang bisa dipilih untuk undangan." />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upload */}
          <section className="card h-fit p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="font-semibold">Upload Lagu Baru</h2>
            <p className="mt-0.5 text-xs text-dark/55">Format .mp3</p>

            <label
              htmlFor="upload"
              className="group mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gold-200 bg-gold-50/40 px-4 py-8 text-center transition hover:border-gold hover:bg-gold-50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-gold-500 shadow-sm transition group-hover:scale-105">
                <UploadIcon />
              </span>
              <span className="max-w-full truncate text-sm font-medium">{fileName || 'Klik untuk pilih file'}</span>
              <input type="file" accept=".mp3" id="upload" className='sr-only' onChange={handleFiles} />
            </label>

            {audioSrc && (
              <audio controls className='mt-4 w-full' ref={audioRef} src={audioSrc}>
                Your browser does not support the audio element.
              </audio>
            )}

            <button className='btn-primary mt-4 w-full' disabled={uploading} onClick={onSubmit}>
              {uploading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
              {uploading ? 'Uploading...' : 'Upload Lagu'}
            </button>
          </section>

          {/* List */}
          <div className="lg:col-span-2">
            <div className="hidden sm:block">
              <Table
                aria-label="Daftar musik"
                classNames={{ wrapper: 'card p-2 shadow-soft', th: 'bg-gold-50 text-dark/70 text-xs uppercase tracking-wide' }}
              >
                <TableHeader columns={songs}>
                  {(column: any) => (
                    <TableColumn key={column.uid} align={column.uid === "menu" ? "center" : "start"}>
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={musicList} isLoading={loading} loadingContent={<Spinner color="warning" />} emptyContent={loading ? ' ' : 'Belum ada lagu.'}>
                  {(item: any) => (
                    <TableRow key={item.id}>
                      {(columnKey) => <TableCell>{renderCell(item, columnKey,item.id)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col gap-3 sm:hidden">
              {loading ? (
                <div className="card flex justify-center p-10"><Spinner color="warning" /></div>
              ) : musicList.length === 0 ? (
                <div className="card p-8 text-center text-sm text-dark/55">Belum ada lagu.</div>
              ) : (
                musicList.map((item: any) => (
                  <div key={item.id} className="card flex items-center justify-between gap-3 p-3">
                    <div className="min-w-0">
                      {renderCell(item, 'judul', item.id)}
                      <p className="ml-12 text-xs capitalize text-dark/50">{item.kategori}</p>
                    </div>
                    {actions(item.id)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </AppShell>
      <ToastContainer position="top-center"></ToastContainer>
    </>
  )
}
