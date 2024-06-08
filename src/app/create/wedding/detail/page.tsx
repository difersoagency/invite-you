"use client"

import headDashboard from '@/app/dashboard/headDashboard'
import React, { useState } from 'react'
import stepList from '../../stepList'
import FieldText from '@/app/component/FieldText'
import FieldDetail from '@/app/component/FieldDetail'
import { Select, SelectItem } from '@nextui-org/react'
import { songs } from '@/app/data/data'
import { storeUndangan } from '../../../../../services/auth'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { useRouter } from 'next/navigation'


export default function page() {
    const router = useRouter();
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const [namaPasangan , setNamapasangan] = useState("")
    const [musik , setMusik] = useState("")
    const [gambarUtama , setGambarutama] = useState("")
    const [gambarCover , setGambarcover] = useState("")
    const [kataPengantar , setKatapengantar] = useState("")
    const [pesan , setPesan] = useState("")
    //Pria
    const [namaPria , setNamapria] = useState("")
    const [namaLengkapPria , setNamalengkappria] = useState("")
    const [ayahPria , setAyahpria] = useState("")
    const [ibuPria , setIbupria] = useState("")
    const [fotoPria , setFotopria] = useState("")
    //Wanita
    const [namaWanita , setNamawanita] = useState("")
    const [namaLengkapWanita , setNamalengkapwanita] = useState("")
    const [ayahWanita , setAyahwanita] = useState("")
    const [ibuWanita , setIbuwanita] = useState("")
    const [fotoWanita , setFotowanita] = useState("")
    //Data Akad
    const [alamatResepsi , setAlamatresepsi] = useState("")
    const [tglResepsi , setTglresepsi] = useState("")
    const [waktuResepsi , setWakturesepsi] = useState("")

    const config = {
        headers: {
          'content-type': 'multipart/form-data',
        }
      };


    const onSubmit = async (e) => {
        e.preventDefault();
        if(namaPasangan == '' || musik == '' || gambarUtama == '' || gambarCover == '' || namaPria == '' ||
        kataPengantar == '' || namaLengkapPria == '' || ayahPria == '' || ibuPria == '' || fotoPria == '' ||
        namaWanita == '' || namaLengkapWanita == '' || ayahWanita == '' || ibuWanita == '' || fotoWanita == '' ||
        alamatResepsi == '' || tglResepsi == '' || waktuResepsi == ''
        ){
            toast.error('Lengkapi Form')
        }else{
        const undanganFormStr = localStorage.getItem('undanganForm');
        const undanganForm = JSON.parse(undanganFormStr);
        const formData = {
            namaKlien : undanganForm.namaKlien,
            emailKlien : undanganForm.emailKlien,
            acara : undanganForm.acara,
            template : undanganForm.template,
            namaPasangan,
            musik,
            gambarUtama,
            gambarCover,
            namaPria,
            kataPengantar,
            pesan,
            namaLengkapPria,
            ayahPria,
            ibuPria,
            fotoPria,
            namaWanita,
            namaLengkapWanita,
            ayahWanita,
            ibuWanita,
           fotoWanita,
           alamatResepsi,
           tglResepsi,
           waktuResepsi
          }
         
            try {
                const response = await axios.post(`${ROOT_API}/project/store`, formData, config);
                
                if (response.status >= 200 && response.status < 300) {
                    localStorage.removeItem("undanganForm");
                    toast.success("Berhasil");
                    router.push('/dashboard');
                } else {
                    toast.error('Gagal di Publish');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Gagal di Publish');
            }
    }
       
    }
  return (
    <>
    <section>
        {headDashboard()}
    <form onSubmit={ onSubmit }>
        <div className='px-10 py-7'>
            {/* Step Navigator */}
            {/* {stepList()} */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 py-10'>
                    <FieldDetail usefor='pasangan' label='Nama Pasangan' desc='Tuliskan Nama Pasangan' placeholder='Pria & Wanita' type='text' value={namaPasangan} onChange={setNamapasangan}/>

                    <div>
                        <label htmlFor='pengantar' className='font-bold text-left text-xs'>Musik</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Pilih Musik yang ingin Anda gunakan</p>
                        <Select label='Musik Pilihan' value={musik} onChange={(event) => setMusik(event.target.value)} >
                            {songs.map((song) => (
                                <SelectItem key={song.value} value={song.value}>
                                    {song.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <label htmlFor='pesan' className='font-bold text-left text-xs'>Gambar Utama</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Upload dan Masukkan Gambar Utama undangan Anda</p>
                        <input type="file" className='utama-pict text-xs'  
                        onChange={(event) => {
                                    return setGambarutama(event.target.files[0])    
                                }} />
                    </div>

                    <div>
                        <label htmlFor='pesan' className='font-bold text-left text-xs'>Gambar Cover</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Upload dan Masukkan Gambar Cover undangan Anda</p>
                        <input type="file" className='cover-pict text-xs' 
                        onChange={(event) => {
                            return setGambarcover(event.target.files[0])    
                        }} 
                        />
                    </div>

                    <div className='col-span-2 border border-gold px-8 py-5'>
                        <label htmlFor='pesan' className='font-bold text-left text-xs'>Upload Foto Gallery</label>
                        <br /><br />
                        <input type="file" name="" id="" className='text-xs'/>

                        <div className='mt-10 border border-gold border-dotted px-6 py-4 rounded-lg grid grid-cols-6 gap-6'>
                            <img src="https://picsum.photos/200" alt="" />
                            <img src="https://picsum.photos/200" alt="" />

                            <img src="https://picsum.photos/200" alt="" />

                            <img src="https://picsum.photos/200" alt="" />
                            <img src="https://picsum.photos/200" alt="" />

                            <img src="https://picsum.photos/200" alt="" />

                            <img src="https://picsum.photos/200" alt="" />
                            <img src="https://picsum.photos/200" alt="" />
                            <img src="https://picsum.photos/200" alt="" />
                            <img src="https://picsum.photos/200" alt="" />

                        </div>
                    </div>

                    <div>
                        <label htmlFor='pengantar' className='font-bold text-left text-xs'>Kata Pengantar</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Tuliskan Kata Kata Pengantar Anda</p>
                        <textarea name="pengantar" id="pengantar" value={kataPengantar} onChange={(event) => setKatapengantar(event.target.value)}  className='border-2 border-gold px-3 py-2 text-xs rounded-lg w-full md:w-2/3' rows={10}></textarea>
                    </div>

                    <div>
                        <label htmlFor='pesan' className='font-bold text-left text-xs'>Pesan - Pesan (Optional)</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Tuliskan pesan - pesan Anda untuk tamu undangan</p>
                        <textarea name="pesan" id="pesan" value={pesan}   onChange={(event) => setPesan(event.target.value)}  className='border-2 border-gold px-3 py-2 text-xs rounded-lg w-full md:w-2/3' rows={10}></textarea>
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
                                    return setFotopria(event.target.files[0])
                            
                                }}
                                
                                />
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
                                    return setFotowanita(event.target.files[0])
                            
                                }}
                                />
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

            <button type='submit' className='text-xs bg-gold text-dark px-6 py-2'>Publish Undangan</button>
            
        </div>
        </form>

    </section>
    <ToastContainer></ToastContainer>
    </>
  )
}
