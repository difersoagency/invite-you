"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { getTemplateList } from "../../../../../services/manage";
import Cookies from "js-cookie";
import AppShell from "@/app/component/ui/AppShell";
import PageHeader from "@/app/component/ui/PageHeader";
import Stepper from "@/app/component/ui/Stepper";
import TemplatePicker from "@/app/component/ui/TemplatePicker";
import FormActions from "@/app/component/ui/FormActions";

export default function Page() {
  const [template, setTemplate] = useState("");
  const [templateList, setTemplatelist] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  let undanganForm;
  if (typeof window !== "undefined") {
    const undanganFormStr = localStorage.getItem("undanganForm");
    undanganForm = JSON.parse(undanganFormStr);
  }

  const token = Cookies.get("token");
  if (!token) {
    router.push("/login");
  }

  const getTemplateListAPI = useCallback(async () => {
    if (!undanganForm) {
      console.warn("undanganForm is not defined or accessible.");
      setLoading(false);
      return;
    }

    const data = await getTemplateList(undanganForm.acara);
    setTemplatelist(data.data || []);
    setLoading(false);

    if (data.status > 300) {
      toast.error(data.message);
    }
  }, []);

  useEffect(() => {
    getTemplateListAPI();
  }, []);

  const onSubmit = () => {
    if (template == "") {
      toast.error("Pilih Salah Satu Template");
    } else {
      undanganForm.template = template;
      localStorage.setItem("undanganForm", JSON.stringify(undanganForm));
      router.push("/create/engagement/detail");
    }
  };

  return (
    <>
      <AppShell>
        <Stepper current={1} />
        <PageHeader
          eyebrow="Langkah 2 dari 3 · Engagement"
          title="Pilih Template"
          description="Pilih desain undangan yang paling cocok untuk klien."
        />
        <TemplatePicker templates={templateList} selected={template} onSelect={setTemplate} loading={loading} />
        <FormActions onSubmit={onSubmit} submitLabel="Lanjut isi detail" />
      </AppShell>
      <ToastContainer position="top-center"></ToastContainer>
    </>
  );
}
