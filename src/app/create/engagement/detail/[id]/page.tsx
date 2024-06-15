"use client"

import HeadDashboard from '@/app/dashboard/HeadDashboard'
import React, { useCallback, useEffect, useState } from 'react'
import stepList from '../../../stepList'
import FieldText from '@/app/component/FieldText'
import FieldDetail from '@/app/component/FieldDetail'
import { MenuItem, Select, SelectItem } from '@nextui-org/react'
import { songs } from '@/app/data/data'
import { storeUndangan } from '../../../../../../services/auth'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { getMusicList, getProjectDetail } from '../../../../../../services/manage'


export default function Page({params}:{ params: {id:string}}) {

    const [defaultMusik, setdefaultMusik] = useState([]);
  
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const [musicList, setMusiclist] = useState([]);
    const [namaPasangan , setNamapasangan] = useState("")
    const [musik , setMusik] = useState()
    const [gambarUtama , setGambarutama] = useState("")
    const [gambarUtamaView, setGambarutamaView] = useState(null)
    const [gambarCover , setGambarcover] = useState("")
    const [gambarCoverView , setGambarcoverView] = useState(null)
    const [kataPengantar , setKatapengantar] = useState("")
    const [pesan , setPesan] = useState("")
    //Pria
    const [namaPria , setNamapria] = useState("")
    const [namaLengkapPria , setNamalengkappria] = useState("")
    const [ayahPria , setAyahpria] = useState("")
    const [ibuPria , setIbupria] = useState("")
    const [fotoPria , setFotopria] = useState("")
    const [fotoPriaView , setFotopriaView] = useState(null)
    //Wanita
    const [namaWanita , setNamawanita] = useState("")
    const [namaLengkapWanita , setNamalengkapwanita] = useState("")
    const [ayahWanita , setAyahwanita] = useState("")
    const [ibuWanita , setIbuwanita] = useState("")
    const [fotoWanita , setFotowanita] = useState("")
    const [fotoWanitaView , setFotowanitaView] = useState(null)
    //Data Akad
    const [alamatResepsi , setAlamatresepsi] = useState("")
    const [tglResepsi , setTglresepsi] = useState("")
    const [waktuResepsi , setWakturesepsi] = useState("")
    //Tambahan
    const [gallery,setGallery] = useState([]);
    const [galleryView,setGalleryView] = useState([]);
    const [galleryViewRecent,setGalleryViewRecent] = useState([]);
    const config = {
        headers: {
          'content-type': 'multipart/form-data',
        }
      };


const getProjectDetailAPI = useCallback(async (id) =>{
    const data = await getProjectDetail(id)
    if(data.status > 300 ){
        toast.error(data.data.message)
      }
    // setProjectDetail(data)
    setNamapasangan(data.data.namaPasangan)
    setMusiclist(data.data.musicList)
    setMusik(data.data.musik)
    setdefaultMusik([data.data.musik])
    setGambarutama(data.data.gambarUtama)
    setGambarutamaView(data.data.gambarUtamaView)
    setGambarcover(data.data.gambarCover)
    setGambarcoverView(data.data.gambarCoverView)
    setKatapengantar(data.data.kataPengantar)
    setPesan(data.data.pesan)
     //*Pria
     setNamapria(data.data.namaPria)
     setNamalengkappria(data.data.namaLengkapPria)
     setAyahpria(data.data.ayahPria)
     setIbupria(data.data.ibuPria)
     setFotopria(data.data.fotoPria)
     setFotopriaView(data.data.fotoPriaView)
      //*Wanita
      setNamawanita(data.data.namaWanita)
      setNamalengkapwanita(data.data.namaLengkapWanita)
      setAyahwanita(data.data.ayahWanita)
      setIbuwanita(data.data.ibuWanita)
      setFotowanita(data.data.fotoWanita)
      setFotowanitaView(data.data.fotoWanitaView)
    //Data Akad
    setAlamatresepsi(data.data.alamatResepsi)
    setTglresepsi(data.data.tglResepsi)
    setWakturesepsi(data.data.waktuResepsi)
      //Tambahan
      setGalleryViewRecent(data.data.galleryView)
      setGallery(data.data.galleryView)
    
    
   },[])


    useEffect(()=>{
      if(params.id) {
        getProjectDetailAPI(params.id)
        
       
      }else{
        console.log('error')
      }
    },[params.id])
   
    const onSubmit = async () => {
        setUploading(true);
        if(namaPasangan == '' || musik == '' || gambarUtama == '' || gambarCover == '' || namaPria == '' ||
        kataPengantar == '' || namaLengkapPria == '' || ayahPria == '' || ibuPria == '' || fotoPria == '' ||
        namaWanita == '' || namaLengkapWanita == '' || ayahWanita == '' || ibuWanita == '' || fotoWanita == '' ||
        alamatResepsi == '' || tglResepsi == '' || waktuResepsi == ''|| gallery.length === 0
        ){
            toast.error('Lengkapi Form')
            setUploading(false);
        }else{
        const undanganFormStr = localStorage.getItem('undanganForm');
        const undanganForm = JSON.parse(undanganFormStr);

    const formData = new FormData();
    formData.append('namaKlien', undanganForm.namaKlien);
    formData.append('emailKlien', undanganForm.emailKlien);
    formData.append('acara', undanganForm.acara);
    formData.append('template', undanganForm.template);
    formData.append('namaPasangan', namaPasangan);
    formData.append('musik', musik);
    formData.append('gambarUtama', gambarUtama);
    formData.append('gambarCover', gambarCover);
    formData.append('namaPria', namaPria);
    formData.append('kataPengantar', kataPengantar);
    formData.append('pesan', pesan);
    formData.append('namaLengkapPria', namaLengkapPria);
    formData.append('ayahPria', ayahPria);
    formData.append('ibuPria', ibuPria);
    formData.append('fotoPria', fotoPria);
    formData.append('namaWanita', namaWanita);
    formData.append('namaLengkapWanita', namaLengkapWanita);
    formData.append('ayahWanita', ayahWanita);
    formData.append('ibuWanita', ibuWanita);
    formData.append('fotoWanita', fotoWanita);
    formData.append('alamatResepsi', alamatResepsi);
    formData.append('tglResepsi', tglResepsi);
    formData.append('waktuResepsi', waktuResepsi);

    for (let i = 0; i < gallery.length; i++) {
      formData.append('gallery[]', gallery[i]);
    }
            try {
                const response = await axios.post(`${ROOT_API}/project/update/${params.id}`, formData, config);
                
                if (response.status >= 200 && response.status < 300) {
                    localStorage.removeItem("undanganForm");
                    toast.success("Berhasil di Upload",
                    {   
                        onClose: () => {
                        setTimeout(()=>{
                            router.push('/dashboard');
                        },500)
                    }
                    });
                 
                } else {
                    toast.error('Gagal di Publish');
                    setUploading(false);
                }
            } catch (error) {
                toast.error('Gagal di Publish');
                setUploading(false);
            }
    }
       
    }


    const handleChange = (event) => {
        const value = event.target.value;
        setMusik(value);
        setdefaultMusik([value]);
      };

  return (
    <>
    <section>
        <HeadDashboard/>

        <div className='px-10 py-7'>
            {/* Step Navigator */}
            {/* {stepList()} */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 py-10'>
                    <FieldDetail usefor='pasangan' label='Nama Pasangan' desc='Tuliskan Nama Pasangan' placeholder='Pria & Wanita' type='text' value={namaPasangan} onChange={setNamapasangan}/>

                    <div>
                        <label htmlFor='pengantar' className='font-bold text-left text-xs'>Musik</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Pilih Musik yang ingin Anda gunakan</p>
                        <Select label='Musik Pilihan'   selectionMode="single" selectedKeys={defaultMusik}  value={musik} onChange={handleChange} >
                            {musicList.map((music) => (
                                <SelectItem key={music.id} value={music.id}  >
                                    {music.judul}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <label htmlFor='pesan' className='font-bold text-left text-xs'>Gambar Utama</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Upload dan Masukkan Gambar Utama undangan Anda</p>
                        <input type="file" className='utama-pict text-xs'  
                        onChange={(event) => {
                            setGambarutamaView(URL.createObjectURL(event.target.files[0]))
                                    return setGambarutama(event.target.files[0])    
                                }} />
                         {gambarUtamaView ? 
                        <div className='mt-10 border border-gold border-dotted px-6 py-4 rounded-lg '>
                            <label htmlFor='pesan' className='font-bold text-left text-xs'>Image Preview</label>

                            <div className='w-fit mt-4'>
                                <img src={gambarUtamaView} alt=""  width={200} height={200}/>
                            </div>
                        </div> : ''
                        }
                    </div>

                    <div>
                        <label htmlFor='pesan' className='font-bold text-left text-xs'>Gambar Cover</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Upload dan Masukkan Gambar Cover undangan Anda</p>
                        <input type="file" className='cover-pict text-xs' 
                        onChange={(event) => {
                            setGambarcoverView(URL.createObjectURL(event.target.files[0]))
                            return setGambarcover(event.target.files[0])    
                        }} 
                        />
                        {gambarCoverView ? 
                        <div className='mt-10 border border-gold border-dotted px-6 py-4 rounded-lg '>
                            <label htmlFor='pesan' className='font-bold text-left text-xs'>Image Preview</label>

                            <div className='w-fit mt-4'>
                                <img src={gambarCoverView} alt=""  width={200} height={200}/>
                            </div>
                        </div>
                        : ''}
                    </div>

                    <div className='col-span-2 border border-gold px-8 py-5'>
                        <label htmlFor='pesan' className='font-bold text-left text-xs'>Upload Foto Gallery</label>
                        <br /><br />
                        <input type="file" name="" id="" className='text-xs' multiple onChange={(event) => {
                             const files = Array.from(event.target.files);
                                 setGalleryView(files)
                                return setGallery(files)
                        }} />
                        {galleryView.length > 0 ? 
                        <div className='mt-10 border border-gold border-dotted px-6 py-4 rounded-lg '>

                            <label htmlFor='pesan' className='font-bold text-left text-xs'>Image Preview</label>

                            <div className='grid grid-cols-6 gap-6'>
                            {galleryView.map((file, index) => (
                  <img key={index} src={URL.createObjectURL(file)} alt={`Preview ${index}`} width={200} height={200}/>
            ))}
                              
                              
                            </div>

                        </div>
                    : 
                    <div className='mt-10 border border-gold border-dotted px-6 py-4 rounded-lg '>

                    <label htmlFor='pesan' className='font-bold text-left text-xs'>Image Preview</label>

                    <div className='grid grid-cols-6 gap-6'>
                    {galleryViewRecent.map((file, index) => (
          <img key={index} src={file} alt={`Preview ${index}`} width={200} height={200}/>
    ))}
                      
                      
                    </div>

                </div>
                    }
                    </div>

                    <div>
                        <label htmlFor='pengantar' className='font-bold text-left text-xs'>Kata Pengantar</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Tuliskan Kata Kata Pengantar Anda</p>
                        <textarea name="pengantar" id="pengantar" value={kataPengantar} onChange={(event) => setKatapengantar(event.target.value)}  className='border-2 border-gold px-3 py-2 text-xs rounded-lg w-full md:w-2/3' rows={10}></textarea>
                    </div>

                    <div>
                        <label htmlFor='pesan' className='font-bold text-left text-xs'>Pesan - Pesan (Optional)</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Tuliskan pesan - pesan Anda untuk tamu undangan</p>
                        <textarea name="pesan" id="pesan" value={pesan} onChange={(event) => setPesan(event.target.value)}  className='border-2 border-gold px-3 py-2 text-xs rounded-lg w-full md:w-2/3' rows={10}></textarea>
                    </div>

                    

                    <div className='py-5'>
                        <h2 className='text-dark font-bold mb-5'>Data Pria</h2>

                        <div className=' px-6 py-7 border border-gold flex flex-col gap-7 w-full md:w-4/5'>
                            <FieldDetail usefor='pria' label='Nama Pria' desc='' placeholder='Nama Pria' type='text' value={namaPria} onChange={setNamapria}/>

                            <FieldDetail usefor='pria-lengkap' label='Nama Lengkap Pria' desc='' placeholder='Nama Lengkap Pria' type='text' value={namaLengkapPria} onChange={setNamalengkappria}/>

                            <FieldDetail usefor='ayah-pria' label='Nama Ayah (Pria)' desc='' placeholder='Nama Ayah Pria' type='text' value={ayahPria} onChange={setAyahpria} />

                            <FieldDetail usefor='ibu-pria' label='Nama Ibu (Pria)' desc='' placeholder='Nama Ibu Pria' type='text' value={ibuPria} onChange={setIbupria} />

                            <div>
                                <label htmlFor='pesan' className='font-bold text-left text-xs'>Foto Pria</label>
                                <p className='text-gray text-[0.6rem] mb-2 '>Masukkan Foto Pria</p>
                                <input type="file" className='p-pict text-xs' 
                                onChange={(event) => {
                                    setFotopriaView(URL.createObjectURL(event.target.files[0]))
                                    return setFotopria(event.target.files[0])
                            
                                }}
                                
                                />
                                {fotoPriaView ? 
                                <div className='mt-10 border border-gold border-dotted px-6 py-4 rounded-lg '>
                             <label htmlFor='pesan' className='font-bold text-left text-xs'>Image Preview</label>

                                <div className='w-fit mt-4'>
                                <img src={fotoPriaView} alt="" width={200} height={200} />
                            </div>
                        </div>
                       : '' }
                            </div>
                        </div>

                        
                    </div>

                    <div className='py-5'>
                        <h2 className='text-dark font-bold  mb-5'>Data Wanita</h2>

                        <div className=' px-6 py-7 border border-gold flex flex-col gap-7 w-full md:w-4/5'>
                            <FieldDetail usefor='wanita'  value={namaWanita} onChange={setNamawanita} label='Nama wanita' desc='' placeholder='Nama wanita' type='text' />

                            <FieldDetail usefor='wanita-lengkap' value={namaLengkapWanita} onChange={setNamalengkapwanita} label='Nama Lengkap wanita' desc='' placeholder='Nama Lengkap Wanita' type='text' />

                            <FieldDetail usefor='ayah-wanita'  value={ayahWanita} onChange={setAyahwanita} label='Nama Ayah (Wanita)' desc='' placeholder='Nama Ayah Wanita' type='text' />

                            <FieldDetail usefor='ibu-wanita' value={ibuWanita} onChange={setIbuwanita} label='Nama Ibu (Wanita)' desc='' placeholder='Nama Ibu Wanita' type='text' />

                            <div>
                                <label htmlFor='pesan' className='font-bold text-left text-xs'>Foto Wanita</label>
                                <p className='text-gray text-[0.6rem] mb-2 '>Masukkan Foto Wanita</p>
                                <input type="file" className='w-pict text-xs' 
                                  onChange={(event) => {
                                    setFotowanitaView(URL.createObjectURL(event.target.files[0]))
                                    return setFotowanita(event.target.files[0])
                            
                                }}
                                />
                                 {fotoWanitaView ? 
                                <div className='mt-10 border border-gold border-dotted px-6 py-4 rounded-lg '>
                             <label htmlFor='pesan' className='font-bold text-left text-xs'>Image Preview</label>

                                <div className='w-fit mt-4'>
                                <img src={fotoWanitaView} alt=""  width={200} height={200}/>
                            </div>
                        </div>
                       : '' }
                            </div>
                        </div>
                    </div>

                    <div className='py-5'>
                        <h2 className='text-dark font-bold  mb-5'>Data Akad / Pemberkatan</h2>

                        <div className=' px-6 py-7 border border-gold flex flex-col gap-7 w-full md:w-4/5'>
                            <FieldDetail usefor='alamat' label='Alamat Resepsi' desc='' placeholder='Alamat Resepsi' type='text' value={alamatResepsi} onChange={setAlamatresepsi} />

                            <FieldDetail usefor='tanggal' label='Tanggal Resepsi' desc='' placeholder='Tanggal / Bulan / Tahun' type='date' value={tglResepsi} onChange={setTglresepsi} />

                            <FieldDetail usefor='waktu' label='Waktu Resepsi' desc='' placeholder='Waktu Resepsi' type='time' value={waktuResepsi} onChange={setWakturesepsi} />

                        </div>
                    </div>
                </div>

            <button className='text-xs bg-gold text-dark px-6 py-2' disabled={uploading} onClick={ onSubmit }> {uploading ? 'Tunggu Sebentar..' : 'Publish Undangan'}</button>
            
        </div>
        

    </section>
    <ToastContainer></ToastContainer>
    </>
  )
}
