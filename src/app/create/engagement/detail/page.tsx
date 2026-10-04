"use client";

import React, { useCallback, useEffect, useState } from "react";
import FieldDetail from "@/app/component/FieldDetail";
import { Select, SelectItem } from "@nextui-org/react";
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
  const [musik, setMusik] = useState("");
  const [ketRek, setKetRek] = useState("");
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
  //Data Akad
  const [alamatLamaran, setAlamatlamaran] = useState("");
  const [tglLamaran, setTgllamaran] = useState("");
  const [waktuLamaran, setWaktulamaran] = useState("");
  const [noRek, setNorek] = useState("");
  const [isCheckedSumbangan, setCheckedSumbangan] = useState(false);
  //Maps
  const [mapsLamaran, setmapsLamaran] = useState("");

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
      alamatLamaran == "" ||
      mapsLamaran == "" ||
      tglLamaran == "" ||
      waktuLamaran == "" ||
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
      formData.append("alamatLamaran", alamatLamaran);
      formData.append("mapsLamaran", mapsLamaran);
      formData.append("tglLamaran", tglLamaran);
      formData.append("waktuLamaran", waktuLamaran);
      isCheckedSumbangan && formData.append("noRek", noRek);
      isCheckedSumbangan && formData.append("ketRek", ketRek);

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
      <AppShell>
        <Stepper current={2} />
        <PageHeader
          eyebrow="Langkah 3 dari 3 · Engagement"
          title="Detail Acara"
          description="Lengkapi informasi undangan. Bagian opsional bisa diaktifkan lewat tombol di kanan."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Gambar & Musik" description="Visual utama dan musik latar undangan." icon={<ImageIcon />} className="lg:col-span-2">
            <div className="grid gap-5 md:grid-cols-2">
              <ImageUpload
                id="gambar-utama"
                label="Gambar Pasangan"
                description="Gambar utama undangan."
                previews={[gambarUtamaView]}
                onFiles={(files) => {
                  setGambarutamaView(URL.createObjectURL(files[0]));
                  setGambarutama(files[0]);
                }}
              />
              <ImageUpload
                id="gambar-cover"
                label="Gambar Cover"
                description="Tampil di halaman pembuka undangan."
                previews={[gambarCoverView]}
                onFiles={(files) => {
                  setGambarcoverView(URL.createObjectURL(files[0]));
                  setGambarcover(files[0]);
                }}
              />
            </div>
            <Select
              label="Musik"
              labelPlacement="outside"
              placeholder="Pilih musik latar"
              variant="bordered"
              className="md:max-w-md"
              value={musik}
              onChange={(event) => setMusik(event.target.value)}
            >
              {musicList.map((music) => (
                <SelectItem key={music.id} value={music.id}>
                  {music.judul}
                </SelectItem>
              ))}
            </Select>
          </SectionCard>

          <SectionCard title="Kata Pengantar" description="Sambutan pembuka untuk para tamu." icon={<EnvelopeIcon />} className="lg:col-span-2">
            <div>
              <label htmlFor="pengantar" className="mb-1.5 block text-sm font-medium text-dark">
                Kata Pengantar
              </label>
              <textarea
                name="pengantar"
                id="pengantar"
                value={kataPengantar || ""}
                onChange={(event) => setKatapengantar(event.target.value)}
                className="input-base min-h-[140px] resize-y"
                placeholder="Tuliskan kata-kata pengantar..."
                rows={6}
              ></textarea>
            </div>
          </SectionCard>

          <SectionCard title="Mempelai Pria" description="Data diri & orang tua mempelai pria." icon={<UserIcon />}>
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldDetail usefor="pria" label="Nama Panggilan" placeholder="Nama panggilan" type="text" value={namaPria} onChange={setNamapria} />
              <FieldDetail usefor="pria-lengkap" label="Nama Lengkap" placeholder="Nama lengkap pria" type="text" value={namaLengkapPria} onChange={setNamalengkappria} />
              <FieldDetail usefor="ayah-pria" label="Nama Ayah" placeholder="Nama ayah" type="text" value={ayahPria} onChange={setAyahpria} />
              <FieldDetail usefor="ibu-pria" label="Nama Ibu" placeholder="Nama ibu" type="text" value={ibuPria} onChange={setIbupria} />
            </div>
            <div className="rounded-xl border border-gold-100 bg-ivory p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Foto Pria</p>
                  <p className="text-xs text-dark/55">Opsional, tampilkan foto mempelai pria.</p>
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

          <SectionCard title="Mempelai Wanita" description="Data diri & orang tua mempelai wanita." icon={<UserIcon />}>
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldDetail usefor="wanita" label="Nama Panggilan" placeholder="Nama panggilan" type="text" value={namaWanita} onChange={setNamawanita} />
              <FieldDetail usefor="wanita-lengkap" label="Nama Lengkap" placeholder="Nama lengkap wanita" type="text" value={namaLengkapWanita} onChange={setNamalengkapwanita} />
              <FieldDetail usefor="ayah-wanita" label="Nama Ayah" placeholder="Nama ayah" type="text" value={ayahWanita} onChange={setAyahwanita} />
              <FieldDetail usefor="ibu-wanita" label="Nama Ibu" placeholder="Nama ibu" type="text" value={ibuWanita} onChange={setIbuwanita} />
            </div>
            <div className="rounded-xl border border-gold-100 bg-ivory p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Foto Wanita</p>
                  <p className="text-xs text-dark/55">Opsional, tampilkan foto mempelai wanita.</p>
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

          <SectionCard title="Data Lamaran" description="Waktu dan lokasi acara lamaran." icon={<CalendarIcon />}>
            <FieldDetail usefor="alamat-lamaran" label="Lokasi Lamaran" placeholder="Alamat lengkap lokasi" type="text" value={alamatLamaran} onChange={setAlamatlamaran} />
            <FieldDetail usefor="maps-lamaran" label="Link Google Maps Lamaran" placeholder="https://goo.gl/maps/xxxxxxxxxxx" type="url" value={mapsLamaran} onChange={setmapsLamaran} />
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldDetail usefor="tanggal-lamaran" label="Tanggal Lamaran" type="date" value={tglLamaran} onChange={setTgllamaran} />
              <FieldDetail usefor="waktu-lamaran" label="Waktu Lamaran" type="time" value={waktuLamaran} onChange={setWaktulamaran} />
            </div>
          </SectionCard>

          <SectionCard
            title="Amplop Digital"
            description="Opsional, rekening untuk menerima sumbangan."
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
              <FieldDetail usefor="norekening" label="No. Rekening" placeholder="Contoh: 111222233" type="text" value={noRek} onChange={setNorek} />
              <FieldDetail usefor="ket-rekening" label="Keterangan Rekening" placeholder="Contoh: a/n David - BCA" type="text" value={ketRek} onChange={setKetRek} />
            </div>
          </SectionCard>
        </div>

        <FormActions
          onSubmit={onSubmit}
          loading={uploading}
          submitLabel="Publish Undangan"
        />
      </AppShell>
      <ToastContainer position="top-center"></ToastContainer>
    </>
  );
}
