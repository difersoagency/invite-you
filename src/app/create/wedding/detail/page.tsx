"use client";

import React, { useCallback, useEffect, useState } from "react";
import FieldDetail from "@/app/component/FieldDetail";
import { banks, songs } from "@/app/data/data";
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
import { CalendarIcon, EnvelopeIcon, GiftIcon, ImageIcon, UserIcon } from "@/app/component/icon/Icons";

export default function Page() {
  const router = useRouter();
  const token = Cookies.get("token");
  if (!token) {
    router.push("/login");
  }

  const ROOT_API = process.env.NEXT_PUBLIC_API;
  const [uploading, setUploading] = useState(false);
  const [musicList, setMusiclist] = useState([]);
  const [ketRek, setKetRek] = useState("");
  const [namaPasangan, setNamapasangan] = useState("");
  const [musik, setMusik] = useState("");
  const [gambarUtama, setGambarutama] = useState("");
  const [gambarUtamaView, setGambarutamaView] = useState(null);
  const [gambarCover, setGambarcover] = useState("");
  const [gambarCoverView, setGambarcoverView] = useState(null);
  const [kataPengantar, setKatapengantar] = useState("");
  //Pria
  const [namaPria, setNamapria] = useState("");
  const [namaLengkapPria, setNamalengkappria] = useState("");
  const [ayahPria, setAyahpria] = useState("");
  const [ibuPria, setIbupria] = useState("");
  const [fotoPria, setFotopria] = useState("");
  const [fotoPriaView, setFotopriaView] = useState(null);
  const [isCheckedFotoPria, setCheckedFotoPria] = useState(false);
  //Wanita
  const [namaWanita, setNamawanita] = useState("");
  const [namaLengkapWanita, setNamalengkapwanita] = useState("");
  const [ayahWanita, setAyahwanita] = useState("");
  const [ibuWanita, setIbuwanita] = useState("");
  const [fotoWanita, setFotowanita] = useState("");
  const [fotoWanitaView, setFotowanitaView] = useState(null);
  const [isCheckedFotoWanita, setCheckedFotoWanita] = useState(false);
  //Data Resepsi
  const [alamatResepsi, setAlamatresepsi] = useState("");
  const [tglResepsi, setTglresepsi] = useState("");
  const [waktuResepsi, setWakturesepsi] = useState("");
  const [isCheckedResepsi, setCheckedResepsi] = useState(false);
  //Data Akad
  const [alamatAkad, setAlamatakad] = useState("");
  const [tglAkad, setTglakad] = useState("");
  const [waktuAkad, setWaktuakad] = useState("");
  //Tambahan
  const [gallery, setGallery] = useState([]);
  const [noRek, setNorek] = useState("");
  const [isCheckedSumbangan, setCheckedSumbangan] = useState(false);
  const [galleryView, setGalleryView] = useState([]);
  const [isCheckedGallery, setCheckedGallery] = useState(false);
  //Maps
  const [mapsAkad, setmapsAkad] = useState("");
  const [mapsResepsi, setmapsResepsi] = useState("");
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
      namaPasangan == "" ||
      musik == "" ||
      gambarUtama == "" ||
      gambarCover == "" ||
      namaPria == "" ||
      kataPengantar == "" ||
      namaLengkapPria == "" ||
      ayahPria == "" ||
      ibuPria == "" ||
      (fotoPria == "" && isCheckedFotoPria) ||
      namaWanita == "" ||
      namaLengkapWanita == "" ||
      ayahWanita == "" ||
      ibuWanita == "" ||
      (fotoWanita == "" && isCheckedFotoWanita) ||
      (alamatResepsi == "" && isCheckedResepsi) ||
      (tglResepsi == "" && isCheckedResepsi) ||
      (waktuResepsi == "" && isCheckedResepsi) ||
      (mapsResepsi == "" && isCheckedResepsi) ||
      alamatAkad == "" ||
      mapsAkad == "" ||
      tglAkad == "" ||
      waktuAkad == "" ||
      (gallery.length === 0 && isCheckedGallery) ||
      (noRek == "" && isCheckedSumbangan) ||
      (ketRek == "" && isCheckedSumbangan)
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

      formData.append("namaPasangan", namaPasangan);
      formData.append("musik", musik);
      formData.append("gambarUtama", gambarUtama);
      formData.append("gambarCover", gambarCover);
      formData.append("namaPria", namaPria);
      formData.append("kataPengantar", kataPengantar);
      formData.append("namaLengkapPria", namaLengkapPria);
      formData.append("ayahPria", ayahPria);
      formData.append("ibuPria", ibuPria);
      isCheckedFotoPria && formData.append("fotoPria", fotoPria);
      formData.append("namaWanita", namaWanita);
      formData.append("namaLengkapWanita", namaLengkapWanita);
      formData.append("ayahWanita", ayahWanita);
      formData.append("ibuWanita", ibuWanita);
      isCheckedFotoWanita && formData.append("fotoWanita", fotoWanita);
      isCheckedResepsi && formData.append("alamatResepsi", alamatResepsi);
      isCheckedResepsi && formData.append("tglResepsi", tglResepsi);
      isCheckedResepsi && formData.append("waktuResepsi", waktuResepsi);
      isCheckedResepsi && formData.append("mapsResepsi", mapsResepsi);
      formData.append("alamatAkad", alamatAkad);
      formData.append("tglAkad", tglAkad);
      formData.append("waktuAkad", waktuAkad);
      formData.append("mapsAkad", mapsAkad);
      isCheckedSumbangan && formData.append("noRek", noRek);
      isCheckedSumbangan && formData.append("ketRek", ketRek);

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
          eyebrow="Undangan baru · Wedding"
          title="Detail acara"
          description="Bagian dengan tombol di kanan boleh dilewati."
        />

        <div className="flex flex-col gap-6">
          <SectionCard title="Gambar dan musik" icon={<ImageIcon />}>
            <div className="grid gap-5 md:grid-cols-2">
              <ImageUpload
                id="gambar-utama"
                label="Foto pasangan"
                description="Foto utama di dalam undangan"
                previews={[gambarUtamaView]}
                onFiles={(files) => {
                  setGambarutamaView(URL.createObjectURL(files[0]));
                  setGambarutama(files[0]);
                }}
              />
              <ImageUpload
                id="gambar-cover"
                label="Gambar cover"
                description="Tampil di halaman pembuka"
                previews={[gambarCoverView]}
                onFiles={(files) => {
                  setGambarcoverView(URL.createObjectURL(files[0]));
                  setGambarcover(files[0]);
                }}
              />
            </div>
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

          <SectionCard title="Kata pengantar" icon={<EnvelopeIcon />}>
            <FieldDetail usefor="pasangan" label="Nama pasangan" desc="Ditampilkan sebagai judul undangan." placeholder="Contoh: David & Yusi" type="text" value={namaPasangan} onChange={setNamapasangan} />
            <div>
              <label htmlFor="pengantar" className="label">
                Kata pengantar
              </label>
              <textarea
                name="pengantar"
                id="pengantar"
                value={kataPengantar || ""}
                onChange={(event) => setKatapengantar(event.target.value)}
                className="input-base min-h-[140px] resize-y"
                placeholder="Contoh: Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud..."
                rows={6}
              ></textarea>
            </div>
          </SectionCard>

          <SectionCard title="Mempelai pria" description="Nama dan orang tua" icon={<UserIcon />}>
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldDetail usefor="pria" label="Nama panggilan" placeholder="Nama panggilan" type="text" value={namaPria} onChange={setNamapria} />
              <FieldDetail usefor="pria-lengkap" label="Nama lengkap" placeholder="Nama lengkap pria" type="text" value={namaLengkapPria} onChange={setNamalengkappria} />
              <FieldDetail usefor="ayah-pria" label="Nama ayah" placeholder="Nama ayah" type="text" value={ayahPria} onChange={setAyahpria} />
              <FieldDetail usefor="ibu-pria" label="Nama ibu" placeholder="Nama ibu" type="text" value={ibuPria} onChange={setIbupria} />
            </div>
            <div className="border-t border-line pt-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Foto pria</p>
                  <p className="hint">Opsional</p>
                </div>
                <Toggle
                  id="fotop"
                  checked={isCheckedFotoPria}
                  onChange={() => {
                    setFotopriaView(null);
                    setFotopria("");
                    setCheckedFotoPria(!isCheckedFotoPria);
                  }}
                />
              </div>
              {isCheckedFotoPria && (
                <div className="mt-4">
                  <ImageUpload
                    id="fotop-file"
                    previews={[fotoPriaView]}
                    onFiles={(files) => {
                      setFotopriaView(URL.createObjectURL(files[0]));
                      setFotopria(files[0]);
                    }}
                  />
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Mempelai wanita" description="Nama dan orang tua" icon={<UserIcon />}>
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldDetail usefor="wanita" label="Nama panggilan" placeholder="Nama panggilan" type="text" value={namaWanita} onChange={setNamawanita} />
              <FieldDetail usefor="wanita-lengkap" label="Nama lengkap" placeholder="Nama lengkap wanita" type="text" value={namaLengkapWanita} onChange={setNamalengkapwanita} />
              <FieldDetail usefor="ayah-wanita" label="Nama ayah" placeholder="Nama ayah" type="text" value={ayahWanita} onChange={setAyahwanita} />
              <FieldDetail usefor="ibu-wanita" label="Nama ibu" placeholder="Nama ibu" type="text" value={ibuWanita} onChange={setIbuwanita} />
            </div>
            <div className="border-t border-line pt-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Foto wanita</p>
                  <p className="hint">Opsional</p>
                </div>
                <Toggle
                  id="fotow"
                  checked={isCheckedFotoWanita}
                  onChange={() => {
                    setFotowanitaView(null);
                    setFotowanita("");
                    setCheckedFotoWanita(!isCheckedFotoWanita);
                  }}
                />
              </div>
              {isCheckedFotoWanita && (
                <div className="mt-4">
                  <ImageUpload
                    id="fotow-file"
                    previews={[fotoWanitaView]}
                    onFiles={(files) => {
                      setFotowanitaView(URL.createObjectURL(files[0]));
                      setFotowanita(files[0]);
                    }}
                  />
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Akad / pemberkatan" icon={<CalendarIcon />}>
            <FieldDetail usefor="alamat-akad" label="Alamat akad" placeholder="Alamat lengkap lokasi" type="text" value={alamatAkad} onChange={setAlamatakad} />
            <FieldDetail usefor="maps-akad" label="Link Google Maps" placeholder="https://goo.gl/maps/xxxxxxxxxxx" type="url" value={mapsAkad} onChange={setmapsAkad} />
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <FieldDetail usefor="tanggal-akad" label="Tanggal akad" type="date" value={tglAkad} onChange={setTglakad} />
              <FieldDetail usefor="waktu-akad" label="Waktu akad" type="time" value={waktuAkad} onChange={setWaktuakad} />
            </div>
          </SectionCard>

          <SectionCard title="Resepsi" description="Opsional" icon={<CalendarIcon />} toggle={{
              id: "resepsi",
              checked: isCheckedResepsi,
              label: "Dengan resepsi",
              onChange: () => {
                setAlamatresepsi("");
                setTglresepsi("");
                setWakturesepsi("");
                setmapsResepsi("");
                setCheckedResepsi(!isCheckedResepsi);
              },
            }}>
            <FieldDetail usefor="alamat-resepsi" label="Alamat resepsi" placeholder="Alamat lengkap lokasi" type="text" value={alamatResepsi} onChange={setAlamatresepsi} />
            <FieldDetail usefor="maps-resepsi" label="Link Google Maps" placeholder="https://goo.gl/maps/xxxxxxxxxxx" type="url" value={mapsResepsi} onChange={setmapsResepsi} />
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <FieldDetail usefor="tanggal-resepsi" label="Tanggal resepsi" type="date" value={tglResepsi} onChange={setTglresepsi} />
              <FieldDetail usefor="waktu-resepsi" label="Waktu resepsi" type="time" value={waktuResepsi} onChange={setWakturesepsi} />
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
            title="Amplop digital"
            description="Opsional, nomor rekening untuk tamu"
            icon={<GiftIcon />}
            toggle={{
              id: "sumbangan",
              checked: isCheckedSumbangan,
              label: "Terima sumbangan",
              onChange: () => {
                setNorek("");
                setKetRek("");
                setCheckedSumbangan(!isCheckedSumbangan);
              },
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldDetail usefor="norekening" label="Nomor rekening" placeholder="Contoh: 111222233" type="text" value={noRek} onChange={setNorek} />
              <FieldDetail usefor="ket-rekening" label="Atas nama / bank" placeholder="Contoh: a/n David - BCA" type="text" value={ketRek} onChange={setKetRek} />
            </div>
          </SectionCard>
        </div>

        <FormActions
          onSubmit={onSubmit}
          loading={uploading}
          submitLabel="Publish undangan"
        />
      </AppShell>
      <ToastContainer position="top-center" hideProgressBar theme="dark"></ToastContainer>
    </>
  );
}
