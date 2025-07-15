import React from 'react';

interface SkeletonProps {
  height?: number;
  width?: number | string;
  borderRadius?: number;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({
  height = 200,
  width = '100%',
  borderRadius = 8,
  style = {},
}) => {
  return (
    <div
      style={{
        height,
        width,
        borderRadius,
        background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 37%, #e0e0e0 63%)',
        backgroundSize: '400% 100%',
        animation: 'skeleton-loading 1.4s ease infinite',
        ...style,
      }}
    />
  );
};

export default Skeleton;
