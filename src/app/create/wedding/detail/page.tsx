"use client"

import headDashboard from '@/app/dashboard/headDashboard'
import React from 'react'
import stepList from '../../stepList'
import FieldText from '@/app/component/FieldText'
import FieldDetail from '@/app/component/FieldDetail'
import { Select, SelectItem } from '@nextui-org/react'
import { songs } from '@/app/data/data'

export default function page() {
  return (
    <section>
        {headDashboard()}

        <div className='px-10 py-7'>
            {/* Step Navigator */}
            {/* {stepList()} */}
            
            <form action="">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 py-10'>
                    <FieldDetail usefor='pasangan' label='Nama Pasangan' desc='Tuliskan Nama Pasangan' placeholder='Pria & Wanita' type='text' />

                    <div>
                        <label htmlFor='pengantar' className='font-bold text-left text-xs'>Musik</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Pilih Musik yang ingin Anda gunakan</p>
                        <Select label='Musik Pilihan' >
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
                        <input type="file" className='utama-pict text-xs' />
                    </div>

                    <div>
                        <label htmlFor='pesan' className='font-bold text-left text-xs'>Gambar Cover</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Upload dan Masukkan Gambar Cover undangan Anda</p>
                        <input type="file" className='cover-pict text-xs' />
                    </div>

                    <div>
                        <label htmlFor='pengantar' className='font-bold text-left text-xs'>Kata Pengantar</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Tuliskan Kata Kata Pengantar Anda</p>
                        <textarea name="pengantar" id="pengantar" className='border-2 border-gold px-3 py-2 text-xs rounded-lg w-full md:w-2/3' rows={10}></textarea>
                    </div>

                    <div>
                        <label htmlFor='pesan' className='font-bold text-left text-xs'>Pesan - Pesan (Optional)</label>
                        <p className='text-gray text-[0.6rem] mb-2 '>Tuliskan pesan - pesan Anda untuk tamu undangan</p>
                        <textarea name="pesan" id="pesan" className='border-2 border-gold px-3 py-2 text-xs rounded-lg w-full md:w-2/3' rows={10}></textarea>
                    </div>

                    

                    <div className='py-5'>
                        <h2 className='text-dark font-bold mb-5'>Data Pria</h2>

                        <div className=' px-6 py-7 border border-gold flex flex-col gap-7 w-full md:w-4/5'>
                            <FieldDetail usefor='pria' label='Nama Pria' desc='' placeholder='Nama Pria' type='text' />

                            <FieldDetail usefor='pria-lengkap' label='Nama Lengkap Pria' desc='' placeholder='Nama Lengkap Pria' type='text'/>

                            <FieldDetail usefor='ayah-pria' label='Nama Ayah (Pria)' desc='' placeholder='Nama Ayah Pria' type='text' />

                            <FieldDetail usefor='ibu-pria' label='Nama Ibu (Pria)' desc='' placeholder='Nama Ibu Pria' type='text' />

                            <div>
                                <label htmlFor='pesan' className='font-bold text-left text-xs'>Foto Pria</label>
                                <p className='text-gray text-[0.6rem] mb-2 '>Masukkan Foto Pria</p>
                                <input type="file" className='p-pict text-xs' />
                            </div>
                        </div>

                        
                    </div>

                    <div className='py-5'>
                        <h2 className='text-dark font-bold  mb-5'>Data Wanita</h2>

                        <div className=' px-6 py-7 border border-gold flex flex-col gap-7 w-full md:w-4/5'>
                            <FieldDetail usefor='wanita' label='Nama wanita' desc='' placeholder='Nama wanita' type='text' />

                            <FieldDetail usefor='wanita-lengkap' label='Nama Lengkap wanita' desc='' placeholder='Nama Lengkap Wanita' type='text' />

                            <FieldDetail usefor='ayah-wanita' label='Nama Ayah (Wanita)' desc='' placeholder='Nama Ayah Wanita' type='text' />

                            <FieldDetail usefor='ibu-wanita' label='Nama Ibu (Wanita)' desc='' placeholder='Nama Ibu Wanita' type='text' />

                            <div>
                                <label htmlFor='pesan' className='font-bold text-left text-xs'>Foto Wanita</label>
                                <p className='text-gray text-[0.6rem] mb-2 '>Masukkan Foto Wanita</p>
                                <input type="file" className='w-pict text-xs' />
                            </div>
                        </div>
                    </div>

                    <div className='py-5'>
                        <h2 className='text-dark font-bold  mb-5'>Data Akad / Pemberkatan</h2>

                        <div className=' px-6 py-7 border border-gold flex flex-col gap-7 w-full md:w-4/5'>
                            <FieldDetail usefor='alamat' label='Alamat Resepsi' desc='' placeholder='Alamat Resepsi' type='text' />

                            <FieldDetail usefor='tanggal' label='Tanggal Resepsi' desc='' placeholder='Tanggal / Bulan / Tahun' type='date' />

                            <FieldDetail usefor='waktu' label='Waktu Resepsi' desc='' placeholder='Waktu Resepsi' type='time' />

                        </div>
                    </div>
                </div>

                
            </form>

            <button className='text-xs bg-gold text-dark px-6 py-2'>Publish Undangan</button>
        </div>


    </section>
  )
}
