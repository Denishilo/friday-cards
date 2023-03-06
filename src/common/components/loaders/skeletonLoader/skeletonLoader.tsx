import Skeleton from "react-loading-skeleton";
import React, { FC } from "react";

export const SkeletonLoader: FC<Props> = ({ height, count }) => {
  return <Skeleton height={height} count={count} background-color="#f3f3f3" foreground-color="#ecebeb" />;
};

type Props = {
  height?: string;
  count?: number;
};
