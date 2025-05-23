'use client';

import { t } from "@/lib/utils"
import { Locale } from '@/i18n/settings';
import { getDictionary } from "@/i18n/get-dictionary";
import DocsList from "@/components/doc/DocsList";
import { useEffect, useState } from "react";
import { LSFieldKey } from "@/interfaces/clientStorageData";
import useCUPStorage from "@/hooks/useClientStorage";
import Head from "next/head";
import { FloatButton } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import DocCreate from "@/components/doc/DocCreate";

export default function Docs(
  {
    params,
    searchParams
  }: {
    params: { lang: Locale },
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
  const lang = params.lang
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dict, setDict] = useState<any>(null);
  const [authKey,] = useCUPStorage(LSFieldKey.AuthToken, "")
  const jobPositionID = String(searchParams["job-position"] ?? "");
  const limit = Number(searchParams["limit"]) || 30;
  const offset = Number(searchParams["offset"]) || 0;

  useEffect(() => {
    async function f() {
      const d = await getDictionary(lang);
      setDict(d);
    }
    f();
  }, [lang, dict]);
  const [modalCreateDocState, setModalCreateDocState] = useState(false);

  return (
    <div className="App">
      <FloatButton icon={<PlusCircleOutlined />} tooltip={t(dict?.common?.createA, dict?.docs?.doc)}
        onClick={() => { setModalCreateDocState(true) }}
      />
      <DocCreate dict={dict} jobPositionID={jobPositionID} modalState={modalCreateDocState}
        setModalState={(val: boolean) => { setModalCreateDocState(val) }} />
      {dict && <Head>
        <title>{t(dict.common.latestSentEntities, dict.common.docs)}</title>
      </Head>}
      {dict && <p>{t(dict.common.latestSentEntitiesDesc)}</p>}
      <DocsList authToken={authKey} dictionary={dict} offset={offset} limit={limit} jobPositionID={jobPositionID} />
    </div>
  )
}