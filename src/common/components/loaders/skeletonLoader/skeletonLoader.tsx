import Skeleton from "react-loading-skeleton";
import React, { FC } from "react";

export const SkeletonLoader: FC<PropsType> = ({ height, count }) => {
  return <Skeleton height={height} count={count} background-color="#f3f3f3" foreground-color="#ecebeb" />;
};

type PropsType = {
  height?: string;
  count?: number;
};
