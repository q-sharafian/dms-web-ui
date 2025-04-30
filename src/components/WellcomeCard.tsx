'use client';

import React from "react";
import Card from "antd/es/card/Card";
import { ClientStorage as cs } from '@/lib/clientStorage/clientStorage';
import { LSFieldKey } from '@/interfaces/clientStorageData';
import { useDictionary } from "@/hooks/useDictionary";
import { t } from "@/lib/utils";
import { Locale } from "@/i18n/settings";

interface WellcomeCardProps {
  locale: Locale
  style?: React.CSSProperties
  className?: string
}

const WellcomeCard: React.FC<WellcomeCardProps> = ({style, locale, className}: WellcomeCardProps) => {
  const username = cs.getUPItem(LSFieldKey.RealUserName) || "";
  const { dictionary: dict, loading, error } = useDictionary(locale)

  return (
  <Card style={{...style}} className={className + " w-full sm:w-full lg:w-100 mt-5"}>
    <h1>{!loading && !error ? t(dict.login.wellcome, username) : ""}</h1>
  </Card>
  );
}

export default WellcomeCard;