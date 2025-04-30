/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * A dummy method to login to the app. Use it only in development environment.
 * For the login, add a URL query string with key `auth-token` that contains the token.
 */
'use client';

import { Locale } from "@/i18n/settings";
import { getDictionary } from "@/i18n/get-dictionary"
import { logger } from "@/lib/logger/logger";
import { t } from "@/lib/utils"
import { LSFieldKey } from "@/interfaces/clientStorageData";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCUPStorage from "@/hooks/useClientStorage";
import { useApi } from "@/hooks/useApi";
import { userService } from "@/lib/api/services/UserService";
import routes from "@/routes";

export default function Dummy({
  params,
  searchParams,
}: {
  params: { lang: Locale },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const sp = searchParams
  const lang = params.lang
  const authToken = sp["auth-token"] ?? null
  const router = useRouter();
  const [redirectMsg, setRedirectMsg] = useState('');
  const [, setAuthKey] = useCUPStorage(LSFieldKey.AuthToken, authToken)
  const [, setUsername] = useCUPStorage(LSFieldKey.RealUserName, "")
  const [, setDict] = useState<any>(null);
  // const { data: user, loading, error, execute: fetchUsers } = useApi(
    const { data: user } = useApi(
    userService.getCurrentUser,
    true
  )
  logger.debug("Received current user details: ", user)

  useEffect(() => {
    async function f() {
      const d = await getDictionary(lang);
      setDict(d);
      if (!authToken) logger.debug(`${authToken} is null or undefined`);
      else {
        logger.info("redirecting to index page");
        setRedirectMsg(t((d as any)?.common?.redirectingTo, (d as any)?.common?.indexPage))
        setAuthKey(authToken)
        setUsername(user?.data.name || "")
        router.push(routes.index)
      }
    }
    f();
  }, [lang, authToken, setAuthKey, router, setUsername, user?.data.name]);

  return (
    <div>
      <h1>test: {JSON.stringify(user?.data)}</h1>
      <h1>{redirectMsg}</h1>
      <h1>{lang}</h1>
      <ul>
        <li>auth-token: {authToken}</li>
      </ul>
    </div>
  );
}