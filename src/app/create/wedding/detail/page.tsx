"use client"

import HeadDashboard from '@/app/dashboard/headDashboard'
import React, { useCallback, useEffect, useState } from 'react'
import FieldDetail from '@/app/component/FieldDetail'
import { Select, SelectItem } from '@nextui-org/react'
import { songs } from '@/app/data/data'
import { storeUndangan } from '../../../../../services/auth'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { getMusicList } from '../../../../../services/manage'
import Cookies from 'js-cookie'

export default function Page() {
    const router = useRouter();
    const token = Cookies.get('token');
    if(!token) {
      router.push('/login');
      }
  
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const [uploading, setUploading] = useState(false);
    const [musicList, setMusiclist] = useState([]);
    const [namaPasangan , setNamapasangan] = useState("")
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
    //Data Resepsi
    const [alamatResepsi , setAlamatresepsi] = useState("")
    const [tglResepsi , setTglresepsi] = useState("")
    const [waktuResepsi , setWakturesepsi] = useState("")
    const [isCheckedResepsi , setCheckedResepsi] = useState(false)
    //Data Akad
    const [alamatAkad , setAlamatakad] = useState("")
    const [tglAkad , setTglakad] = useState("")
    const [waktuAkad , setWaktuakad] = useState("")
    //Tambahan
    const [gallery,setGallery] = useState([]);
    const [galleryView,setGalleryView] = useState([]);
    const [isCheckedGallery , setCheckedGallery] = useState(false)
    const config = {
        headers: {
          'content-type': 'multipart/form-data',
        }
      };

      const getMusicListAPI = useCallback( async () =>{
        const data = await getMusicList()
        setMusiclist(data.data)
      
        if(data.status > 300 ){
          toast.error(data.message)
        }
      
        },[getMusicList])
      
       
      
        useEffect(()=>{
          getMusicListAPI()
        
        },[])



    const onSubmit = async () => {
      setUploading(true);
        if(
          
            namaPasangan == '' || musik == '' || gambarUtama == '' || gambarCover == '' || namaPria == '' ||
        kataPengantar == '' || namaLengkapPria == '' || ayahPria == '' || ibuPria == '' || (fotoPria == '' && isCheckedFotoPria ) ||
        namaWanita == '' || namaLengkapWanita == '' || ayahWanita == '' || ibuWanita == '' || (fotoWanita == '' && isCheckedFotoWanita ) ||
        (alamatResepsi == '' && isCheckedResepsi)  || (tglResepsi == '' && isCheckedResepsi)  || (waktuResepsi == '' && isCheckedResepsi ) ||   alamatAkad == '' || tglAkad == '' || waktuAkad == ''||
        (gallery.length === 0 && isCheckedGallery)
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
      }else{
        console.warn('localStorage is not available');
      }

    formData.append('namaPasangan', namaPasangan);
    formData.append('musik', musik);
    formData.append('gambarUtama', gambarUtama);
    formData.append('gambarCover', gambarCover);
    formData.append('namaPria', namaPria);
    formData.append('kataPengantar', kataPengantar);
    formData.append('namaLengkapPria', namaLengkapPria);
    formData.append('ayahPria', ayahPria);
    formData.append('ibuPria', ibuPria);
    isCheckedFotoPria &&  formData.append('fotoPria', fotoPria);
    formData.append('namaWanita', namaWanita);
    formData.append('namaLengkapWanita', namaLengkapWanita);
    formData.append('ayahWanita', ayahWanita);
    formData.append('ibuWanita', ibuWanita);
    isCheckedFotoWanita && formData.append('fotoWanita', fotoWanita);
    isCheckedResepsi && formData.append('alamatResepsi', alamatResepsi);
    isCheckedResepsi && formData.append('tglResepsi', tglResepsi);
    isCheckedResepsi && formData.append('waktuResepsi', waktuResepsi);
    formData.append('alamatAkad', alamatAkad);
    formData.append('tglAkad', tglAkad);
    formData.append('waktuAkad', waktuAkad);

    if (isCheckedGallery ){
    for (let i = 0; i < gallery.length; i++) {
      formData.append('gallery[]', gallery[i]);
    }
    }

            try {
                const response = await axios.post(`${ROOT_API}/project/store`, formData, config);
                
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
                    <div className='border border-gray px-4 py-7'>
                        <label htmlFor='pengantar' className='font-bold text-left text-xs'>Musik</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Pilih Musik yang ingin Anda gunakan</p>
                        <Select label='Musik Pilihan' value={musik} onChange={(event) => setMusik(event.target.value)} >
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

                    <div className='col-span-2 border border-gold px-8 py-5'>
                        <input type="checkbox" name="galeri" id="galeri"  className='peer/galeri' 
                        onChange={(event) => {
                            setGalleryView([])
                            setGallery([])
                            setCheckedGallery(!isCheckedGallery); 
                    
                        }}
                        />
                        <label htmlFor='galeri' className='font-bold text-left text-xs ml-3'>Upload Foto Gallery</label>
                        <br /><br />
                        <input type="file" name="" id="" className='text-xs peer-checked/galeri:block hidden' multiple onChange={(event) => {
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
                    : ''}
                    </div>

                   

                    


                    
                    <div className='py-5'>
                        <h2 className='text-dark font-bold mb-5'>Data Pria</h2>

                        <div className=' px-6 py-7 border border-gold flex flex-col gap-7 w-full md:w-4/5'>
                            <FieldDetail usefor='pria' label='Nama Panggilan Pria' desc='' placeholder='Nama Panggilan' type='text' value={namaPria} onChange={setNamapria}/>

                            <FieldDetail usefor='pria-lengkap' label='Nama Lengkap Pria' desc='' placeholder='Nama Lengkap Pria' type='text' value={namaLengkapPria} onChange={setNamalengkappria}/>

                            <FieldDetail usefor='ayah-pria' label='Nama Ayah (Pria)' desc='' placeholder='Nama Ayah Pria' type='text' value={ayahPria} onChange={setAyahpria} />

                            <FieldDetail usefor='ibu-pria' label='Nama Ibu (Pria)' desc='' placeholder='Nama Ibu Pria' type='text' value={ibuPria} onChange={setIbupria} />

                            <div>
                                <input type="checkbox" name="fotop" id="fotop" className='peer/fotop'  onChange={(event) => {
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
                                <input type="checkbox" name="fotow" id="fotow" className='peer/fotow' 
                                onChange={(event) => {
                                    setFotowanitaView(null)
                                    setFotowanita("")
                                    setCheckedFotoWanita(!isCheckedFotoWanita); 
                            
                                }}
                                />
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
                        <h2 className='text-dark font-bold  mb-5'>Data Akad / Pemberkatan</h2>

                        <div className=' px-6 py-7 border border-gold flex flex-col gap-7 w-full md:w-4/5'>
                            <FieldDetail usefor='alamat' label='Alamat Akad' desc='' placeholder='Alamat Akad' type='text' value={alamatAkad} onChange={setAlamatakad} />

                            <FieldDetail usefor='tanggal' label='Tanggal Akad' desc='' placeholder='Tanggal / Bulan / Tahun' type='date' value={tglAkad} onChange={setTglakad} />

                            <FieldDetail usefor='waktu' label='Waktu Akad' desc='' placeholder='Jam Akad' type='time' value={waktuAkad} onChange={setWaktuakad} />

                        </div>
                    </div>

                    <div className='py-5'>
                    <h2 className='text-dark font-bold  mb-5'>Data Resepsi (Optional)</h2>
                    <input type="checkbox" name="resepsi" id="resepsi" className='peer/active' onChange={(event) => {
                                    setAlamatresepsi("")
                                    setTglresepsi("")
                                    setWakturesepsi("")
                                    setCheckedResepsi(!isCheckedResepsi); 
                            
                                }}/>
                    <label htmlFor="resepsi" className='text-xs ml-2 peer-checked/active:text-gold '>Dengan Resepsi</label>
                        

                        <div className=' px-6 py-7 border border-gold flex-col gap-7 w-full md:w-4/5 hidden peer-checked/active:flex mt-5'>
                            <FieldDetail usefor='alamat' label='Alamat Resepsi' desc='' placeholder='Alamat Resepsi' type='text' value={alamatResepsi} onChange={setAlamatresepsi} />

                            <FieldDetail usefor='tanggal' label='Tanggal Resepsi' desc='' placeholder='Tanggal / Bulan / Tahun' type='date' value={tglResepsi} onChange={setTglresepsi} />

                            <FieldDetail usefor='waktu' label='Waktu Resepsi' desc='' placeholder='Waktu Resepsi' type='time' value={waktuResepsi} onChange={setWakturesepsi} />

                        </div>
                    </div>
                    <div >
                        <FieldDetail usefor='pasangan' label='Nama Pasangan' desc='Tuliskan Nama Pasangan' placeholder='Nama Cowok Nama Cewek (David Yusi)' type='text' value={namaPasangan} onChange={setNamapasangan}/>
                    </div>
                </div>

            <button className='text-xs bg-gold text-dark px-6 py-2' disabled={uploading} onClick={ onSubmit }>{uploading ? 'Tunggu Sebentar..' : 'Publish Undangan'}</button>
        </div>
    </section>
    <ToastContainer></ToastContainer>
    </>
  )
}
