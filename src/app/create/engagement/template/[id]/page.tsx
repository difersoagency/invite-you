"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import {
  getProjectDetail,
  getTemplateList,
} from "../../../../../../services/manage";
import Cookies from "js-cookie";
import AppShell from "@/app/component/ui/AppShell";
import PageHeader from "@/app/component/ui/PageHeader";
import Stepper from "@/app/component/ui/Stepper";
import TemplatePicker from "@/app/component/ui/TemplatePicker";
import FormActions from "@/app/component/ui/FormActions";

export default function Page({ params }: { params: { id: string } }) {
  const [template, setTemplate] = useState(0);
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

  const getProjectDetailAPI = useCallback(async (id) => {
    if (!undanganForm) {
      console.warn("undanganForm is not defined or accessible.");
      setLoading(false);
      return;
    }

    const data = await getProjectDetail(id);
    const dataTemplate = await getTemplateList(undanganForm.acara);
    setTemplatelist(dataTemplate.data || []);
    setLoading(false);
    if (data.status > 300) {
      toast.error(data.message);
    }
    setTemplate(parseInt(data.data.template));
  }, []);

  useEffect(() => {
    if (params.id) {
      getProjectDetailAPI(params.id);
    }
  }, [params.id]);

  const onSubmit = () => {
    if (!template) {
      toast.error("Pilih Salah Satu Template");
    } else {
      undanganForm.template = template;
      localStorage.setItem("undanganForm", JSON.stringify(undanganForm));
      router.push(`/create/engagement/detail/${params.id}`);
    }
  };

  return (
    <>
      <AppShell>
        <Stepper current={1} />
        <PageHeader
          eyebrow="Edit undangan · Engagement"
          title="Pilih template"
          description="Template yang sedang dipakai sudah ditandai."
        />
        <TemplatePicker templates={templateList} selected={template} onSelect={setTemplate} loading={loading} />
        <FormActions onSubmit={onSubmit} submitLabel="Lanjut" />
      </AppShell>
      <ToastContainer position="top-center" hideProgressBar></ToastContainer>
    </>
  );
}
