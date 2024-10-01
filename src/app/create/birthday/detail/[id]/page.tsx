"use client";

import HeadDashboard from "@/app/dashboard/headDashboard";
import React, { useCallback, useEffect, useState } from "react";
import FieldDetail from "@/app/component/FieldDetail";
import { Select, SelectItem } from "@nextui-org/react";
import { songs } from "@/app/data/data";
import { storeUndangan } from "../../../../../../services/auth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useRouter } from "next/navigation";
import { getMusicList, getProjectDetail } from "../../../../../../services/manage";
import Cookies from "js-cookie";

export default function Page({params} : {params : {id:string}}) {
  const router = useRouter();
  const token = Cookies.get("token");
  if (!token) {
    router.push("/login");
  }

  const ROOT_API = process.env.NEXT_PUBLIC_API;
  const [uploading, setUploading] = useState(false);
  const [musicList, setMusiclist] = useState([]);
  const [defaultMusik, setdefaultMusik] = useState([]);
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
  const [galleryViewRecent, setGalleryViewRecent] = useState([]);
  const [isCheckedGallery, setCheckedGallery] = useState(false);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const getProjectDetailAPI = useCallback(async (id) => {
    const data = await getProjectDetail(id);
    if (data.status > 300) {
      toast.error(data.data.message);
    }
    setMusiclist(data.data.musicList);
    setMusik(data.data.musik);
    setdefaultMusik([data.data.musik]);
    setNama(data.data.nama)
    setTglLahir(data.data.tglLahir)
    setNamalengkap(data.data.namaLengkap)
    setKetAcara(data.data.ketAcara)
    setFoto(data.data.foto)
    setFotoView(data.data.fotoView)
    setAlamat(data.data.alamat)
    setMaps(data.data.maps)
    setTgl(data.data.tgl)
    setWaktu(data.data.waktu)
    setNoWa(data.data.noWa)
    setKetReservasi(data.data.ketReservasi)
    setCheckedReservasi(data.data.isCheckedReservasi)
    setCheckedFoto(data.data.checkedfoto);

     //Tambahan
     setGalleryViewRecent(data.data.galleryView);
     setGallery(data.data.galleryView);
     setCheckedGallery(data.data.checkedGallery);

  },[]);



  useEffect(() => {
    if (params.id) {
      getProjectDetailAPI(params.id);
    } else {
      console.log("error");
    }
  }, [params.id]);

  const handleChange = (event) => {
    const value = event.target.value;
    setMusik(value);
    setdefaultMusik([value]);
  };
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
      maps == "" ||
      namaLengkap == "" ||
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
      formData.append("tglLahir", tglLahir);    
      formData.append("namaLengkap", namaLengkap);    
      formData.append("ketAcara", ketAcara);    
      isCheckedFoto && formData.append("foto", foto);
      formData.append("alamat", alamat);
      formData.append("tgl", tgl);
      formData.append("waktu", waktu);
      formData.append("maps", maps);
      isCheckedReservasi && formData.append("noWa", noWa);
      isCheckedReservasi && formData.append("ketReservasi", ketReservasi);
      if (isCheckedGallery) {
        for (let i = 0; i < gallery.length; i++) {
          formData.append("gallery[]", gallery[i]);
        }
      }
      try {
        const response = await axios.post(
          `${ROOT_API}/project/update/${params.id}`,
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
              selectedKeys={defaultMusik}
              onChange={handleChange}
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
            
            <FieldDetail
                usefor="lengkap"
                label="Tanggal Lahir"
                desc=""
                type="date"
                value={tglLahir}
                onChange={setTglLahir}
              />



              <div>
                <input
                  type="checkbox"
                  name="fotop"
                  id="fotop"
                  className="peer/fotop"
                  checked={isCheckedFoto}
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


              <div>
              <input
                type="checkbox"
                name="galeri"
                id="galeri"
                checked={isCheckedGallery}
                className="peer/galeri"
                onChange={(event) => {
                  setGalleryView([]);
                  setGallery([]);
                  setGalleryViewRecent([]);
                  setCheckedGallery(!isCheckedGallery);
                }}
              />
              <label
                htmlFor="galeri"
                className="font-bold text-left text-xs ml-3"
              >
                Upload Foto Gallery
              </label>
              <br />
              <br />
              <input
                type="file"
                name=""
                id=""
                className="text-xs peer-checked/galeri:block hidden"
                multiple
                onChange={(event) => {
                  const files = Array.from(event.target.files);
                  setGalleryView(files);
                  return setGallery(files);
                }}
              />
              {galleryView.length > 0 ? (
                <div className="mt-10 border border-gold border-dotted px-6 py-4 rounded-lg ">
                  <label
                    htmlFor="pesan"
                    className="font-bold text-left text-xs"
                  >
                    Image Preview
                  </label>

                  <div className="grid grid-cols-6 gap-6">
                    {galleryView.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        width={200}
                        height={200}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-10 border border-gold border-dotted px-6 py-4 rounded-lg ">
                  <label
                    htmlFor="pesan"
                    className="font-bold text-left text-xs"
                  >
                    Image Preview
                  </label>

                  <div className="grid grid-cols-6 gap-6">
                    {galleryViewRecent.map((file, index) => (
                      <img
                        key={index}
                        src={file}
                        alt={`Preview ${index}`}
                        width={200}
                        height={200}
                      />
                    ))}
                  </div>
                </div>
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
                usefor="alamat"
                label="Link Google Maps"
                desc=""
                placeholder="Link Google Maps"
                type="text"
                value={maps}
                onChange={setMaps}
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
              checked={isCheckedReservasi}
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
