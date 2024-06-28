"use client"

import HeadDashboard from '@/app/dashboard/headDashboard'
import React, { useCallback, useEffect, useState } from 'react'
import FieldDetail from '@/app/component/FieldDetail'
import { Select, SelectItem } from '@nextui-org/react'
import { songs } from '@/app/data/data'
import { storeUndangan } from '../../../../../../services/auth'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { getMusicList, getProjectDetail } from '../../../../../../services/manage'
import Cookies from 'js-cookie'

export default function Page({params}:{ params: {id:string}}) {
    const router = useRouter();

    const token = Cookies.get('token');
    if(!token) {
      router.push('/login');
      }
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const [uploading, setUploading] = useState(false);
    const [musicList, setMusiclist] = useState([]);
    const [defaultMusik, setdefaultMusik] = useState([]);
    const [musik , setMusik] = useState("")
    const [gambarUtama , setGambarutama] = useState("")
    const [gambarUtamaView, setGambarutamaView] = useState(null)
    const [gambarCover , setGambarcover] = useState("")
    const [gambarCoverView , setGambarcoverView] = useState(null)
    const [kataPengantar , setKatapengantar] = useState("")
    //Pria
    const [namaPria , setNamapria] = useState("")
    const [namaLengkapPria , setNamalengkappria] = useState("")
    const [ayahPria , setAyahpria] = useState("")
    const [ibuPria , setIbupria] = useState("")
    const [fotoPria , setFotopria] = useState("")
    const [fotoPriaView , setFotopriaView] = useState(null)
    const [isCheckedFotoPria , setCheckedFotoPria] = useState(false)
    
    //Wanita
    const [namaWanita , setNamawanita] = useState("")
    const [namaLengkapWanita , setNamalengkapwanita] = useState("")
    const [ayahWanita , setAyahwanita] = useState("")
    const [ibuWanita , setIbuwanita] = useState("")
    const [fotoWanita , setFotowanita] = useState("")
    const [fotoWanitaView , setFotowanitaView] = useState(null)
    const [isCheckedFotoWanita , setCheckedFotoWanita] = useState(false)
    //Data Akad
    const [alamatLamaran , setAlamatlamaran] = useState("")
    const [tglLamaran , setTgllamaran] = useState("")
    const [waktuLamaran , setWaktulamaran] = useState("")
 
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
        setMusiclist(data.data.musicList)
        setMusik(data.data.musik)
        setdefaultMusik([data.data.musik])
        setGambarutama(data.data.gambarUtama)
        setGambarutamaView(data.data.gambarUtamaView)
        setGambarcover(data.data.gambarCover)
        setGambarcoverView(data.data.gambarCoverView)
        setKatapengantar(data.data.kataPengantar)
         //*Pria
         setNamapria(data.data.namaPria)
         setNamalengkappria(data.data.namaLengkapPria)
         setAyahpria(data.data.ayahPria)
         setIbupria(data.data.ibuPria)
         setFotopria(data.data.fotoPria)
         setFotopriaView(data.data.fotoPriaView)
         setCheckedFotoPria(data.data.checkedfotoPria)
          //*Wanita
          setNamawanita(data.data.namaWanita)
          setNamalengkapwanita(data.data.namaLengkapWanita)
          setAyahwanita(data.data.ayahWanita)
          setIbuwanita(data.data.ibuWanita)
          setFotowanita(data.data.fotoWanita)
          setFotowanitaView(data.data.fotoWanitaView)
          setCheckedFotoWanita(data.data.checkedfotoWanita)
        //Data Akad
        setAlamatlamaran(data.data.alamatLamaran)
        setTgllamaran(data.data.tglLamaran)
        setWaktulamaran(data.data.waktuLamaran)
        
        
        
       },[])
    
    
        useEffect(()=>{
          if(params.id) {
            getProjectDetailAPI(params.id)
            
           
          }else{
            console.log('error')
          }
        },[params.id])

        const handleChange = (event) => {
            const value = event.target.value;
            setMusik(value);
            setdefaultMusik([value]);
          };
    
     

    const onSubmit = async () => {
     setUploading(true);
        if(
          musik == ''  || gambarUtama == '' || gambarCover == '' || namaPria == '' ||
        kataPengantar == '' || namaLengkapPria == '' || ayahPria == '' || ibuPria == '' || (fotoPria == '' && isCheckedFotoPria) ||
        namaWanita == '' || namaLengkapWanita == '' || ayahWanita == '' || ibuWanita == '' || (fotoWanita == '' && isCheckedFotoWanita) ||
        alamatLamaran == '' || tglLamaran == '' || waktuLamaran == ''
       
        ){
            toast.error('Lengkapi Form')
       setUploading(false);
        }else{
       
       
    const formData = new FormData();

    if (typeof window !== "undefined") {
               
        const undanganFormStr = localStorage.getItem('undanganForm');
        const undanganForm = JSON.parse(undanganFormStr);
      
        formData.append('namaKlien', undanganForm.namaKlien);
        formData.append('emailKlien', undanganForm.emailKlien);
        formData.append('acara', undanganForm.acara);
        formData.append('template', undanganForm.template);
     
      } else {
        
        console.warn('localStorage is not available');
      }


   
    formData.append('musik', musik);
    formData.append('gambarUtama', gambarUtama);
    formData.append('gambarCover', gambarCover);
    formData.append('namaPria', namaPria);
    formData.append('kataPengantar', kataPengantar);
    formData.append('namaLengkapPria', namaLengkapPria);
    formData.append('ayahPria', ayahPria);
    formData.append('ibuPria', ibuPria);
    isCheckedFotoPria && formData.append('fotoPria', fotoPria);
    formData.append('namaWanita', namaWanita);
    formData.append('namaLengkapWanita', namaLengkapWanita);
    formData.append('ayahWanita', ayahWanita);
    formData.append('ibuWanita', ibuWanita);
    isCheckedFotoWanita && formData.append('fotoWanita', fotoWanita);
    formData.append('alamatLamaran', alamatLamaran);
    formData.append('tglLamaran', tglLamaran);
    formData.append('waktuLamaran', waktuLamaran);



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
                console.error('Error:', error);
                toast.error('Gagal di Publish');
                setUploading(false);
            }
    }
       
    }
  return (
   <>
       <section>
        <HeadDashboard/>
        <div className='px-10 py-7'>
            {/* Step Navigator */}
            {/* {stepList()} */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 py-10 items-stretch'>
          
                    <div className='border border-gray px-4 py-7' >
                        <label htmlFor='pesan' className='font-bold text-left text-xs'>Gambar Pasangan</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Upload dan Masukkan Gambar Pasangan sebagai Gambar Utama</p>
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
                    </div>
                    <div className='border border-gray px-4 py-7'>
                        <label htmlFor='pengantar' className='font-bold text-left text-xs'>Musik</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Pilih Musik yang ingin Anda gunakan</p>
                        <Select label='Musik Pilihan' value={musik}  selectedKeys={defaultMusik}  onChange={handleChange} >
                            {musicList.map((music) => (
                                <SelectItem key={music.id} value={music.id}>
                                    {music.judul}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    
                    {/* <div>
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
                    </div> */}

                    <div className='border border-gray px-4 py-7'>
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

                    <div>
                        <label htmlFor='pengantar' className='font-bold text-left text-xs'>Kata Pengantar</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Tuliskan Kata Kata Pengantar Anda</p>
                        <textarea name="pengantar" id="pengantar" value={kataPengantar} onChange={(event) => setKatapengantar(event.target.value)}  className='border border-gold px-3 py-2 text-xs  w-full md:w-2/3' rows={10}></textarea>
                    </div>



                    


                    
                    <div className='py-5'>
                        <h2 className='text-dark font-bold mb-5'>Data Pria</h2>

                        <div className=' px-6 py-7 border border-gold flex flex-col gap-7 w-full md:w-4/5'>
                            <FieldDetail usefor='pria' label='Nama Panggilan Pria' desc='' placeholder='Nama Panggilan' type='text' value={namaPria} onChange={setNamapria}/>

                            <FieldDetail usefor='pria-lengkap' label='Nama Lengkap Pria' desc='' placeholder='Nama Lengkap Pria' type='text' value={namaLengkapPria} onChange={setNamalengkappria}/>

                            <FieldDetail usefor='ayah-pria' label='Nama Ayah (Pria)' desc='' placeholder='Nama Ayah Pria' type='text' value={ayahPria} onChange={setAyahpria} />

                            <FieldDetail usefor='ibu-pria' label='Nama Ibu (Pria)' desc='' placeholder='Nama Ibu Pria' type='text' value={ibuPria} onChange={setIbupria} />

                            <div>
                                <input type="checkbox" name="fotop" id="fotop" className='peer/fotop' checked={isCheckedFotoPria}   onChange={(event) => {
                                    setFotopriaView(null)
                                    setFotopria("")
                                    setCheckedFotoPria(!isCheckedFotoPria); 
                            
                                }} />
                                <label htmlFor='fotop' className='font-bold text-left text-xs ml-3'>Foto Pria</label>
                                <p className='text-gray text-[0.6rem] mb-2 '>Masukkan Foto Pria</p>
                                <input type="file" className='p-pict text-xs peer-checked/fotop:block hidden' 
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
                            <FieldDetail usefor='wanita'  value={namaWanita} onChange={setNamawanita} label='Nama Panggilan Wanita' desc='' placeholder='Nama wanita' type='text' />

                            <FieldDetail usefor='wanita-lengkap' value={namaLengkapWanita} onChange={setNamalengkapwanita} label='Nama Lengkap wanita' desc='' placeholder='Nama Lengkap Wanita' type='text' />

                            <FieldDetail usefor='ayah-wanita'  value={ayahWanita} onChange={setAyahwanita} label='Nama Ayah (Wanita)' desc='' placeholder='Nama Ayah Wanita' type='text' />

                            <FieldDetail usefor='ibu-wanita' value={ibuWanita} onChange={setIbuwanita} label='Nama Ibu (Wanita)' desc='' placeholder='Nama Ibu Wanita' type='text' />
                            <div>
                                <input type="checkbox" name="fotow" id="fotow" className='peer/fotow'checked={isCheckedFotoWanita} onChange={(event) => {
                                    setFotowanitaView(null)
                                    setFotowanita("")
                                    setCheckedFotoWanita(!isCheckedFotoWanita); 
                            
                                }}/>
                                <label htmlFor='fotow' className=' font-bold text-left text-xs ml-3'>Foto Wanita</label>
                                <p className='text-gray text-[0.6rem] mb-2 '>Masukkan Foto Wanita</p>
                                <input type="file" className='w-pict text-xs hidden peer-checked/fotow:block' 
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
                        <h2 className='text-dark font-bold  mb-5'>Data Lamaran</h2>

                        <div className=' px-6 py-7 border border-gold flex flex-col gap-7 w-full md:w-4/5'>
                            <FieldDetail usefor='alamat' label='Lokasi Lamaran' desc='' placeholder='Alamat Lokasi' type='text' value={alamatLamaran} onChange={setAlamatlamaran} />

                            <FieldDetail usefor='tanggal' label='Tanggal Lamaran' desc='' placeholder='Tanggal / Bulan / Tahun' type='date' value={tglLamaran} onChange={setTgllamaran} />

                            <FieldDetail usefor='waktu' label='Waktu Lamaran' desc='' placeholder='Jam Lamaran' type='time' value={waktuLamaran} onChange={setWaktulamaran} />

                        </div>
                    </div>


            <button className='text-xs bg-gold text-dark px-6 py-2' disabled={uploading} onClick={ onSubmit }>{uploading ? 'Tunggu Sebentar..' : 'Publish Undangan'}</button>
        </div>
    </section>
   <ToastContainer></ToastContainer>
   </>
  )
}
