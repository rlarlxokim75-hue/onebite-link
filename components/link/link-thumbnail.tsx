"use client";

import { useState } from "react";

type Props = {
  src: string;
};

/**
 * 오픈 그래프 썸네일. 임의의 외부 도메인이라 next/image 최적화 대신 <img>를 사용하고,
 * 이미지가 깨지면(404, 핫링크 차단 등) 영역 자체를 숨긴다.
 */
export default function LinkThumbnail({ src }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className="aspect-[1.91/1] overflow-hidden bg-[var(--bg)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="thumb-img size-full object-cover"
      />
    </div>
  );
}
