"use client";

import HeadDashboard from "@/app/dashboard/headDashboard";
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
  const [namaLengkap, setNamalengkap] = useState("");
  const [ketAcara, setKetAcara] = useState("");
  const [foto, setFoto] = useState("");
  const [fotoView, setFotoView] = useState(null);
  const [isCheckedFoto, setCheckedFoto] = useState(false);

  const [alamat, setAlamat] = useState("");
  const [tgl, setTgl] = useState("");
  const [waktu, setWaktu] = useState("");
  const [noWa, setNoWa] = useState("");
  const [isCheckedReservasi, setCheckedReservasi] = useState(false);

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
      namaLengkap == "" ||
      waktu == "" ||
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
      formData.append("ketAcara", ketAcara);    
      isCheckedFoto && formData.append("foto", foto);
      formData.append("alamat", alamat);
      formData.append("tgl", tgl);
      formData.append("waktu", waktu);
      isCheckedReservasi && formData.append("noWa", noWa);
      isCheckedReservasi && formData.append("ketReservasi", ketReservasi);

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
      <section>
        <HeadDashboard />
        <div className="px-10 py-7">
          <div className="border border-gray px-4 py-7 mb-7">
            <label htmlFor="pengantar" className="font-bold text-left text-xs">
              Musik
            </label>
            <p className="text-gray text-[0.6rem] mb-2 ">
              Pilih Musik yang ingin Anda gunakan
            </p>
            <Select
              label="Musik Pilihan"
              value={musik}
              onChange={(event) => setMusik(event.target.value)}
            >
              {musicList.map((music) => (
                <SelectItem key={music.id} value={music.id}>
                  {music.judul}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="py-5">
            <h2 className="text-dark font-bold mb-5">Data Orang</h2>

            <div className=" px-6 py-7 border border-gold flex flex-col gap-7 w-full md:w-4/5">
              <FieldDetail
                usefor="panggilan"
                label="Nama Panggilan"
                desc=""
                placeholder="Nama Panggilan"
                type="text"
                value={nama}
                onChange={setNama}
              />

              <FieldDetail
                usefor="lengkap"
                label="Nama Lengkap"
                desc=""
                placeholder="Nama Lengkap "
                type="text"
                value={namaLengkap}
                onChange={setNamalengkap}
              />


              <div>
                <input
                  type="checkbox"
                  name="fotop"
                  id="fotop"
                  className="peer/fotop"
                  onChange={(event) => {
                    setFotoView(null);
                    setFoto("");
                    setCheckedFoto(!isCheckedFoto);
                  }}
                />
                <label
                  htmlFor="fotop"
                  className="font-bold text-left text-xs ml-3"
                >
                  Foto Orang
                </label>
                <p className="text-gray text-[0.6rem] mb-2 ">
                  Masukkan Foto Client
                </p>
                <input
                  type="file"
                  className="p-pict text-xs peer-checked/fotop:block hidden"
                  onChange={(event) => {
                    setFotoView(URL.createObjectURL(event.target.files[0]));
                    return setFoto(event.target.files[0]);
                  }}
                />

                {fotoView ? (
                  <div className="mt-10 border border-gold border-dotted px-6 py-4 rounded-lg ">
                    <label
                      htmlFor="pesan"
                      className="font-bold text-left text-xs"
                    >
                      Image Preview
                    </label>

                    <div className="w-fit mt-4">
                      <img src={fotoView} alt="" width={200} height={200} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          

          <div className="py-5">
            <h2 className="text-dark font-bold  mb-5">Data Acara</h2>

            <div className=" px-6 py-7 border border-gold flex flex-col gap-7 w-full md:w-4/5">
              <FieldDetail
                usefor="alamat"
                label="Lokasi Acara"
                desc=""
                placeholder="Alamat Lokasi"
                type="text"
                value={alamat}
                onChange={setAlamat}
              />

              <FieldDetail
                usefor="tanggal"
                label="Tanggal Acara"
                desc=""
                placeholder="Tanggal / Bulan / Tahun"
                type="date"
                value={tgl}
                onChange={setTgl}
              />

              <FieldDetail
                usefor="waktu"
                label="Waktu Acara"
                desc=""
                placeholder="Jam Acara"
                type="time"
                value={waktu}
                onChange={setWaktu}
              />

      <FieldDetail
                usefor="keterangan"
                label="Ketarangan Acara"
                desc=""
                placeholder="Katerangan Acara"
                type="text"
                value={ketAcara}
                onChange={setKetAcara}
              /> 
            </div>
          </div>

          <div className="py-5">
            <h2 className="text-dark font-bold  mb-5">
              Reservasi Whatasapp (Optional)
            </h2>
            <input
              type="checkbox"
              name="sumbangan"
              id="sumbangan"
              className="peer/active"
              onChange={(event) => {
                setNoWa("");
                setKetReservasi("");
                setCheckedReservasi(!isCheckedReservasi);
              }}
            />
            <label
              htmlFor="sumbangan"
              className="text-xs ml-2 peer-checked/active:text-gold "
            >
              Aktifkan RSVP Via Whatsapp
            </label>

            <div className=" px-6 py-7 border border-gold flex-col gap-7 w-full md:w-4/5 hidden peer-checked/active:flex mt-5">
              <FieldDetail
                usefor="nomor"
                label="No Whatsapp"
                desc=""
                placeholder="contoh:628123123123"
                type="text"
                value={noWa}
                onChange={setNoWa}
              />
              <FieldDetail
                usefor="tulisan"
                label="Text Balasan"
                desc=""
                placeholder="Ya, saya bersedia Hadir"
                type="text"
                value={ketReservasi}
                onChange={setKetReservasi}
              />
            </div>
          </div>

          <button
            className="text-xs bg-gold text-dark px-6 py-2"
            disabled={uploading}
            onClick={onSubmit}
          >
            {uploading ? "Tunggu Sebentar.." : "Publish Undangan"}
          </button>
        </div>
      </section>
      <ToastContainer></ToastContainer>
    </>
  );
}
