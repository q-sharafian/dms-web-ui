'use client';

import { isRunOnServer, t } from "@/lib/utils"
import { Locale } from '@/i18n/settings';
import { getDictionary } from "@/i18n/get-dictionary";
import EventsList from "@/components/event/EventsList";
import { useEffect, useState } from "react";
import { LSFieldKey } from "@/interfaces/clientStorageData";
import useCUPStorage from "@/hooks/useClientStorage";
import { FloatButton } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import EventCreate from "@/components/event/EventCreate";

export default function Events(
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
    if (isRunOnServer()) return
    document.title = t(dict?.common?.latestSentEntities, dict?.common?.events)
  }, [dict])
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
      {/* <Head>
        <title>{t(dict?.common?.latestSentEntities, dict?.common?.docs)}</title>
      </Head> */}

      <FloatButton icon={<PlusCircleOutlined />} tooltip={t(dict?.common?.createA, dict?.common?.event)}
        onClick={() => { setModalCreateDocState(true) }}
      />
      <EventCreate
        dict={dict}
        jobPositionID={jobPositionID}
        modalState={modalCreateDocState}
        setModalState={(val: boolean) => { setModalCreateDocState(val) }}
      />
      {dict && <p>{t(dict.common.latestSentEntitiesDesc)}</p>}
      <EventsList authToken={authKey} dict={dict} offset={offset} limit={limit} jobPositionID={jobPositionID} />
    </div>
  )
}