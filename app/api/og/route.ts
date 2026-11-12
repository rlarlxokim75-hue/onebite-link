import type { NextRequest } from "next/server";
import { fetchOpenGraph, OpenGraphError } from "@/lib/og";

/**
 * GET /api/og?url=https://example.com
 * 링크의 오픈 그래프 정보(제목, 설명, 썸네일, 정규 주소)를 반환
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return Response.json(
      { error: "url 쿼리 파라미터가 필요해요" },
      { status: 400 },
    );
  }

  try {
    const og = await fetchOpenGraph(url);
    return Response.json(og);
  } catch (error) {
    if (error instanceof OpenGraphError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json(
      { error: "링크 정보를 가져오지 못했어요" },
      { status: 500 },
    );
  }
}
