import { Spin } from "antd"
import React from "react";

interface LoadingProps {
  style?: React.CSSProperties
  count: number
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ style, className, count }: LoadingProps) => {
  return (
    <div>
      {count > 0 ? <div
        style={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        className={className}
      >
        <Spin size="large" />
      </div> : null}
    </div>
  );
}

export default Loading;