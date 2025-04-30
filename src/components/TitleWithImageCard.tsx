import React from "react";
import { Row, Col } from 'antd';
import ClientNavHolder from "./ui/ClientNavHolder";

interface TitleWithImageCardProps {
  icon: React.ReactNode;
  bgColor?: string;
  title: string;
  description?: string;
  style?: React.CSSProperties
  className?: string
  href?: string
  linkTitle?: string
}

/**
 * Create a card so that there's an icon/element on one side and a title on the other. Also, 
 * if the description is not empty, add the description below it.
 */
const TitleWithImageCard: React.FC<TitleWithImageCardProps> = ({ icon, title, description, bgColor, style, className, href, linkTitle }: TitleWithImageCardProps) => {
  const card = (
    <div style={{ ...style, backgroundColor: bgColor || 'white', borderRadius: '1rem', padding: '0.5rem' }}
      className={className+ " w-full sm:w-full lg:w-100 mt-5"}>
      <Row style={{ minHeight: '3rem', alignItems: 'center' }}>
        <Col span={16} style={{ right: '10px' }}>
          <h2 style={{ fontSize: '1.2rem' }}>{title}</h2>
        </Col>
        <Col span={8} style={{ fontSize: '3rem', direction: 'ltr', left: '10px' }}>
          {icon}

        </Col>
      </Row>
      <div>
        {description && <p>{description}</p>}
      </div>
    </div>
  );

  return href != null ? (
    <ClientNavHolder href={href} style={{width: "fit-content", display: "block"}} title={linkTitle}>
      {card}
    </ClientNavHolder>
  ) : card;
};

export default TitleWithImageCard;