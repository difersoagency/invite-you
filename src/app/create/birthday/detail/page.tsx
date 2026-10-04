"use client";

import React, { useCallback, useEffect, useState } from "react";
import FieldDetail from "@/app/component/FieldDetail";
import { songs } from "@/app/data/data";
import { storeUndangan } from "../../../../../services/auth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useRouter } from "next/navigation";
import { getMusicList } from "../../../../../services/manage";
import Cookies from "js-cookie";
import AppShell from "@/app/component/ui/AppShell";
import PageHeader from "@/app/component/ui/PageHeader";
import Stepper from "@/app/component/ui/Stepper";
import SectionCard from "@/app/component/ui/SectionCard";
import Toggle from "@/app/component/ui/Toggle";
import ImageUpload from "@/app/component/ui/ImageUpload";
import FormActions from "@/app/component/ui/FormActions";
import { CakeIcon, CalendarIcon, ChatIcon, ImageIcon, MusicIcon } from "@/app/component/icon/Icons";

export default function Page() {
  const router = useRouter();
  const token = Cookies.get("token");
  if (!token) {
    router.push("/login");
  }

  const ROOT_API = process.env.NEXT_PUBLIC_API;
  const [uploading, setUploading] = useState(false);
  const [musicList, setMusiclist] = useState([]);
  const [musik, setMusik] = useState("");
  const [ketReservasi, setKetReservasi] = useState("");
  const [nama, setNama] = useState("");
  const [tglLahir, setTglLahir] = useState("");
  const [namaLengkap, setNamalengkap] = useState("");
  const [ketAcara, setKetAcara] = useState("");
  const [foto, setFoto] = useState("");
  const [fotoView, setFotoView] = useState(null);
  const [isCheckedFoto, setCheckedFoto] = useState(false);

  const [alamat, setAlamat] = useState("");
  const [maps, setMaps] = useState("");
  const [tgl, setTgl] = useState("");
  const [waktu, setWaktu] = useState("");
  const [noWa, setNoWa] = useState("");
  const [isCheckedReservasi, setCheckedReservasi] = useState(false);

  const [gallery, setGallery] = useState([]);
  const [galleryView, setGalleryView] = useState([]);
  const [isCheckedGallery, setCheckedGallery] = useState(false);


  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const getMusicListAPI = useCallback(async () => {
    const data = await getMusicList();
    setMusiclist(data.data);

    if (data.status > 300) {
      toast.error(data.message);
    }
  }, [getMusicList]);

  useEffect(() => {
    getMusicListAPI();
  }, []);

  const onSubmit = async () => {
    setUploading(true);
    if (
      musik == "" ||
      nama == "" ||
      ketAcara == "" ||
      (foto == "" && isCheckedFoto) ||
      alamat == "" ||
      tgl == "" ||
      tglLahir == "" ||
      namaLengkap == "" ||
      maps == "" ||
      waktu == "" ||
      (gallery.length === 0 && isCheckedGallery) ||
      (noWa == "" && isCheckedReservasi) ||
      (ketReservasi == "" && isCheckedReservasi)
      
    ) {
      toast.error("Lengkapi Form");
      setUploading(false);
    } else {
      const formData = new FormData();
      if (typeof window !== "undefined") {
        const undanganFormStr = localStorage.getItem("undanganForm");
        const undanganForm = JSON.parse(undanganFormStr);

        formData.append("namaKlien", undanganForm.namaKlien);
        formData.append("emailKlien", undanganForm.emailKlien);
        formData.append("acara", undanganForm.acara);
        formData.append("template", undanganForm.template);
      } else {
        console.warn("localStorage is not available");
      }

      formData.append("musik", musik);
      formData.append("nama", nama);    
      formData.append("namaLengkap", namaLengkap);    
      formData.append("tglLahir", tglLahir);    
      formData.append("ketAcara", ketAcara);    
      isCheckedFoto && formData.append("foto", foto);
      formData.append("alamat", alamat);
      formData.append("tgl", tgl);
      formData.append("waktu", waktu);
      isCheckedReservasi && formData.append("noWa", noWa);
      isCheckedReservasi && formData.append("ketReservasi", ketReservasi);
      formData.append("maps", maps);
      if (isCheckedGallery) {
        for (let i = 0; i < gallery.length; i++) {
          formData.append("gallery[]", gallery[i]);
        }
      }


      try {
        const response = await axios.post(
          `${ROOT_API}/project/store`,
          formData,
          config
        );

        if (response.status >= 200 && response.status < 300) {
          localStorage.removeItem("undanganForm");
          toast.success("Berhasil di Upload", {
            onClose: () => {
              setTimeout(() => {
                router.push("/dashboard");
              }, 500);
            },
          });
        } else {
          toast.error("Gagal di Publish");
          setUploading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Gagal di Publish");
        setUploading(false);
      }
    }
  };
  return (
    <>
      <AppShell narrow>
        <Stepper current={2} />
        <PageHeader
          eyebrow="Undangan baru · Birthday"
          title="Detail acara"
          description="Bagian dengan tombol di kanan boleh dilewati."
        />

        <div className="flex flex-col gap-6">
          <SectionCard title="Yang berulang tahun" icon={<CakeIcon />}>
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldDetail usefor="nama" label="Nama panggilan" placeholder="Nama panggilan" type="text" value={nama} onChange={setNama} />
              <FieldDetail usefor="nama-lengkap" label="Nama lengkap" placeholder="Nama lengkap" type="text" value={namaLengkap} onChange={setNamalengkap} />
            </div>
            <FieldDetail usefor="tgl-lahir" label="Tanggal lahir" type="date" value={tglLahir} onChange={setTglLahir} />
            <div className="border-t border-line pt-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Foto</p>
                  <p className="hint">Opsional</p>
                </div>
                <Toggle
                  id="fotop"
                  checked={isCheckedFoto}
                  onChange={() => {
                    setFotoView(null);
                    setFoto("");
                    setCheckedFoto(!isCheckedFoto);
                  }}
                />
              </div>
              {isCheckedFoto && (
                <div className="mt-4">
                  <ImageUpload
                    id="fotop-file"
                    previews={[fotoView]}
                    onFiles={(files) => {
                      setFotoView(URL.createObjectURL(files[0]));
                      setFoto(files[0]);
                    }}
                  />
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Data acara" icon={<CalendarIcon />}>
            <FieldDetail usefor="alamat" label="Lokasi acara" placeholder="Alamat lengkap lokasi" type="text" value={alamat} onChange={setAlamat} />
            <FieldDetail usefor="maps" label="Link Google Maps" placeholder="https://goo.gl/maps/xxxxxxxxxxx" type="url" value={maps} onChange={setMaps} />
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <FieldDetail usefor="tgl" label="Tanggal acara" type="date" value={tgl} onChange={setTgl} />
              <FieldDetail usefor="waktu" label="Waktu acara" type="time" value={waktu} onChange={setWaktu} />
            </div>
            <FieldDetail usefor="ket-acara" label="Keterangan acara" placeholder="Contoh: Dresscode serba putih" type="text" value={ketAcara} onChange={setKetAcara} />
          </SectionCard>

          <SectionCard title="Musik" icon={<MusicIcon />}>
            <div className="sm:max-w-sm">
              <label htmlFor="musik" className="label">Musik</label>
              <select id="musik" className="select-base" value={musik ?? ""} onChange={(event) => setMusik(event.target.value)}>
                <option value="" disabled>Pilih musik latar</option>
                {(musicList || []).map((music) => (
                  <option key={music.id} value={music.id}>
                    {music.judul}
                  </option>
                ))}
              </select>
            </div>
          </SectionCard>

          <SectionCard
            title="Galeri foto"
            description="Opsional"
            icon={<ImageIcon />}
           
            toggle={{
              id: "galeri",
              checked: isCheckedGallery,
              label: "Tampilkan galeri",
              onChange: () => {
                setGalleryView([]);
                setGallery([]);
                setCheckedGallery(!isCheckedGallery);
              },
            }}
          >
            <ImageUpload
              id="galeri-file"
              multiple
              previews={galleryView.length > 0 ? galleryView.map((file) => URL.createObjectURL(file)) : []}
              onFiles={(files) => {
                setGalleryView(files);
                setGallery(files);
              }}
            />
          </SectionCard>

          <SectionCard
            title="RSVP via WhatsApp"
            description="Opsional, tamu konfirmasi lewat WhatsApp"
            icon={<ChatIcon />}
           
            toggle={{
              id: "reservasi",
              checked: isCheckedReservasi,
              label: "Aktifkan RSVP",
              onChange: () => {
                setNoWa("");
                setKetReservasi("");
                setCheckedReservasi(!isCheckedReservasi);
              },
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldDetail usefor="no-wa" label="Nomor WhatsApp" desc="Gunakan format 62, tanpa 0 di depan." placeholder="Contoh: 628123123123" type="tel" value={noWa} onChange={setNoWa} />
              <FieldDetail usefor="ket-reservasi" label="Teks balasan" desc="Pesan otomatis yang dikirim tamu." placeholder="Ya, saya bersedia hadir" type="text" value={ketReservasi} onChange={setKetReservasi} />
            </div>
          </SectionCard>
        </div>

        <FormActions
          onSubmit={onSubmit}
          loading={uploading}
          submitLabel="Publish Undangan"
        />
      </AppShell>
      <ToastContainer position="top-center" hideProgressBar theme="dark"></ToastContainer>
    </>
  );
}
